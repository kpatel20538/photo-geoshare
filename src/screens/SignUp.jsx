import React, { useState, useContext } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { FirebaseContext } from "../Firebase";
import FieldContainer from "../components/FieldContainer";
import { TextInput } from "react-native-gesture-handler";
import Button from "../components/Button";
import { useAsyncCallback } from "../helpers";

const SignUp = () => {
  const { auth } = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [handleSubmit, loading] = useAsyncCallback(() => (
    auth.createUserWithEmailAndPassword(email, password)
  ));

  const canSubmit = /[^@]+@.+/.test(email)
    && password.length >= 6
    && password === repeatPassword;

  return (
    <ScrollView>
      <FieldContainer label={`Email${/[^@]+@.+/.test(email) ? "" : " (Invalid)"}`}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email Here..."
          autoCompleteType="email"
          keyboardType="email-address"
        />
      </FieldContainer>
      <FieldContainer label={`Password${password.length < 6 ? " (Minimum Length 6)" : ""}`}>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter Password Here..."
          autoCompleteType="password"
          secureTextEntry
        />
      </FieldContainer>
      <FieldContainer label={`Repeat Password${password !== repeatPassword ? " (Mismatch)" : ""}`}>
        <TextInput
          style={styles.input}
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          placeholder="Enter Password Here..."
          autoCompleteType="password"
          secureTextEntry
        />
      </FieldContainer>
      <FieldContainer>
        <Button
          title="Create Account"
          enabled={canSubmit}
          loading={loading}
          onPress={handleSubmit}
        />
      </FieldContainer>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  input: {
    height: 36,
    paddingHorizontal: 12,
    borderBottomColor: "tomato",
    borderBottomWidth: 1,
  },
});

