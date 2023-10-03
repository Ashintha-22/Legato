import {
  View,
  Text,
  Pressable,
  ImageBackground,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import React from "react";
import styles from "../../../shared/styles";
import { Link, useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

const upload = () => {
  const router = useRouter();

  return (
    <View>
      <Text>upload</Text>
      <Pressable
        onPress={() => router.push("/home/output")}
        style={{ backgroundColor: "lightblue", padding: 10, borderRadius: 20 }}
      >
        <Text style={styles.textButton}>Convert</Text>
      </Pressable>
    </View>
  );
};

export default upload;
