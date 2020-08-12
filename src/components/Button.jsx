import React from "react";
import { StyleSheet, Text, ActivityIndicator } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { shadow } from "../styles";

const Button = ({
  enabled = true,
  loading,
  onPress,
  title,
  icon,
  rounded,
  iconSet: Icons = MaterialIcons,
  style,
}) => {
  return (
    <RectButton
      style={[
        enabled ? styles.button : styles.disabledButton,
        rounded ? styles.rounded : styles.block,
        style,
      ]}
      enabled={enabled && !loading}
      onPress={onPress}
    >
      {loading ? <ActivityIndicator color="white" /> : (
        <>
          {icon && (
            <Icons name={icon} size={32} color={enabled ? "white" : "gray"} />
          )}
          {title && (
            <Text style={enabled ? styles.title : styles.disabledTitle}>
              {title}
            </Text>
          )}
        </>
      )}

    </RectButton>
  );
};

export default Button;

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  disabledTitle: {
    color: "grey",
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    ...shadow,
    backgroundColor: "tomato",
    padding: 12,
    alignItems: "center",
  },
  disabledButton: {
    ...shadow,
    backgroundColor: "silver",
    padding: 12,
    alignItems: "center",
  },
  rounded: {
    borderRadius: Number.MAX_SAFE_INTEGER,
  },
  block: {
    borderRadius: 12,
  },
});
