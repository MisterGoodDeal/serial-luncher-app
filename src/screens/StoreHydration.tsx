import * as React from "react";
import { StyleSheet, Image } from "react-native";
import { Colors } from "@themes/Colors";
import { Container } from "@components/common/Container";
import LottieView from "lottie-react-native";

import { hp } from "@utils/functions";

interface StoreHydrationProps {}

export const StoreHydration: React.FunctionComponent<
  StoreHydrationProps
> = ({}) => (
  <Container
    flex={1}
    style={{
      width: "100%",
      height: "100%",
    }}
    justifyContent={"center"}
    alignItems={"center"}
    color={Colors.darkgrey}
  >
    {/* @ts-ignore */}
    <LottieView
      source={require("../assets/lottie/loader_white.json")}
      autoPlay
      loop
      style={{
        width: hp("30%"),
        height: hp("30%"),
      }}
    />
  </Container>
);

const styles = StyleSheet.create({});
