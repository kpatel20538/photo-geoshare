import React, { useRef, useState, useEffect, useContext } from "react";
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
} from "../../api/location";
import { Keyboard } from "react-native";
import { suppress } from "../../helpers";
import { StoreContext } from "../../Store";

const Home = ({ navigation }) => {
  const mapRef = useRef();
  const inputRef = useRef();
  const bottomSheetRef = useRef();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { results } = useContext(StoreContext);
  const [selection, setSelection] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const isFocused = useIsFocused();

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
      // setResults
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
      <PinMap mapRef={mapRef} results={results} onMarkerPress={setSelection} />
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
      <CameraActionButton onPress={() => navigation.navigate("CreatePhoto")} />
    </ScreenLayout>
  );
};

export default Home;
