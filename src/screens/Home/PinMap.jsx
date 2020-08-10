import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";

const PinMap = ({ mapRef, results, onMarkerPress }) => {
  return (
    <MapView ref={mapRef} style={styles.map}>
      {results.map((result) => (
        <Marker
          key={result.id}
          coordinate={result.coordinate}
          title={"red"}
          description={"blue"}
          onPress={() => onMarkerPress(result)}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: Dimensions.get("window").height - 56,
  },
});

export default PinMap;
