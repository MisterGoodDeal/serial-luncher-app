import React from "react";
import { Colors } from "@themes/Colors";
import { CustomText, CustomTextProps } from "../Atoms/CustomText";
import { StyleSheet, Text, TextProps, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

interface LinkProps extends CustomTextProps {
  onPress: () => void;
}

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
        size={size}
        color={color}
        align={align}
        fontWeight={fontWeight}
        transform={transform}
        underline={true}
      >
        {children === undefined ? "" : children}
      </CustomText>
    </TouchableOpacity>
  );
};

export default Link;

const styles = StyleSheet.create({});
