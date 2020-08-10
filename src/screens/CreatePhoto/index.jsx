import React, { useState, useEffect, useRef, useContext } from "react";
import { View, Text, StyleSheet, TextInput, Image, Button } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { shadow } from "../../styles";
import { ScrollView } from "react-native-gesture-handler";
import MapInput from "./MapInput";
import { suppress } from "../../helpers";
import { getCurrentRegion } from "../../api/location";
import { pickFromCamera, pickFromImageLibrary } from "../../api/image";
import { StoreContext } from "../../Store";
import { nanoid } from "nanoid/non-secure";

const CreatePhoto = ({ navigation }) => {
  const mapRef = useRef();
  const [title, setTitle] = useState("");
  const [uri, setUri] = useState(null);
  const [coordinate, setCoordinate] = useState({ latitude: 0, longitude: 0 });
  const { createPost } = useContext(StoreContext);

  useEffect(() => {
    const requestLocation = suppress(async () => {
      const { region, coordinate } = await getCurrentRegion();
      setCoordinate(coordinate);
      mapRef.current.animateToRegion(region);
    });
    requestLocation();
  }, [mapRef]);
  return (
    <ScrollView>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter Title Here..."
        />
      </View>
      <View style={styles.imageContainer}>
        {uri ? (
          <Image style={styles.image} source={{ uri }} />
        ) : (
          <View style={styles.emptyImage}>
            <Text style={styles.emptyImageText}> Select a Photo </Text>
          </View>
        )}
      </View>
      <View style={styles.buttonsContainer}>
        <MaterialIcons.Button
          name="camera-alt"
          size={32}
          color="white"
          backgroundColor="tomato"
          onPress={suppress(async () => {
            const { uri } = await pickFromCamera();
            setUri(uri);
          })}
        >
          Take Photo
        </MaterialIcons.Button>
        <MaterialIcons.Button
          name="collections"
          size={32}
          color="white"
          backgroundColor="tomato"
          onPress={suppress(async () => {
            const { uri } = await pickFromImageLibrary();
            console.log(uri);
            setUri(uri);
          })}
        >
          From Gallery
        </MaterialIcons.Button>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <MapInput
          mapRef={mapRef}
          coordinate={coordinate}
          setCoordinate={setCoordinate}
        />
      </View>
      <View style={styles.inputContainer}>
        <Button
          color="tomato"
          title="Post"
          disabled={uri === null}
          onPress={() => {
            createPost({ title, uri, coordinate, id: nanoid() });
            navigation.goBack();
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  emptyImageText: {
    color: "silver",
    fontWeight: "bold",
    fontSize: 24,
  },
  imageContainer: {
    alignItems: "stretch",
    margin: 16,
    ...shadow,
    borderRadius: 16,
  },
  image: {
    aspectRatio: 16 / 9,
    borderRadius: 16,
  },
  emptyImage: {
    aspectRatio: 16 / 9,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
  },
  input: {
    ...shadow,

    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  inputContainer: {
    margin: 16,
  },
});

export default CreatePhoto;
