import React, { createContext } from "react";
import { YellowBox } from 'react-native';
import Constants from "expo-constants";
import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp(Constants.manifest.extra.firebase);
YellowBox.ignoreWarnings(['Setting a timer']);

export const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        db: firebase.firestore()
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
