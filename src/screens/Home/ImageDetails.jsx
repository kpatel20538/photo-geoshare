import React from "react";
import { Image, StyleSheet, View, Dimensions, Text } from "react-native";
import Constants from "expo-constants";

const ImageDetails = ({ selection }) => {
  return (
    <View style={[styles.container, { marginTop: selection ? 0 : 36 }]}>
      {selection && (
        <>
          <Image
            source={{ uri: selection.data.uri }}
            style={{ aspectRatio: 300 / 200 }}
          />
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vestibulum sollicitudin volutpat. Suspendisse blandit maximus
            lectus. Morbi vel neque in enim feugiat ultricies in eu urna. Morbi
            pharetra consequat tincidunt. Donec ut lorem condimentum metus
            elementum tincidunt vitae quis tortor. Nulla vitae nisi id est
            tempor maximus vel sed dui. Ut eleifend sapien orci, sit amet
            bibendum ex dictum in. Nulla laoreet sapien eu dolor egestas
            ultricies. Fusce vestibulum pellentesque nunc ut pharetra. Orci
            varius natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Quisque sollicitudin dui quis urna lacinia, ac luctus
            risus placerat. Integer aliquet lacus odio, ut bibendum ligula
            pharetra non. Sed facilisis nisi lacinia placerat ultrices. Praesent
            eu semper arcu. Etiam finibus orci at magna faucibus, vel bibendum
            diam ultricies. Nunc eu ante nec ex commodo blandit. Mauris sit amet
            pellentesque orci, eu aliquam tortor. Curabitur ac tincidunt quam.
            Donec sit amet egestas nisi, et vestibulum velit. Suspendisse nec
            placerat dui, at condimentum velit. Nunc ullamcorper mi a laoreet
            congue. Phasellus a sapien congue eros ultricies lobortis. Donec
            fermentum euismod diam ut varius. Etiam non aliquam sapien. Nunc a
            bibendum erat, at rhoncus arcu. Curabitur mattis ultrices velit, at
            convallis est tempus quis. Cras blandit urna purus, sit amet
            vulputate orci venenatis a. Proin sodales dignissim dignissim.{" "}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight:
      Dimensions.get("window").height -
      56 -
      96 -
      36 -
      Constants.statusBarHeight,
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: "#F3F4F9",
  },
});

export default ImageDetails;
