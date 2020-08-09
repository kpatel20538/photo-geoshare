import React, { useState, useEffect, useRef, useCallback, memo } from "react";
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
import { MaterialIcons } from "@expo/vector-icons";

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

const Suggestion = memo(({ title, subtitle, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.suggestion}>
        <Text style={styles.suggestionTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.suggestionSubtitle} numberOfLines={1}>
          {subtitle}
        </Text>
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
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={value}
            placeholder="Search Here..."
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
          />
          {visible && (
            <TouchableOpacity
              onPress={() => {
                onChangeText("");
              }}
            >
              <MaterialIcons name="clear" size={24} color="silver" />
            </TouchableOpacity>
          )}
        </View>
        {visible &&
          suggestions.slice(0, 4).map((feature) => (
            <Suggestion
              key={JSON.stringify(feature.properties)}
              title={feature.properties.name}
              subtitle={feature.properties.osm_value
                .split("_")
                .map(
                  (value) =>
                    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
                )
                .join(" ")}
              onPress={() => {
                onPressSuggestion(feature);
                Keyboard.dismiss();
              }}
            />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    height: 48,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontWeight: "bold",
  },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
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
  suggestion: {
    paddingVertical: 8,
    borderTopColor: "gainsboro",
    marginHorizontal: 16,

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
