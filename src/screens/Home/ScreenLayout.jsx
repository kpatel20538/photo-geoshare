import React, { useContext, useRef } from "react";
import DrawerLayout from "react-native-gesture-handler/DrawerLayout";
import { View, StyleSheet, Text } from "react-native";
import { FirebaseContext } from "../../Firebase";
import { useNavigation } from "@react-navigation/native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const MenuButton = ({ title, onPress }) => (
  <RectButton
    style={styles.rectButton}
    onPress={onPress}
  >
    <Text style={styles.rectText}>{title}</Text>
  </RectButton>
);

const MenuHeaderButton = ({ onPress }) => (
  <BorderlessButton
    style={styles.headerIcon}
    onPress={onPress}
  >
    <MaterialIcons name="menu" size={24} color="white" />
  </BorderlessButton>
)

const ScreenLayout = ({ children, debugMode, onDebugMode }) => {
  const { auth, user } = useContext(FirebaseContext);
  const ref = useRef();
  const navigation = useNavigation();
  navigation.setOptions({
    headerRight: () => <MenuHeaderButton onPress={() => ref.current.openDrawer()} />
  });

  return (
    <DrawerLayout
      ref={ref}
      drawerWidth={200}
      drawerPosition={DrawerLayout.positions.Right}
      drawerBackgroundColor="#f0f0f0"
      renderNavigationView={() => {
        return (
          <View style={styles.page}>
            {user ? (
              <MenuButton
                title="Sign Out"
                onPress={async () => {
                  await auth.signOut();
                  navigation.replace("SignIn")
                }}
              />
            ) : (
                <MenuButton
                  title="Sign In"
                  onPress={() => { navigation.replace("SignIn") }}
                />
              )}
            <MenuButton
              title="Toggle Debug Mode"
              onPress={() => { onDebugMode(!debugMode) }}
            />
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
  },
  headerIcon: {
    marginHorizontal: 24
  }
});

export default ScreenLayout;
