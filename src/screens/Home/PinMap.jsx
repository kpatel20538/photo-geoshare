import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import { map } from "../../styles";
import { bboxes } from "ngeohash";
import pDebounce from "p-debounce";

const getHashes = pDebounce(
  ({ latitude, longitude, latitudeDelta, longitudeDelta }) => {
    const minLatitude = latitude - latitudeDelta / 2;
    const maxLatitude = latitude + latitudeDelta / 2;
    const minLongitude = longitude - longitudeDelta / 2;
    const maxLongitude = longitude + longitudeDelta / 2;
    console.log({
      minLatitude,
      maxLatitude,
      minLongitude,
      maxLongitude,
    });
    console.log(bboxes(
      minLatitude,
      minLongitude,
      maxLatitude,
      maxLongitude,
    ));
  },
  500
);

const PinMap = ({ mapRef, results, onMarkerPress }) => {
  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      toolbarEnabled={false}
      customMapStyle={map}
      onRegionChangeComplete={getHashes}
    >
      {results.map((result) => (
        <Marker
          key={result.id}
          title={result.title}
          coordinate={result.coordinate}
          onPress={() => onMarkerPress(result)}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default PinMap;
