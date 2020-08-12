import React, { useContext } from 'react';
import { FirebaseContext } from './Firebase';
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import CreatePhoto from "./screens/CreatePhoto";

const Stack = createStackNavigator();

const Navigator = () => {
  const { user } = useContext(FirebaseContext);
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "tomato",
        },
        headerTintColor: "white",
      }}
    >
      {!user && (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ title: "Sign In" }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: "Sign Up" }}
          />
        </>
      )}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "GeoSearch" }}
      />
      {user && (
        <Stack.Screen
          name="CreatePhoto"
          component={CreatePhoto}
          options={{ title: "New Post" }}
        />
      )}
    </Stack.Navigator>
  );
}

export default Navigator;