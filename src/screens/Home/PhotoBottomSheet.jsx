import React from "react";
import { StyleSheet, View } from "react-native";
import ScrollBottomSheet from "react-native-scroll-bottom-sheet";
import Constants from "expo-constants";

const headerHeight = 56;

const PanHandle = () => (
  <View style={styles.header}>
    <View style={styles.panelHandle} />
  </View>
);

const PhotoBottomSheet = ({
  bottomSheetRef,
  selection,
  onSettle,
  children,
}) => {
  return (
    <ScrollBottomSheet
      ref={bottomSheetRef}
      componentType="ScrollView"
      snapPoints={[96, "50%", "100%"]}
      initialSnapIndex={2}
      topInset={Constants.statusBarHeight + headerHeight + 36}
      onSettle={onSettle}
      renderHandle={() => (selection ? <PanHandle /> : null)}
      style={selection === null && {display: "none"}}
    >
      {children}
    </ScrollBottomSheet>
  );
};

const styles = StyleSheet.create({
  
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
