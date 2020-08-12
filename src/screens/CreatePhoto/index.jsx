import React, { useState, useEffect, useRef, useContext } from "react";
import { ScrollView } from "react-native";
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

const CreatePhoto = ({ navigation }) => {
  const { db } = useContext(FirebaseContext);
  const mapRef = useRef();
  const [title, setTitle] = useState("");
  const [uri, setUri] = useState(null);
  const [coordinate, setCoordinate] = useState({ latitude: 0, longitude: 0 });

  const canSubmit = uri !== null;

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

  const handleSubmit = () => {
    createPost({ title, uri, coordinate, id: nanoid() });
    navigation.goBack();
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
      <SubmitButton enabled={canSubmit} onPress={handleSubmit} />
    </ScrollView>
  );
};

export default CreatePhoto;
