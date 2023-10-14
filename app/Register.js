import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import styles from "../shared/styles";
import { BlurView } from "expo-blur";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");

  return (
    <View style={regStyles.container}>
      <View style={regStyles.blurContainer} tint="light">
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

        <View style={[styles.container, { marginTop: -40 }]}>
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
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="#676767"
            style={regStyles.textInput}
          />
          <TextInput
            placeholder="Password"
            valur={password}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="#676767"
            style={regStyles.textInput}
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
              Submit
            </Text>
          </TouchableOpacity>
        </View>
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
    marginVertical: 10,
    paddingLeft: 20,
    borderColor: "gray",
    borderWidth: 1,
  },
});
