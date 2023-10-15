import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../shared/styles";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { db } from "../firebaseConfig";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [errorText, setErrorText] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const router = useRouter();

  const handleEmail = (text) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    setEmail(text);
    if (text == "" || text.match(mailformat) == null) {
      setValidEmail(false);
      return;
    } else {
      setValidEmail(true);
    }
  };

  const handlePassword = (text) => {
    setPassword(text);
    if (password.length < 6) {
      setValidPassword(false);
      return;
    } else {
      setValidPassword(true);
    }
  };

  const addData = async () => {
    // Add a new document in collection "cities"
    await setDoc(doc(db, "users", email), {
      firstName: firstName,
      email: email,
    });
  };

  const signUp = async () => {
    if (validEmail && validPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          addData();
          Alert.alert("Account created successfully");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
        });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      if (user) {
        router.push("/home"); // Navigate to "/home" only if the user is authenticated
      }
    });
    return () => unsubscribe(); // Cleanup function to unsubscribe when the component unmounts
  }, []);

  return (
    <View style={regStyles.container}>
      <View style={regStyles.blurContainer}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={100}
          behavior="padding"
          enabled={true}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                color: "#000",
                marginVertical: 30,
              }}
            >
              Let's Create an Account
            </Text>

            <View style={[styles.container, { marginTop: -10 }]}>
              <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={(text) => setfirstName(text)}
                placeholderTextColor="#676767"
                style={regStyles.textInput}
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => handleEmail(text)}
                placeholderTextColor="#676767"
                style={regStyles.textInput}
              />
              {validEmail ? (
                <Text style={regStyles.validtext}>valid email</Text>
              ) : (
                <Text style={regStyles.failtext}>enter valid email</Text>
              )}
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(text) => handlePassword(text)}
                placeholderTextColor="#676767"
                style={regStyles.textInput}
                secureTextEntry={true}
              />
              {validPassword ? (
                <Text style={regStyles.validtext}>enter a strong password</Text>
              ) : (
                <Text style={regStyles.failtext}>enter a strong password</Text>
              )}
              <TouchableOpacity
                onPress={() => {
                  signUp();
                }}
                style={[styles.button, { marginTop: 50 }]}
                activeOpacity={0.8}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 18, color: "#fff" }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }}></View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Register;

const regStyles = StyleSheet.create({
  blurContainer: {
    flex: 0.55,
    justifyContent: "center",
    alignItems: "center",
    width: 350,
    borderRadius: 30,
    zIndex: 1,
    elevation: 3,
    overflow: "hidden",
    top: 350,
    backgroundColor: "#fff",
    opacity: 0.95,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    height: 60,
    width: 300,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginVertical: 8,
    paddingLeft: 20,
    borderColor: "gray",
    borderWidth: 1,
  },
  failtext: {
    color: "red",
    fontSize: 10,
    marginBottom: -6,
    marginTop: -6,
    alignSelf: "flex-end",
    marginRight: 20,
  },
  validtext: {
    color: "green",
    fontSize: 10,
    marginBottom: -6,
    marginTop: -6,
    alignSelf: "flex-end",
    marginRight: 20,
  },
});
