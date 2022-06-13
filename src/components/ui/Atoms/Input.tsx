import * as React from "react";
import { StyleSheet, TextInput } from "react-native";
import { Colors } from "themes/Colors";
import Svg, { Defs, ClipPath, Path, G, Rect } from "react-native-svg";
import { hp, wp } from "@utils/functions";
import { texts } from "@constants/TextsSizes";

interface InputProps {
  width?: number;
  height?: number;
  placeholder: string;
  password?: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
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
}

export const Input: React.FunctionComponent<InputProps> = ({
  width,
  height,
  placeholder,
  password,
  value,
  setValue,
  type,
  fontSize,
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
        fontSize: fontSize ?? texts.input,
        color: Colors.darkgrey,
        fontFamily: "Gibson",
      }}
      textContentType={type}
      autoCapitalize={type === "emailAddress" ? "none" : undefined}
      placeholder={placeholder}
      secureTextEntry={password}
      value={value}
      onChangeText={(text) => setValue(text)}
    />
  </>
);

const styles = StyleSheet.create({});
