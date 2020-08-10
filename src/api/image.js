import * as ImagePicker from "expo-image-picker";

export const pickFromImageLibrary = async () => {
  const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
  if (!granted) {
    throw new Error("Image Library Permission Denied");
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    quality: 1,
    exif: true,
  });
  if (result.cancelled) {
    throw new Error("Image Library Picking Canceled");
  }

  return result;
};

export const pickFromCamera = async () => {
  const { granted } = await ImagePicker.requestCameraPermissionsAsync();
  if (!granted) {
    throw new Error("Camera Permission Denied");
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    quality: 1,
    exif: true,
  });
  if (result.cancelled) {
    throw new Error("Camera Picking Canceled");
  }

  return result;
}
