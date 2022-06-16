import React from "react";
import { Colors } from "@themes/Colors";
import { CustomTextProps } from "./CustomText";
import { StyleSheet, Text, TextProps, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

interface LinkProps extends CustomTextProps {}

const CustomText = styled.Text`
  font-size: 14px;
  color: #333;
`;

const Link: React.FC<LinkProps> = ({
  fontWeight,
  size,
  align,
  children,
  color,
  onPress,
  transform,
}) => {
  return (
    <TouchableOpacity disabled={onPress === undefined} onPress={onPress}>
      <CustomText
        style={[
          { fontSize: size },
          { color: color !== undefined ? color : Colors.black },
          { textAlign: align !== undefined ? align : undefined },
          { textTransform: transform !== undefined ? transform : undefined },
          { fontWeight },
          { fontFamily: "Gibson" },
          { textDecorationLine: onPress === undefined ? "none" : "underline" },
        ]}
      >
        {children === undefined ? "" : children}
      </CustomText>
    </TouchableOpacity>
  );
};

export default Link;

const styles = StyleSheet.create({});
