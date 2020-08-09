import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { fetchGeoSuggestions } from "../api/location";

const useKeywordVisible = ({ onShow, onHide }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const showListener = () => {
      setVisible(true);
      onShow && onShow();
    };
    const hideListener = () => {
      setVisible(false);
      onHide && onHide();
    };
    Keyboard.addListener("keyboardDidShow", showListener);
    Keyboard.addListener("keyboardDidHide", hideListener);
    return () => {
      Keyboard.removeListener("keyboardDidShow", showListener);
      Keyboard.removeListener("keyboardDidHide", hideListener);
    };
  }, [onShow, onHide]);
  return visible;
};

const Suggestion = React.memo(({ title, subtitle, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.suggestion}>
        <Text style={styles.suggestionTitle}>{title}</Text>
        <Text style={styles.suggestionSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
});

const TouchLayer = ({ active, onPress }) => {
  return active ? (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={StyleSheet.absoluteFill} />
    </TouchableWithoutFeedback>
  ) : null;
};

const SearchBar = ({
  value,
  onChangeText,
  onSubmitEditing,
  onPressSuggestion,
  suggestions,
}) => {
  const inputRef = useRef();
  const blurInput = useCallback(() => {
    inputRef.current.blur();
  }, [inputRef]);
  const visible = useKeywordVisible({
    onHide: blurInput,
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      <TouchLayer active={visible} onPress={() => Keyboard.dismiss()} />
      <View style={styles.container}>
        {visible && suggestions.length > 0 && (
          <ScrollView
            style={styles.suggestions}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="interactive"
          >
            {suggestions.slice(0, 4).map((feature) => (
              <Suggestion
                key={feature.properties.osm_id}
                title={feature.properties.name}
                subtitle={feature.properties.osm_value
                  .split("_")
                  .map(
                    (value) =>
                      value.charAt(0).toUpperCase() +
                      value.slice(1).toLowerCase()
                  )
                  .join(" ")}
                onPress={() => {
                  onPressSuggestion(feature);
                  Keyboard.dismiss();
                }}
              />
            ))}
          </ScrollView>
        )}
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderColor: "gainsboro",
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 16,
    fontWeight: "bold",
  },
  container: {
    position: "absolute",
    top: Constants.statusBarHeight + 24,
    left: 24,
    right: 24,
  },
  suggestions: {
    backgroundColor: "white",
    borderColor: "gainsboro",
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 4,
    paddingHorizontal: 16,
    position: "absolute",
    top: 32,
    left: 0,
    right: 0,
  },
  suggestion: {
    paddingVertical: 8,
    borderTopColor: "gainsboro",
    borderTopWidth: 1,
  },
  suggestionTitle: {
    fontWeight: "bold",
  },
  suggestionSubtitle: {
    fontSize: 12,
  },
});

export default SearchBar;
