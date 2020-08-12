import React from "react";
import { StyleSheet} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import FieldContainer from "./FieldContainer";
import { shadow } from "../../styles";

const TitleField = ({ title, onTitleChange }) => {
  return (
    <FieldContainer label="Title">
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={onTitleChange}
        placeholder="Enter Title Here..."
      />
    </FieldContainer>
  );
};

export default TitleField;

const styles = StyleSheet.create({
  input: {
    height: 36,
    paddingHorizontal: 12,
    borderBottomColor: "tomato",
    borderBottomWidth: 1,
  },
});
