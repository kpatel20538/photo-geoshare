import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { shadow, map } from "../../styles";
import FieldContainer from "./FieldContainer";
import {bboxes} from "ngeohash";

const MapField = ({ mapRef, coordinate, onCoordinateChange }) => {
  return (
    <FieldContainer label="Location">
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          customMapStyle={map}
        >
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
    marginVertical: 8,
  },
  map: {
    aspectRatio: 16 / 9,
  },
});

export default MapField;
