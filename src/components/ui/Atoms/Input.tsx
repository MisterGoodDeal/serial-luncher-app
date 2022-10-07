import * as React from "react";
import { Platform, StyleSheet, TextInput } from "react-native";
import { Colors, dark, light } from "@themes/Colors";
import Svg, { Defs, ClipPath, Path, G, Rect } from "react-native-svg";
import { hp, wp } from "@utils/functions";
import { texts } from "@constants/TextsSizes";

interface InputProps {
  onBlur?: () => void;
  width?: number;
  height?: number;
  placeholder: string;
  password?: boolean;
  value: string;
  setValue: (value: string) => void;
  color?: string;
  type:
    | "none"
    | "URL"
    | "addressCity"
    | "addressCityAndState"
    | "addressState"
    | "countryName"
    | "creditCardNumber"
    | "emailAddress"
    | "familyName"
    | "fullStreetAddress"
    | "givenName"
    | "jobTitle"
    | "location"
    | "middleName"
    | "name"
    | "namePrefix"
    | "nameSuffix"
    | "nickname"
    | "organizationName"
    | "postalCode"
    | "streetAddressLine1"
    | "streetAddressLine2"
    | "sublocality"
    | "telephoneNumber"
    | "username"
    | "password"
    | "newPassword"
    | "oneTimeCode";
  fontSize?: number;
  isDark: boolean;
  maxLength?: number;
  disabled?: boolean;
}

export const Input: React.FunctionComponent<InputProps> = ({
  onBlur,
  width,
  height,
  placeholder,
  password,
  value,
  setValue,
  type,
  fontSize,
  isDark,
  color,
  maxLength,
  disabled,
}) => (
  <>
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
            fill={
              color
                ? color
                : isDark
                ? dark.input.background
                : light.input.background
            }
          />
        </G>
      </G>
    </Svg>
    <TextInput
      onBlur={onBlur}
      style={{
        opacity: disabled ? 0.5 : 1,
        position: "relative",
        top: height ? -height : -hp("7%"),
        marginBottom: height ? -height : -hp("7%"),
        paddingHorizontal: hp("2%"),
        zIndex: 10,
        width: width ?? wp("80%"),
        height: height ?? hp("7%"),
        fontSize: fontSize ?? texts.input,
        color: isDark ? dark.input.text : light.input.text,
        fontFamily: Platform.OS === "ios" ? "Gibson" : "Gibson-Regular",
      }}
      editable={!disabled}
      maxLength={maxLength}
      textContentType={type}
      autoCapitalize={type === "emailAddress" ? "none" : undefined}
      placeholder={placeholder}
      placeholderTextColor={
        isDark ? dark.input.placeholder : light.input.placeholder
      }
      secureTextEntry={password}
      value={value}
      onChangeText={setValue}
    />
  </>
);

const styles = StyleSheet.create({});
