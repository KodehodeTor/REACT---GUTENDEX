import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  //Function to find out the initial value
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      //Returns based on value of LocalStore, if not return initialValue.
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error("Could not get LocalStorage", error);
    }
  });

  useEffect(() => {
    try {
      //Information saved after key is a string that is our value.
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Could not write to storage", error);
    }
  }, [key, value]);
  return [value, setValue];
}
