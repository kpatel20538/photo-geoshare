import React, { useRef, useState, useEffect } from "react";
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

const Home = ({ navigation }) => {
  const mapRef = useRef();
  const inputRef = useRef();
  const bottomSheetRef = useRef();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([
    {
      id: "700",
      coordinate: { latitude: 33.018079, longitude: -96.496097 },
      uri: "https://picsum.photos/id/700/300/200",
    },
    {
      id: "701",
      coordinate: { latitude: 33.016331, longitude: -96.501219 },
      uri: "https://picsum.photos/id/701/300/200",
    },
    {
      id: "702",
      coordinate: { latitude: 33.012358, longitude: -96.496647 },
      uri: "https://picsum.photos/id/702/300/200",
    },
    {
      id: "703",
      coordinate: { latitude: 33.022768, longitude: -96.495747 },
      uri: "https://picsum.photos/id/703/300/200",
    },
  ]);
  const [selection, setSelection] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isSearching && isFocused) {
      inputRef.current.focus();
    } else {
      inputRef.current.blur();
    }
  }, [isSearching, isFocused, inputRef]);

  useEffect(() => {
    const requestLocation = async () => {
      const region = await getCurrentRegion();
      if (region && mapRef.current) {
        mapRef.current.animateToRegion(region);
      }
    };
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
    }, 500);
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

  const handleMarker = (result) => {
    setSelection(result);
  };

  const handeCameraAction = () => {
    // navigation.navigate("CreatePhoto");
    bottomSheetRef.current.snapTo(0);
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setSelection(null);
  };

  return (
    <ScreenLayout>
      <PinMap mapRef={mapRef} results={results} onMarkerPress={handleMarker} />
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
      <CameraActionButton onPress={handeCameraAction} />
    </ScreenLayout>
  );
};

export default Home;
