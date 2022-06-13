import * as React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "themes/Colors";

interface CustomTextProps {
  children?: string;
  size: number;
  color?: string;
  align?: "left" | "center" | "right" | "justify";
  transform?: "capitalize" | "uppercase" | "lowercase";
  fontWeight:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
    | undefined;
  onPress?: () => void;
}

export const CustomText: React.FunctionComponent<CustomTextProps> = ({
  children,
  size,
  color,
  fontWeight,
  align,
  transform,
  onPress,
}) => (
  <TouchableOpacity disabled={onPress === undefined} onPress={onPress}>
    <Text
      style={[
        { fontSize: size },
        { color: color !== undefined ? color : Colors.black },
        { textAlign: align !== undefined ? align : undefined },
        { textTransform: transform !== undefined ? transform : undefined },
        { fontWeight },
        { fontFamily: "Gibson" },
        { textDecorationLine: onPress === undefined ? "none" : "underline" },
      ]}
    >
      {children === undefined ? "" : children}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({});
