import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import React from "react";
import styles from "../../../shared/styles";
import { Link, useRouter } from "expo-router";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth } from "../../../firebaseConfig";
import { User } from "firebase/auth";

const Profile = () => {
  return (
    <View
      style={[
        { alignItems: "center", flex: 1, backgroundColor: "#222", padding: 10 },
      ]}
    >
      <View style={profileStyle.photoContainer}>
        <Image
          source={require("../../../assets/profile.png")}
          resizeMode="contain"
          style={{ width: 161, height: 161, borderRadius: 40 }}
        ></Image>
      </View>

      <View style={profileStyle.details}>
        <Ionicons name="mail-outline" size={30} color="#000" />
        <Text style={{ paddingHorizontal: 10, fontSize: 18 }}>
          deashintha@gmail.com
        </Text>
      </View>

      <View style={profileStyle.details}>
        <Ionicons name="key-outline" size={30} color="#000" />
        <Text style={{ paddingHorizontal: 10, fontSize: 18 }}>**********</Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          paddingHorizontal: 10,
          paddingVertical: 8,
          borderRadius: 20,
          marginLeft: 250,
        }}
        activeOpacity={0.7}
      >
        <Text style={{ color: "white", fontSize: 10 }}> Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={profileStyle.details} activeOpacity={0.8}>
        <Ionicons name="time-outline" size={30} color="#000" />
        <Text style={{ paddingHorizontal: 10, fontSize: 18 }}>History</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const profileStyle = StyleSheet.create({
  details: {
    flexDirection: "row",
    height: 60,
    width: 350,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    marginVertical: 10,
  },
  photoContainer: {
    marginVertical: 20,
    width: 160,
    height: 160,
    backgroundColor: "#fff",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
