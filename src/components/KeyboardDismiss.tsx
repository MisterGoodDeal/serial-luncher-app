import * as React from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";

interface KeyboardDismissProps {
  children: any;
}

export const KeyboardDismiss: React.FunctionComponent<KeyboardDismissProps> = ({
  children,
}) => (
  <TouchableWithoutFeedback
    onPress={() => Keyboard.dismiss()}
    style={{ height: "100%" }}
  >
    <View style={{ height: "100%" }}>{children}</View>
  </TouchableWithoutFeedback>
);
