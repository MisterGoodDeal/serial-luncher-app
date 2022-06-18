import { texts } from "@constants/TextsSizes";
import { hp } from "@utils/functions";
import * as React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { Colors, dark, light } from "@themes/Colors";
import { CustomText } from "../Atoms/CustomText";

interface MenuBadgeProps {
  children: string;
  focused: boolean;
  visible: boolean;
}

export const MenuBadge: React.FunctionComponent<MenuBadgeProps> = ({
  children,
  focused,
  visible,
}) => {
  const isDark = useColorScheme() === "dark";

  return (
    <View
      style={{
        width: "100%",
        height: hp("10%"),
        justifyContent: "center",
        alignItems: "center",
        display: !visible ? "none" : undefined,
      }}
    >
      <View
        style={{
          backgroundColor: focused ? Colors.main : Colors.transparent,
          width: "70%",
          height: hp("4%"),
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        <CustomText
          color={focused ? Colors.white : isDark ? dark.text : light.text}
          size={texts.small}
          fontWeight={"500"}
        >
          {children}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
