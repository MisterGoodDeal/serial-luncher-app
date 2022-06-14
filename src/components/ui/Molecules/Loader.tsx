import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "@themes/Colors";
import LottieView from "lottie-react-native";
import { hp } from "@utils/functions";

interface LoaderProps {
  loading: boolean;
  size?: number;
  mode: "dark" | "light";
  top?: number;
}

const animations = {
  dark: require("../../../assets/lottie/loader_black.json"),
  light: require("../../../assets/lottie/loader_white.json"),
};

export const Loader: React.FunctionComponent<LoaderProps> = ({
  loading,
  size,
  mode,
  top,
}) => (
  <View
    style={{
      position: "absolute",
      top: top ?? hp("1%"),
      zIndex: 99,
      width: "100%",
      alignItems: "center",
      alignSelf: "center",
      display: loading ? "flex" : "none",
    }}
  >
    {/* @ts-ignore */}
    <LottieView
      source={mode === "dark" ? animations.light : animations.dark}
      autoPlay
      loop
      style={{
        width: size ?? hp("15%"),
        height: size ?? hp("15%"),
      }}
    />
  </View>
);

const styles = StyleSheet.create({});
