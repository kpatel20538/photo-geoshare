import React, { useState, useEffect, useContext } from "react";
import { ScrollView, Alert, StyleSheet } from "react-native";
import { FirebaseContext } from "../Firebase";
import FieldContainer from "../components/FieldContainer";
import { TextInput } from "react-native-gesture-handler";
import Button from "../components/Button";

const SignIn = ({ navigation }) => {
  const { firebase } = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = email.length > 0 && password.length > 0;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await firebase.auth()
        .signInWithEmailAndPassword(email, password);
    } catch (error) {
      Alert.alert(error.code, error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <FieldContainer label="Email">
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email Here..."
          autoCompleteType="email"
          keyboardType="email-address"
        />
      </FieldContainer>
      <FieldContainer label="Password">
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter Password Here..."
          autoCompleteType="password"
          secureTextEntry
        />
      </FieldContainer>
      <FieldContainer>
        <Button
          title="Sign In"
          enabled={canSubmit}
          loading={loading}
          onPress={handleSubmit}
        />
      </FieldContainer>
      <FieldContainer>
        <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
      </FieldContainer>
      <FieldContainer>
        <Button title="Skip" onPress={() => navigation.replace("Home")} />
      </FieldContainer>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  input: {
    height: 36,
    paddingHorizontal: 12,
    borderBottomColor: "tomato",
    borderBottomWidth: 1,
  },
});

