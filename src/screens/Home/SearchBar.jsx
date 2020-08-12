import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  TextInput,
  BorderlessButton,
  RectButton,
} from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { shadow } from "../../styles";

const getDisplayOsm = (value) =>
  value
    .split("_")
    .map(
      (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    )
    .join(" ");

const AddonButton = ({ icon, onPress }) => {
  return (
    <BorderlessButton style={styles.addon} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color="silver" />
    </BorderlessButton>
  );
}

const Suggestion = ({ title, subtitle, onPress }) => {
  return (
    <RectButton onPress={onPress}>
      <View style={styles.suggestion}>
        <Text style={styles.suggestionTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.suggestionSubtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
    </RectButton>
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
          <AddonButton icon="clear" onPress={onClear} />
          <AddonButton icon="search" onPress={onSubmitEditing} />
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
    borderTopColor: "gainsboro",
    borderStyle: "solid",
    borderTopWidth: 1,
    paddingVertical: 8,
    marginHorizontal: 16,
  },
  suggestionTitle: {
    fontWeight: "bold",
  },
  suggestionSubtitle: {
    fontSize: 12,
  },
});

export default SearchBar;
