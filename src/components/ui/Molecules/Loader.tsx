import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "themes/Colors";
import LottieView from "lottie-react-native";
import { hp } from "@utils/functions";

interface LoaderProps {
  loading: boolean;
  size?: number;
  mode: "dark" | "light";
}

const animations = {
  dark: require("../assets/lottie/loading_dark.json"),
  light: require("../assets/lottie/loading_light.json"),
};

export const Loader: React.FunctionComponent<LoaderProps> = ({
  loading,
  size,
  mode,
}) => (
  <View
    style={{
      position: "absolute",
      top: -hp("2%"),
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
        width: size ?? hp("12%"),
        height: size ?? hp("12%"),
      }}
    />
  </View>
);

const styles = StyleSheet.create({});
