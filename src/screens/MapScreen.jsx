import React from "react";
import MapView from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Dimensions } from "react-native";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView style={styles.mapStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
