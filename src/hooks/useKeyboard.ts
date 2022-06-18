// @ts-nocheck
import { useEffect, useState } from "react";
import { Platform, Keyboard } from "react-native";

export const useKeyboard = (): [boolean, number] => {
  useEffect(() => {
    Platform.OS === "ios"
      ? Keyboard.addListener("keyboardWillShow", _keyboardShow)
      : Keyboard.addListener("keyboardDidShow", _keyboardShow);
    Platform.OS === "ios"
      ? Keyboard.addListener("keyboardWillHide", _keyboardHide)
      : Keyboard.addListener("keyboardDidHide", _keyboardHide);

    return () => {
      Platform.OS === "ios"
        ? Keyboard.removeListener("keyboardWillShow", _keyboardShow)
        : Keyboard.removeListener("keyboardDidShow", _keyboardShow);
      Platform.OS === "ios"
        ? Keyboard.removeListener("keyboardWillHide", _keyboardHide)
        : Keyboard.removeListener("keyboardDidHide", _keyboardHide);
    };
  }, []);

  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [buttonContainerSize, setButtonContainerSize] = useState(1);

  const _keyboardShow = () => {
    setKeyboardStatus(true);
    Keyboard.scheduleLayoutAnimation({
      duration: 250,
      easing: Platform.OS === "ios" ? "keyboard" : "easeInEaseOut",
    });
    setButtonContainerSize(0.5);
  };
  const _keyboardHide = () => {
    setKeyboardStatus(false);
    Keyboard.scheduleLayoutAnimation({
      duration: 250,
      easing: Platform.OS === "ios" ? "keyboard" : "easeInEaseOut",
    });
    setButtonContainerSize(1);
  };

  return [keyboardStatus, buttonContainerSize];
};
