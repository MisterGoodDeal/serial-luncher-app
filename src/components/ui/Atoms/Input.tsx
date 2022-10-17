import * as React from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { Colors, dark, light } from "@themes/Colors";
import Svg, { Defs, ClipPath, Path, G, Rect } from "react-native-svg";
import { hp, textColor, wp } from "@utils/functions";
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
}) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
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
      <View
        style={{
          opacity: disabled ? 0.5 : 1,
          position: "relative",
          top: height ? -height : -hp("7%"),
          marginBottom: height ? -height : -hp("7%"),
          paddingHorizontal: hp("2%"),
          zIndex: 10,
          width: width ?? wp("80%"),
          height: height ?? hp("7%"),
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          onBlur={onBlur}
          style={{
            fontSize: fontSize ?? texts.input,
            color: isDark ? dark.input.text : light.input.text,
            fontFamily: Platform.OS === "ios" ? "Gibson" : "Gibson-Regular",
            textAlign: "left",
            width: password ? width ?? wp("60%") : undefined,
          }}
          editable={!disabled}
          maxLength={maxLength}
          textContentType={type}
          autoCapitalize={type === "emailAddress" ? "none" : undefined}
          placeholder={placeholder}
          placeholderTextColor={
            isDark ? dark.input.placeholder : light.input.placeholder
          }
          secureTextEntry={password && !passwordVisible}
          value={value}
          onChangeText={setValue}
        />
        {password && (
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Image
              source={
                passwordVisible
                  ? require("@images/visible.png")
                  : require("@images/hidden.png")
              }
              style={{
                width: height ? height / 2 : hp("3%"),
                height: height ? height / 2 : hp("3%"),
                position: "relative",
                top: height ? height / 2 - height / 4 : hp("3.5%") - hp("1.5%"),
                tintColor: isDark ? dark.text : light.text,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({});
