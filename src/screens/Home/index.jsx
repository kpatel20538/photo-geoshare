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
        subscriptions.current[newHash] = db.collection('posts')
          .where("location.geohash", ">=", newHash)
          .where("location.geohash", "<", newHash + "~")
          .limit(100)
          .onSnapshot({
            next: snapshot => setData(data => ({
              ...data,
              [newHash]: snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
              }))
            })),
            error: setError
          })
      }
    }

  }, [geohashes[0]]);
  return [data, error];
}

const Home = ({ navigation }) => {
  const mapRef = useRef();
  const inputRef = useRef();
  const bottomSheetRef = useRef();
  const [region, setRegion] = useState(null);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selection, setSelection] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const isFocused = useIsFocused();

  const [data, error] = useGeoCollection(region);

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
    }, 1);
    return () => clearTimeout(handle);
  }, [selection, bottomSheetRef]);

  const handleQueryChange = async (text) => {
    setQuery(text);
    const { center } = await mapRef.current.getCamera();
    const geoCollection = await fetchGeoSearch({
      q: text,
      lat: center.latitude,
      lon: center.longitude,
    });
    setSuggestions(geoCollection.features || []);
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
    <ScreenLayout>
      <PinMap
        mapRef={mapRef}
        data={data}
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
      <PhotoBottomSheet bottomSheetRef={bottomSheetRef} selection={selection} onSettle={() => {
        if (selection === null) {
          setTimeout(() => {
            bottomSheetRef.current.snapTo(2);
          }, 1);
        }
      }}>
        <ImageDetails selection={selection} />
      </PhotoBottomSheet>
      <CameraActionButton onPress={() => navigation.navigate("CreatePhoto")} />
    </ScreenLayout>
  );
};

export default Home;
