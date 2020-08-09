import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EditPhoto = () => {
  return (
    <View style={styles.container}>
      <Text>Edit Photo Screen</Text>
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

export default EditPhoto;
