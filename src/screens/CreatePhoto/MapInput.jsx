import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { shadow } from "../../styles";

const MapInput = ({ mapRef, coordinate, setCoordinate }) => {
  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map}>
        <Marker
          draggable
          coordinate={coordinate}
          onDragEnd={({ nativeEvent: { coordinate } }) => {
            setCoordinate(coordinate);
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...shadow,
    borderRadius: 16,
    overflow: "hidden",
  },
  map: {
    aspectRatio: 16 / 9,
  },
});

export default MapInput;
