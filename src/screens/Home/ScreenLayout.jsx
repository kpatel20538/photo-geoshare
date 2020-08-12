import React, { useContext, useRef } from "react";
import DrawerLayout from "react-native-gesture-handler/DrawerLayout";
import { View, StyleSheet, Text } from "react-native";
import Button from "../../components/Button";
import { FirebaseContext } from "../../Firebase";
import { useNavigation } from "@react-navigation/native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const ScreenLayout = ({ children }) => {
  const { firebase, user } = useContext(FirebaseContext);
  const ref = useRef();
  const navigation = useNavigation();
  navigation.setOptions({
    headerRight: () => (
      <BorderlessButton onPress={() => ref.current.openDrawer()} style={{ marginHorizontal: 24 }}>
        <MaterialIcons name="menu" size={24} color="white" />
      </BorderlessButton>
    )
  })

  return (
    <DrawerLayout
      ref={ref}
      drawerWidth={200}
      drawerPosition={DrawerLayout.positions.Right}
      drawerBackgroundColor="#f0f0f0"
      renderNavigationView={() => {
        return (
          <View style={styles.page}>
            {user ? <RectButton style={styles.rectButton} onPress={async () => {
              await firebase.auth().signOut();
              navigation.replace("SignIn")
            }}>
              <Text style={styles.rectText}>Sign Out</Text>
            </RectButton> : <RectButton
              style={styles.rectButton}
              onPress={() => { navigation.replace("SignIn") }}>
                <Text style={styles.rectText}>Sign In</Text>
              </RectButton>}
          </View>
        )
      }}
    >
      <View style={styles.container}>
        {children}
      </View>
    </DrawerLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  page: {
    alignItems: 'stretch',
    paddingTop: 10,
  },
  rectButton: {
    height: 60,
    padding: 20,
    justifyContent: 'center',
    marginTop: 10,
  },
  rectText: {
    fontWeight: 'bold',
  }
});

export default ScreenLayout;
