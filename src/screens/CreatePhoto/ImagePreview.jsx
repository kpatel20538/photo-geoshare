import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { shadow } from "../../styles";

const ImagePreview = ({ source }) => {
  return (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={source} />
    </View>
  );
};

export default ImagePreview;

const styles = StyleSheet.create({
  imageContainer: {
    ...shadow,
    alignItems: "stretch",
    borderRadius: 16,
    margin: 16,
  },
  image: {
    aspectRatio: 16 / 9,
    borderRadius: 16,
  },
});
