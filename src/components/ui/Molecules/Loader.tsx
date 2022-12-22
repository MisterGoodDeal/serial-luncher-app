import * as React from "react";
import { StyleSheet, View } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";

import LottieView from "lottie-react-native";
import { hp } from "@utils/functions";

interface LoaderProps {
  loading: boolean;
  size?: number;
  dark: boolean;
  top?: number;
}

const animations = {
  dark: require("../../../assets/lottie/loader_black.json"),
  light: require("../../../assets/lottie/loader_white.json"),
};

export const Loader: React.FunctionComponent<LoaderProps> = ({
  loading,
  size,
  dark,
  top,
}) => (
  <View
    style={{
      position: "absolute",
      top: isIphoneX() ? hp("1%") : -hp("2%"),
      zIndex: 99,
      width: "100%",
      alignItems: "center",
      alignSelf: "center",
      display: loading ? "flex" : "none",
    }}
  >
    {/* @ts-ignore */}
    <LottieView
      source={dark ? animations.light : animations.dark}
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
