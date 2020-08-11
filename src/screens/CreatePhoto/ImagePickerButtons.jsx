import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../../components/Button";

const IconButton = ({ name, onPress, title }) => (
  <MaterialIcons.Button
    name={name}
    size={32}
    color="white"
    backgroundColor="tomato"
    onPress={onPress}
  >
    {title}
  </MaterialIcons.Button>
);

const ImagePickerButtons = ({ onCameraPress, onGalleryPress }) => {
  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        icon="camera-alt"
        title="Camera"
        onPress={onCameraPress}
      />
      <Button
        style={styles.button}
        icon="collections"
        title="Gallery"
        onPress={onGalleryPress}
      />
    </View>
  );
};

export default ImagePickerButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 16,
  },
  button: {
    flex: 1,
    maxWidth: 120,
  }
});
