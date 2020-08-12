import React, { useState, useEffect, useRef, useContext } from "react";
import { ScrollView, Alert } from "react-native";
import { nanoid } from "nanoid/non-secure";
import { FirebaseContext } from "../../Firebase";
import { suppress } from "../../helpers";
import { getCurrentRegion } from "../../api/location";
import { pickFromCamera, pickFromImageLibrary } from "../../api/image";
import ImagePickerButtons from "./ImagePickerButtons";
import ImagePreview from "./ImagePreview";
import MapField from "./MapField";
import NoImageSelected from "./NoImageSelected";
import SubmitButton from "./SubmitButton";
import TitleField from "./TitleField";
import { encode } from "ngeohash";

const CreatePhoto = ({ navigation }) => {
  const { db, storage } = useContext(FirebaseContext);
  const mapRef = useRef();
  const [title, setTitle] = useState("");
  const [uri, setUri] = useState(null);
  const [coordinate, setCoordinate] = useState({ latitude: 0, longitude: 0 });
  const [loading, setLoading] = useState(false);

  const canSubmit = uri !== null && title.length > 0;

  const requestUserLocation = suppress(async () => {
    const { region, coordinate } = await getCurrentRegion();
    setCoordinate(coordinate);
    mapRef.current.animateToRegion(region);
  });

  const handleCamera = suppress(async () => {
    const { uri } = await pickFromCamera();
    setUri(uri);
  });

  const handleGallery = suppress(async () => {
    const { uri } = await pickFromImageLibrary();
    setUri(uri);
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = storage.ref(`photos/${nanoid()}`);
      await storageRef.put(blob);
      await blob.close();
      
      await db.collection("posts").add({
        title,
        uri: await storageRef.getDownloadURL(),
        location: {
          coordinate,
          geohash: encode(coordinate.latitude, coordinate.longitude, 12)
        }
      })
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert(error.code, error.message);
    } finally {
      setLoading(false)
    }

  };

  useEffect(() => {
    requestUserLocation();
  }, [mapRef]);

  return (
    <ScrollView>
      <TitleField title={title} onTitleChange={setTitle} />
      {uri ? <ImagePreview source={{ uri }} /> : <NoImageSelected />}
      <ImagePickerButtons
        onCameraPress={handleCamera}
        onGalleryPress={handleGallery}
      />
      <MapField
        mapRef={mapRef}
        coordinate={coordinate}
        onCoordinateChange={setCoordinate}
      />
      <SubmitButton enabled={canSubmit} loading={loading} onPress={handleSubmit} />
    </ScrollView>
  );
};

export default CreatePhoto;
