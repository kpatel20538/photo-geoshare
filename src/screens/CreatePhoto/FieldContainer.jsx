import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FieldContainer = ({ label, children }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      {children}
    </View>
  );
};

export default FieldContainer;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
  container: {
    margin: 16,
  },
});
