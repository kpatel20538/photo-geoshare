import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MyPhotos = () => {
  return (
    <View style={styles.container}>
      <Text>My Photos Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyPhotos;
