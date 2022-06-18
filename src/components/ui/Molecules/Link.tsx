import React from "react";
import { CustomText, CustomTextProps } from "../Atoms/CustomText";
import { TouchableOpacity } from "react-native";

interface LinkProps extends CustomTextProps {
  onPress: () => void;
}

export const Link: React.FC<LinkProps> = ({
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
