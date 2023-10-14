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
import { TouchableOpacity } from "react-native-gesture-handler";

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
            <TouchableOpacity
              onPress={() => {
                //router.replace("/(drawer)/home");
              }}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18, color: "#fff" }}>
                Login
              </Text>
            </TouchableOpacity>

            <Text style={{ marginVertical: 10 }}>OR</Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/Register");
              }}
              style={[styles.button, { backgroundColor: "#fff", marginTop: 0 }]}
              activeOpacity={0.8}
            >
              <Text style={[styles.textButton, { color: "black" }]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
