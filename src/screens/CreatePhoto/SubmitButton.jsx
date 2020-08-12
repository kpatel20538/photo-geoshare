import React from "react";
import FieldContainer from "../../components/FieldContainer";
import Button from "../../components/Button";

const SubmitButton = ({ enabled, loading, onPress }) => {
  return (
    <FieldContainer>
      <Button enabled={enabled} loading={loading} onPress={onPress} title="Create Post" />
    </FieldContainer>
  );
};

export default SubmitButton;
