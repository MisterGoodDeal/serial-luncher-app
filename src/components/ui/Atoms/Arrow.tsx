import { hp } from "@utils/functions";
import * as React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "themes/Colors";

interface ArrowProps {
  onPress: () => void;
  color?: string;
  size?: number;
  direction?: "left" | "right" | "up" | "down";
  top?: number;
  left?: number;
}

export const Arrow: React.FunctionComponent<ArrowProps> = ({
  onPress,
  color,
  size,
  direction,
  top,
  left,
}) => (
  <TouchableOpacity
    onPress={() => onPress()}
    style={{
      position: "absolute",
      top: top ?? hp("5%"),
      left: left ?? hp("3%"),
      width: size ?? hp("4%"),
      height: size ?? hp("4%"),
      zIndex: 99999,
    }}
  >
    <Image
      style={{
        width: size ?? hp("4%"),
        height: size ?? hp("4%"),
        tintColor: color ?? Colors.white,
        transform: [
          {
            rotate:
              direction === "right"
                ? "180deg"
                : direction === "up"
                ? "90deg"
                : direction === "down"
                ? "270deg"
                : "0deg",
          },
        ],
      }}
      source={require("@images/arrow.png")}
      width={size ?? hp("4%")}
      height={size ?? hp("4%")}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({});
