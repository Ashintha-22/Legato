import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../../../shared/styles";
import Card from "../../../shared/Card";
import { Link, useRouter } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";

const recommendation = [
  { title: "Fur Elise", author: "Beethoven", id: 1 },
  { title: "Canon in D", author: "Someone", id: 2 },
  { title: "Requiem", author: "Mozart", id: 3 },
  { title: "Moonlight Sonata", author: "Beethoven", id: 4 },
  { title: "Turkish March", author: "Someone", id: 5 },
  { title: "Symphony No. 5", author: "Someone", id: 6 },
  { title: "Ave Verum Corpus", author: "Mozart", id: 7 },
  { title: "item8", author: "Someone", id: 8 },
];

const MusicLibrary = () => {
  const router = useRouter();
  const isLoading = false;
  const error = false;

  const handleCardPress = (item) => {
    // Implement the desired behavior when a card is pressed
    console.log(`Card for ${item} was pressed.`);
    // You can perform any actions you want here
  };

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
            data={recommendation}
            numColumns={2}
            renderItem={({ item }) => (
              <Card
                title={item.title}
                author={item.author}
                handleCardPress={handleCardPress}
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
