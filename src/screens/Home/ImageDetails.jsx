import React from "react";
import { Image, StyleSheet, View, Dimensions } from "react-native";
import Constants from "expo-constants";

const ImageDetails = ({ selection }) => {
  return (
    <View style={styles.container}>
      {selection && (
        <Image
          source={{ uri: selection.uri }}
          style={{ aspectRatio: 300 / 200 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight:
      Dimensions.get("window").height -
      56 -
      96 -
      36 -
      Constants.statusBarHeight,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});

export default ImageDetails;
