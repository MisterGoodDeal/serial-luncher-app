import * as React from "react";
import { StyleSheet, TextInput } from "react-native";
import { Colors } from "../constants/Colors";
import Svg, { Defs, ClipPath, Path, G, Rect } from "react-native-svg";
import { hp, wp } from "@utils/functions";

interface InputProps {
  width?: number;
  height?: number;
}

export const Input: React.FunctionComponent<InputProps> = ({
  width,
  height,
}) => (
  <>
    <Svg width={width ?? wp("80%")} height={height ?? hp("7%")}>
      <Defs>
        <ClipPath id="a">
          <Path fill="none" d="M0 0h375v100H0z" />
        </ClipPath>
      </Defs>
      <G data-name="textfield/placeholder" clipPath="url(#a)">
        <G>
          <Rect
            data-name="bg"
            width={width ?? wp("80%")}
            height={height ?? hp("7%")}
            rx={height ? height / 4 : hp("7%") / 4}
            fill="#fff"
          />
        </G>
      </G>
    </Svg>
    <TextInput
      style={{
        position: "relative",
        top: height ? -height : -hp("7%"),
        marginBottom: height ? -height : -hp("7%"),
        paddingHorizontal: hp("2%"),
        zIndex: 10,
        width: width ?? wp("80%"),
        height: height ?? hp("7%"),
        fontSize: 15,
        color: Colors.darkgrey,
      }}
      placeholder="Email"
    />
  </>
);

const styles = StyleSheet.create({});
