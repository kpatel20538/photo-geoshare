import React, {useContext} from "react";
import { StyleSheet } from "react-native";
import Button from "../../components/Button";
import { FirebaseContext } from "../../Firebase";

const CameraActionButton = ({ onPress }) =>{
  const { user } = useContext(FirebaseContext);

  return <Button style={styles.fab} icon="camera-alt" enabled={user !== null} onPress={onPress} />;
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 24,
  },
});

export default CameraActionButton;
