import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../../../shared/styles";
import Card from "../../../shared/Card";
import { Link, useRouter } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

const MusicLibrary = () => {
  const router = useRouter();
  const isLoading = false;
  const error = false;

  const [libraryData, setLibraryData] = useState([]);
  const [downloadURL, setdownloadURL] = useState("");

  useEffect(() => {
    const getlibrary = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "library"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLibraryData(data);
      } catch (e) {
        console.log("Error getting documents: ", e);
      }
    };
    getlibrary();
  }, []);

  const handleCardPress = (uri) => {};

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingVertical: 10,
      }}
    >
      {/* Cards- Library music cards*/}
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text>Something went Wrong! ;/</Text>
        ) : (
          <FlatList
            data={libraryData}
            numColumns={2}
            renderItem={({ item }) => (
              <Card
                title={item.title}
                author={item.author}
                uri={item.uri}
                handleCardPress={() => {}}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 10, columnGap: 15 }}
          />
        )}
      </View>
    </View>
  );
};

export default MusicLibrary;
