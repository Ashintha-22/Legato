import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ImageBackground,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import styles from "../shared/styles";
import { Link, useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require("../assets/Auth_page_back.png")}
          style={styles.backgroundImage}
          resizeMode="contain"
        >
          <View style={[styles.container, { marginTop: 200 }]}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="#676767"
              style={styles.textInput}
            />
            <TextInput
              placeholder="Password"
              valur={password}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor="#676767"
              style={styles.textInput}
              secureTextEntry={true}
            />
            <Pressable
              onPress={() => {
                router.replace("/(drawer)/home");
              }}
            >
              <Image
                source={require("../assets/Google_SignIn.png")}
                style={styles.googleSignIn}
              />
            </Pressable>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
