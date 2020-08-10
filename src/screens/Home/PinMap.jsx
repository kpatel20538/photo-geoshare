import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";

const PinMap = ({ mapRef, results, onMarkerPress }) => {
  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      toolbarEnabled={false}
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
