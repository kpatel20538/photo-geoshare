import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CreatePhoto = () => {
  return (
    <View style={styles.container}>
      <Text>Create Photo Screen</Text>
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

export default CreatePhoto;
