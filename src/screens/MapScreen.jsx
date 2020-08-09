import React, { useState, useRef } from "react";
import MapView, { Geojson } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { fetchGeoSearch } from "../api/location";
import SearchBar from "../components/SearchBar";
import { featureCollection } from "@turf/helpers";
import { getCoord } from "@turf/invariant";
import center from "@turf/center";

const MapScreen = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState(featureCollection([]));
  const [result, setResult] = useState(null);
  const mapRef = useRef();

  const setLocation = async (feature) => {
    setResult(featureCollection([feature]));
    const [longitude, latitude] = getCoord(center(feature));
    const [
      longitudeStart = 0.25,
      latitudeStart = 0.25,
      longitudeEnd = 0,
      latitudeEnd = 0,
    ] = feature.properties.extent || [];
    mapRef.current.animateToRegion({
      longitude,
      latitude,
      longitudeDelta: Math.abs(longitudeStart - longitudeEnd),
      latitudeDelta: Math.abs(latitudeStart - latitudeEnd),
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <KeyboardAvoidingView behavior="height">
        <MapView ref={mapRef} style={styles.mapStyle}>
          {result && <Geojson geojson={result} />}
        </MapView>
      </KeyboardAvoidingView>
      <SearchBar
        value={query}
        onChangeText={async (query) => {
          setQuery(query);
          const { center } = await mapRef.current.getCamera();
          const suggestions = await fetchGeoSearch({
            q: query,
            lat: center.latitude,
            lon: center.longitude,
          });
          setSuggestions(suggestions);
        }}
        onSubmitEditing={() => {
          if (suggestions.features.length > 0) {
            setLocation(suggestions.features[0]);
          }
        }}
        onPressSuggestion={setLocation}
        suggestions={suggestions.features}
      />
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
