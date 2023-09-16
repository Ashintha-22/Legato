import {
  View,
  Text,
  Pressable,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import styles from "../../../shared/styles";
import { Link, useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: "#222" }]}>
      <ImageBackground
        source={require("../../../assets/uploadSquare.png")}
        style={{
          width: 250,
          height: 250,
          justifyContent: "center",
          alignItems: "center",
          top: -100,
        }}
      >
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={require("../../../assets/plusButton.png")}
            style={{ width: 60, height: 60, top: -65 }}
          />
        </TouchableOpacity>
      </ImageBackground>
      <Pressable onPress={() => router.push("/home/output")}>
        <Text style={styles.textButton}>Convert</Text>
      </Pressable>
    </View>
  );
};

export default Home;
