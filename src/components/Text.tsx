import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors } from "../constants/Colors";

interface GBTextProps {
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
}

export const GBText: React.FunctionComponent<GBTextProps> = ({
  children,
  size,
  color,
  fontWeight,
  align,
  transform,
}) => (
  <Text
    style={[
      { fontSize: size },
      { color: color !== undefined ? color : Colors.black },
      { textAlign: align !== undefined ? align : undefined },
      { textTransform: transform !== undefined ? transform : undefined },
      { fontWeight },
      { fontFamily: "Gibson" },
    ]}
  >
    {children === undefined ? "" : children}
  </Text>
);

const styles = StyleSheet.create({});
