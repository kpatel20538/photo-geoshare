import React from "react";
import {  StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { shadow } from "../../styles";

const CameraActionButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.fabContainer} onPress={onPress}>
      <MaterialIcons
        name="camera-alt"
        size={32}
        color="white"
        style={styles.fab}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    padding: 16,
  },
  fabContainer: {
    ...shadow,
    backgroundColor: "tomato",
    borderRadius: Number.MAX_SAFE_INTEGER,
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 24,

  },
});

export default CameraActionButton;
