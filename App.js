import "react-native-gesture-handler";
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/Home";
import CreatePhoto from "./src/screens/CreatePhoto";
import MyPhotos from "./src/screens/MyPhotos";
import EditPhoto from "./src/screens/EditPhoto";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreatePhoto" component={CreatePhoto} />
        <Stack.Screen name="EditPhoto" component={EditPhoto} />
        <Stack.Screen name="MyPhotos" component={MyPhotos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;