import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import styles from "../shared/styles";

const Card = ({ title, author, uri, handleCardPress }) => {
  return (
    <View>
      <TouchableOpacity
        style={cardStyle.container(title)}
        onPress={() => handleCardPress(uri)}
      >
        <View style={cardStyle.logoContainer(title)}>
          <Image style={cardStyle.logoImage} source={{ uri }} />
        </View>
        <View style={cardStyle.textContainer}>
          <Text style={cardStyle.jobName(title)} numberOfLines={1}>
            {title}
          </Text>
          <Text style={{ color: "#999" }}>{author}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const cardStyle = StyleSheet.create({
  container: (title) => ({
    width: 170,
    //height: 250,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "space-between",
    margin: 5,
  }),
  logoContainer: (title) => ({
    width: 150,
    height: 150,
    backgroundColor: "#fff",

    justifyContent: "center",
    aligntitles: "center",
  }),
  logoImage: {
    width: "90%",
    height: "90%",
    borderRadius: 12,
    alignSelf: "center",
  },
  textContainer: {
    marginLeft: 3,
    padding: 10,
  },
  companyName: {
    color: "#B3AEC6",
    marginTop: 10 / 1.5,
  },
  infoContainer: {
    marginTop: 10,
  },
  jobName: (title) => ({
    color: "black",
    fontSize: 18,
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    aligntitles: "center",
  },
  location: {
    color: "#B3AEC6",
  },
});
