import React from "react";
import {  StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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
    backgroundColor: "slateblue",
    borderRadius: Number.MAX_SAFE_INTEGER,
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});

export default CameraActionButton;
