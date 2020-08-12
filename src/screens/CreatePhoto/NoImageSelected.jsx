import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FieldContainer from "../../components/FieldContainer";

const NoImageSelected = () => {
  return (
    <FieldContainer>
      <View style={styles.emptyImageContainer}>
        <Text style={styles.emptyImageText}> Select a Photo </Text>
      </View>
    </FieldContainer>
  );
}

export default NoImageSelected

const styles = StyleSheet.create({
  emptyImageContainer: {
    alignItems: "center",
    alignSelf: "stretch",
    aspectRatio: 16 / 9,
    borderColor: "silver",
    borderRadius: 16,
    borderStyle: "dashed",
    borderWidth: 4,
    justifyContent: "center",
    
  },
  emptyImageText: {
    color: "silver",
    fontSize: 24,
    fontWeight: "bold",
  },
});
