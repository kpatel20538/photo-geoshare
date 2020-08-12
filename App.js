import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/Home";
import CreatePhoto from "./src/screens/CreatePhoto";
import MyPhotos from "./src/screens/MyPhotos";
import EditPhoto from "./src/screens/EditPhoto";
import StoreProvider from "./src/Store";

const Stack = createStackNavigator();

const App = () => {
  return (
    <StoreProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "tomato",
            },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "GeoSearch" }}
          />
          <Stack.Screen
            name="CreatePhoto"
            component={CreatePhoto}
            options={{ title: "New Post" }}
          />
          <Stack.Screen
            name="EditPhoto"
            component={EditPhoto}
            options={{ title: "Edit Post" }}
          />
          <Stack.Screen
            name="MyPhotos"
            component={MyPhotos}
            options={{ title: "My Posts" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
};
export default App;
