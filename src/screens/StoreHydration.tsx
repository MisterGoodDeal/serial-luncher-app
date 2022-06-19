import * as React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { dark, light } from "@themes/Colors";
import { Container } from "@components/common/Container";
import LottieView from "lottie-react-native";

import { hp } from "@utils/functions";

interface StoreHydrationProps {}

export const StoreHydration: React.FunctionComponent<
  StoreHydrationProps
> = ({}) => {
  const isDark = useColorScheme() === "dark";

  return (
    <Container
      flex={1}
      style={{
        width: "100%",
        height: "100%",
      }}
      justifyContent={"center"}
      alignItems={"center"}
      color={isDark ? dark.background : light.background}
    >
      {/* @ts-ignore */}
      <LottieView
        source={
          isDark
            ? require("../assets/lottie/loader_white.json")
            : require("../assets/lottie/loader_black.json")
        }
        autoPlay
        loop
        style={{
          width: hp("30%"),
          height: hp("30%"),
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({});
