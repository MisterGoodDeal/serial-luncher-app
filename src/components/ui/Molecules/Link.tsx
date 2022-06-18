import React from "react";
import { Colors } from "@themes/Colors";
import { CustomText, CustomTextProps } from "../Atoms/CustomText";
import { StyleSheet, Text, TextProps, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

interface LinkProps extends TextProps {
  children?: string;
  onPress: () => void;
  top?: number;
}

const LinkText = styled.Text<{ top?: number }>`
  color: ${Colors.white};
  margin-top: ${(p) => p.top ?? "20px"};
`;

const Link: React.FC<LinkProps> = ({ children, onPress, top }) => {
  return (
    <TouchableOpacity
      disabled={onPress === undefined}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <LinkText top={top}>{children}</LinkText>
    </TouchableOpacity>
  );
};

export default Link;

const styles = StyleSheet.create({});
