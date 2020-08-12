import React, { createContext, useState, useEffect } from "react";
import { YellowBox } from 'react-native';
import Constants from "expo-constants";
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

firebase.initializeApp(Constants.manifest.extra.firebase);
YellowBox.ignoreWarnings(['Setting a timer']);

export const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
  const [db] = useState(() => firebase.firestore(), [firebase])
  const [storage] = useState(() => firebase.storage(), [firebase])
  const [user, setUser] = useState(null);

  useEffect(() => firebase.auth().onAuthStateChanged(setUser));

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        db,
        storage,
        user,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
