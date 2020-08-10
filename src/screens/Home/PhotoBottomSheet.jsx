import React, { useImperativeHandle, forwardRef, useRef } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import ScrollBottomSheet from "react-native-scroll-bottom-sheet";
import Constants from "expo-constants";

const headerHeight = 56;

const PanHandle = () => (
  <View style={styles.header}>
    <View style={styles.panelHandle} />
  </View>
);

const PhotoBottomSheet = ({ bottomSheetRef, onSettle, children }) => {
  return (
    <ScrollBottomSheet
      ref={bottomSheetRef}
      contentContainerStyle={styles.contentContainerStyle}
      componentType="ScrollView"
      snapPoints={[96, "50%", "100%"]}
      initialSnapIndex={2}
      topInset={Constants.statusBarHeight + headerHeight + 36}
      onSettle={onSettle}
      renderHandle={() => <PanHandle />}
    >
      {children}
    </ScrollBottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: "#F3F4F9",
  },
  header: {
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  panelHandle: {
    width: 64,
    height: 4,
    backgroundColor: "silver",
    borderRadius: 8,
  },
});

export default PhotoBottomSheet;
