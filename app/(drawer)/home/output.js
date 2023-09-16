import { View, Text } from "react-native";
import React from "react";
import styles from "../../../shared/styles";

const output = () => {
  return (
    <View style={[styles.container, { backgroundColor: "#222" }]}>
      <View style={styles.downloadPage}>
        <Text>output</Text>
      </View>
    </View>
  );
};

export default output;
