import React from "react";
import FieldContainer from "../../components/FieldContainer";
import Button from "../../components/Button";

const SubmitButton = ({ enabled, onPress }) => {
  return (
    <FieldContainer>
      <Button enabled={enabled} onPress={onPress} title="Create Post" />
    </FieldContainer>
  );
};

export default SubmitButton;
