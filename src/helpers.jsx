import { useState } from 'react';
import { Alert } from "react-native";

export const suppress = (func) => async (...args) => {
  try {
    return await func(...args);
  } catch (error) {
    console.log(`SUPPRESSED: ${error.name}: ${error.message}`);
  }
}

export const useAsyncCallback = (func) => {
  const [loading, setLoading] = useState(false)

  const callback = async (...args) => {
    try {
      setLoading(true);
      return await func(...args);
    } catch (error) {
      Alert.alert(error.code, error.message);
    } finally {
      setLoading(false);
    }
  }

  return [callback, loading];
}