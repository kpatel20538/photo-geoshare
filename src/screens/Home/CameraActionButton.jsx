import React from "react";
import { StyleSheet } from "react-native";
import Button from "../../components/Button";

const CameraActionButton = ({ onPress }) => {
  return <Button style={styles.fab} icon="camera-alt" onPress={onPress} />;
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 24,
  },
});

export default CameraActionButton;
