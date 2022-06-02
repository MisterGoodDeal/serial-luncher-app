import * as React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import Svg, { Defs, ClipPath, Path, G, Rect } from "react-native-svg";
import { hp, textColor, wp } from "@utils/functions";
import { texts } from "@constants/TextsSizes";

interface ButtonProps {
  width?: number;
  height?: number;
  color: string;
  children: string;
  fontSize?: number;
  shadow?: boolean;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  width,
  height,
  color,
  children,
  fontSize,
  shadow,
}) => (
  <TouchableOpacity
    style={[
      {
        alignSelf: "center",
      },
      shadow ? styles.shadow : {},
    ]}
  >
    <Svg width={width ?? wp("80%")} height={height ?? hp("7%")}>
      <Defs>
        <ClipPath id="a">
          <Path fill="none" d="M0 0h375v100H0z" />
        </ClipPath>
      </Defs>
      <G>
        <G>
          <Rect
            data-name="bg"
            width={width ?? wp("80%")}
            height={height ?? hp("7%")}
            rx={height ? height / 4 : hp("7%") / 4}
            fill={color}
          />
        </G>
      </G>
    </Svg>
    <View
      style={{
        position: "relative",
        top: height ? -height : -hp("7%"),
        marginBottom: height ? -height : -hp("7%"),
        height: height ?? hp("7%"),
        paddingHorizontal: hp("2%"),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: fontSize ?? texts.button,
          color: textColor(color),
          fontFamily: "Gibson",
          fontWeight: "500",
        }}
      >
        {children}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
});
