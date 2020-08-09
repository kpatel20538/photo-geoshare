import React, { useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { fetchGeoSearch } from "../api/location";

import { MaterialIcons } from "@expo/vector-icons";

import { featureCollection } from "@turf/helpers";
import { getCoord } from "@turf/invariant";
import center from "@turf/center";

import SearchBar from "../components/SearchBar";

const Home = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState(featureCollection([]));
  const [result, setResult] = useState(null);
  const mapRef = useRef();

  const setLocation = async (feature) => {
    const [longitude, latitude] = getCoord(center(feature));
    setResult({ longitude, latitude });
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
    <View style={StyleSheet.absoluteFill}>
      <StatusBar style="auto" />
      <MapView ref={mapRef} style={styles.mapStyle}>
        {result && (
          <Marker
            coordinate={result}
            onPress={() => navigation.navigate("EditPhoto")}
          />
        )}
      </MapView>
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
      <TouchableOpacity
        style={styles.fabContainer}
        onPress={() => navigation.navigate("CreatePhoto")}
      >
        <MaterialIcons
          name="camera-alt"
          size={32}
          color="white"
          style={styles.fab}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  fab: {
    padding: 16,
  },
  fabContainer: {
    backgroundColor: "slateblue",
    borderRadius: Number.MAX_SAFE_INTEGER,
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});

export default Home;
