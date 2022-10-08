import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Platform,
  Image,
  ImageSourcePropType,
} from "react-native";
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
  onPress?: () => void;
  disabled?: boolean;
  logo?: ImageSourcePropType;
  logoScale?: number;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  width,
  height,
  color,
  children,
  fontSize,
  shadow,
  onPress,
  disabled,
  logo,
  logoScale,
}) => (
  <TouchableOpacity
    style={[
      {
        alignSelf: "center",
      },
      shadow ? styles.shadow : {},
    ]}
    onPress={onPress}
    disabled={disabled}
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
        flexDirection: "row",
      }}
    >
      {logo && (
        <Image
          source={logo}
          style={{
            tintColor: textColor(color ?? "#000000"),
            marginRight: hp(".5%"),
            height: height
              ? height * (logoScale ?? 0.6)
              : hp("7%") * (logoScale ?? 0.6),
            width: height
              ? height * (logoScale ?? 0.6)
              : hp("7%") * (logoScale ?? 0.6),
            resizeMode: "contain",
          }}
        />
      )}
      <Text
        style={{
          fontSize: fontSize ?? texts.button,
          color: textColor(color ?? "#000000"),
          fontFamily: Platform.OS === "ios" ? "Gibson" : "Gibson-SemiBold",
          fontWeight: "500",
          textAlign: "center",
          opacity: disabled ? 0.5 : 1,
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
