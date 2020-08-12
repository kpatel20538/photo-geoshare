import React, { useRef, useState, useEffect, useContext, useMemo } from "react";
import { useIsFocused } from "@react-navigation/native";
import ScreenLayout from "./ScreenLayout";
import PinMap from "./PinMap";
import DarkLayer from "./DarkLayer";
import SearchBar from "./SearchBar";
import PhotoBottomSheet from "./PhotoBottomSheet";
import ImageDetails from "./ImageDetails";
import CameraActionButton from "./CameraActionButton";
import {
  getRegion,
  getCurrentRegion,
  fetchGeoSearch,
  getGeohashRegion,
} from "../../api/location";
import { Keyboard } from "react-native";
import { suppress } from "../../helpers";
import { FirebaseContext } from "../../Firebase";
import { getPostsWithinGeohash } from "../../api/backend";

const useGeoCollection = (region) => {
  const { db } = useContext(FirebaseContext);
  const geohashes = getGeohashRegion(region);
  const subscriptions = useRef({});
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => () => {
    for (const unsubscribe of Object.values(subscriptions.current)) {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    const newHashes = new Set(geohashes);
    const remainingKeys = new Set(Object.keys(subscriptions.current));
    for (const oldHash of Object.keys(subscriptions.current)) {
      if (!newHashes.has(oldHash)) {
        remainingKeys.delete(oldHash);
        subscriptions.current[oldHash]();
        delete subscriptions.current[oldHash];
      }
    }
    setData(data => {
      const nextData = {};
      for (const key of remainingKeys) {
        nextData[key] = data[key];
      }
      return nextData;
    });

    for (const newHash of geohashes) {
      if (!remainingKeys.has(newHash)) {
        getPostsWithinGeohash(db, newHash, {
          onNext: section => setData(data => ({ ...data, [newHash]: section })),
          onError: setError
        });
      }
    }

  }, [geohashes[0]]);
  return [data, error];
}

const Home = ({ navigation }) => {
  const mapRef = useRef();
  const inputRef = useRef();
  const bottomSheetRef = useRef();

  const [debugMode, setDebugMode] = useState(false);
  const [region, setRegion] = useState(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selection, setSelection] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const isFocused = useIsFocused();

  const [data] = useGeoCollection(region);

  useEffect(() => {
    if (isSearching && isFocused) {
      inputRef.current.focus();
      setSelection(null);
    } else {
      inputRef.current.blur();
    }
  }, [isSearching, isFocused, inputRef]);

  useEffect(() => {
    const requestLocation = suppress(async () => {
      const { region } = await getCurrentRegion();
      mapRef.current.animateToRegion(region);
    });
    requestLocation();
  }, [mapRef]);

  useEffect(() => {
    const listener = () => setIsSearching(false);
    Keyboard.addListener("keyboardDidHide", listener);
    return () => Keyboard.removeListener("keyboardDidHide", listener);
  }, []);

  useEffect(() => {
    const handle = setTimeout(() => {
      if (selection) {
        bottomSheetRef.current.snapTo(1);
      } else {
        bottomSheetRef.current.snapTo(2);
      }
    }, 10);
    return () => clearTimeout(handle);
  }, [selection, bottomSheetRef]);

  const handleQueryChange = async (text) => {
    setQuery(text);
    const { center } = await mapRef.current.getCamera();
    await fetchGeoSearch({
      q: text,
      lat: center.latitude,
      lon: center.longitude,
    }, { 
      onNext: geoCollection => setSuggestions(geoCollection.features || []) 
    });
  };

  const handleSuggestion = (geoFeature) => {
    if (geoFeature) {
      mapRef.current.animateToRegion(getRegion(geoFeature));
      setIsSearching(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setSelection(null);
  };

  return (
    <ScreenLayout debugMode={debugMode} onDebugMode={setDebugMode}>
      <PinMap
        mapRef={mapRef}
        data={data}
        debugMode={debugMode}
        region={region}
        onMarkerPress={setSelection}
        onRegionChangeComplete={setRegion}
      />
      <DarkLayer
        active={isSearching && isFocused}
        onPress={() => setIsSearching(false)}
      />
      <SearchBar
        inputRef={inputRef}
        value={query}
        suggestions={suggestions.slice(0, 4)}
        isSearching={isSearching && isFocused}
        onFocus={() => setIsSearching(true)}
        onClear={handleClear}
        onChangeText={handleQueryChange}
        onSubmitEditing={() => handleSuggestion(suggestions[0])}
        onSuggestionPress={handleSuggestion}
      />
      <PhotoBottomSheet bottomSheetRef={bottomSheetRef} selection={selection}>
        <ImageDetails selection={selection} />
      </PhotoBottomSheet>
      <CameraActionButton
        onPress={() => navigation.navigate("CreatePhoto")}
      />
    </ScreenLayout>
  );
};

export default Home;
