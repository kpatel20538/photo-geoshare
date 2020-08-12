import React, { useContext } from 'react';
import { FirebaseContext } from './Firebase';
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import CreatePhoto from "./screens/CreatePhoto";
import MyPhotos from "./screens/MyPhotos";
import EditPhoto from "./screens/EditPhoto";

const Stack = createStackNavigator();

const Navigator = () => {
  const { user } = useContext(FirebaseContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "tomato",
        },
        headerTintColor: "white",
      }}
    >
      {user ?
        (
          <>
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
          </>
        ) : (
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
        )
      }
    </Stack.Navigator>
  );
}

export default Navigator;