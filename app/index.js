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
import React, { useState, useEffect } from "react";
import styles from "../shared/styles";
import { Link, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";

const Login = () => {
  const router = useRouter();

  const [user, setUser] = useState() || {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user);

      if (user) {
        setUser(user);
        router.replace("/home");
      }
    });
  }, []);

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log(user);
        // ...
        router.push("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  if (user == null) {
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
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor="#676767"
                style={styles.textInput}
                secureTextEntry={true}
              />
              <TouchableOpacity
                onPress={signIn}
                style={styles.button}
                activeOpacity={0.8}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 18, color: "#fff" }}
                >
                  Login
                </Text>
              </TouchableOpacity>

              <Text style={{ marginVertical: 10 }}>OR</Text>
              <TouchableOpacity
                onPress={() => {
                  router.push("/Register");
                }}
                style={[
                  styles.button,
                  { backgroundColor: "#fff", marginTop: 0 },
                ]}
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
  } else {
  }
};

export default Login;
