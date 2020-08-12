import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import FirebaseProvider from "./src/Firebase";
import Navigator from "./src/Navigator"

const App = () => {
  return (
    <FirebaseProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </FirebaseProvider>
  );
};
export default App;
