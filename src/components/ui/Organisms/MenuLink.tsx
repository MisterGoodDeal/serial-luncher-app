import * as React from "react";
import { Colors, dark, light } from "@themes/Colors";
import { TouchableOpacity } from "react-native";
import { CustomText } from "../Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { Lang } from "@constants/Lang";
import { hp } from "@utils/functions";

interface MenuLinkProps {
  onPress: () => void;
  children: string;
  isDark: boolean;
  color?: string;
}

export const MenuLink: React.FunctionComponent<MenuLinkProps> = ({
  onPress,
  children,
  isDark,
  color,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      marginVertical: hp("1.5%"),
    }}
  >
    <CustomText
      size={texts.button}
      fontWeight="600"
      color={color ? color : isDark ? dark.text : light.text}
    >
      {children}
    </CustomText>
  </TouchableOpacity>
);
