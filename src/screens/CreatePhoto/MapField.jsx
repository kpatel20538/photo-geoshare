import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { shadow } from "../../styles";
import FieldContainer from "./FieldContainer";

const MapField = ({ mapRef, coordinate, onCoordinateChange }) => {
  return (
    <FieldContainer label="Location">
      <View style={styles.container}>
        <MapView ref={mapRef} style={styles.map}>
          <Marker
            draggable
            coordinate={coordinate}
            onDragEnd={({ nativeEvent: { coordinate } }) =>
              onCoordinateChange(coordinate)
            }
          />
        </MapView>
      </View>
    </FieldContainer>
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

export default MapField;
