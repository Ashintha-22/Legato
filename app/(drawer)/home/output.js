import { View, Text, Button } from "react-native";
import React from "react";
import styles from "../../../shared/styles";

const output = () => {
  return (
    <View style={[styles.container, { backgroundColor: "#222" }]}>
      <View style={styles.downloadPage}>
        <Text>output</Text>
        <Button onPress={() => {}} title="Download" />
      </View>
    </View>
  );
};

export default output;
