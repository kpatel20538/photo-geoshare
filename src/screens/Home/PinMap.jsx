import React from "react";
import MapView, { Marker, Geojson } from "react-native-maps";
import { StyleSheet } from "react-native";
import { map } from "../../styles";
import { getGeohashRegion, getGeohashFeature } from "../../api/location";

const PinMap = ({ mapRef, data, region, debugMode, onMarkerPress, onRegionChangeComplete }) => {
  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      toolbarEnabled={false}
      customMapStyle={map}
      onRegionChangeComplete={onRegionChangeComplete}
    >
      {Object.values(data).flatMap(section => section.map((doc) => (
        <Marker
          key={doc.id}
          title={doc.data.title}
          coordinate={doc.data.location.coordinate}
          onPress={() => onMarkerPress(doc)}
        />
      )))}
      {debugMode && region && (
        <Geojson 
          geojson={getGeohashFeature(getGeohashRegion(region))} 
          strokeColor="crimson" 
          fillColor="rgba(224,56,24, 0.5)" 
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default PinMap;
