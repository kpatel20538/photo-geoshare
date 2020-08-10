import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { shadow } from "../../styles";

const getDisplayOsm = (value) =>
  value
    .split("_")
    .map(
      (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    )
    .join(" ");

const ClearButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons
        style={styles.addon}
        name="clear"
        size={24}
        color="silver"
      />
    </TouchableOpacity>
  );
};

const SearchButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons
        style={styles.addon}
        name="search"
        size={24}
        color="silver"
      />
    </TouchableOpacity>
  );
};

const Suggestion = ({ title, subtitle, onPress }) => {
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
};

const SearchBar = ({
  inputRef,
  value,
  suggestions,
  isSearching,
  onFocus,
  onClear,
  onChangeText,
  onSubmitEditing,
  onSuggestionPress,
}) => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Search Here..."
            value={value}
            onFocus={onFocus}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
          />
          <ClearButton onPress={onClear} />
          <SearchButton onPress={onSubmitEditing} />
        </View>
        {isSearching &&
          suggestions.map((feature) => (
            <Suggestion
              key={JSON.stringify(feature.properties)}
              title={feature.properties.name}
              subtitle={getDisplayOsm(feature.properties.osm_value)}
              onPress={() => onSuggestionPress(feature)}
            />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addon: {
    marginLeft: 8,
  },
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
    ...shadow,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
    margin: 24,    
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
