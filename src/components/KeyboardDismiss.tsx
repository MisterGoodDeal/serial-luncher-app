import * as React from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

interface KeyboardDismissProps {
  children: any;
}

export const KeyboardDismiss: React.FunctionComponent<KeyboardDismissProps> = ({
  children,
}) => (
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ height: "100%" }}
  >
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      style={{ height: "100%" }}
    >
      <View style={{ height: "100%" }}>{children}</View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);
