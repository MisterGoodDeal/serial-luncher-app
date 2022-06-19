import * as React from "react";
import { Text, TextStyle } from "react-native";
import { Colors } from "@themes/Colors";

export interface CustomTextProps {
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
  underline?: boolean;
  style?: TextStyle;
}

export const CustomText: React.FunctionComponent<CustomTextProps> = ({
  children,
  size,
  color,
  fontWeight,
  align,
  transform,
  underline,
  style,
}) => (
  <Text
    style={[
      { fontSize: size },
      { color: color !== undefined ? color : Colors.black },
      { textAlign: align !== undefined ? align : undefined },
      { textTransform: transform !== undefined ? transform : undefined },
      { fontWeight },
      { fontFamily: "Gibson" },
      { textDecorationLine: underline === undefined ? "none" : "underline" },
      style,
    ]}
  >
    {children === undefined ? "" : children}
  </Text>
);
