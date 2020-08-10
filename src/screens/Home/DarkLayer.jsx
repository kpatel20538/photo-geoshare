import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";

const DarkLayer = ({ active, onPress }) => {
  return active ? (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container} />
    </TouchableWithoutFeedback>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "black",
    opacity: 0.75,
  },
});

export default DarkLayer;
