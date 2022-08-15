import * as React from "react";
import { FlexAlignType, View, Platform, ViewStyle } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Colors } from "@themes/Colors";

interface ContainerProps {
  flex?: number;
  color?: string;
  children?: any;
  alignItems?: FlexAlignType;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;
  direction?: "row" | "column" | "row-reverse" | "column-reverse" | undefined;
  left?: number;
  right?: number;
  style?: ViewStyle;
  disablePaddingFix?: boolean;
}

export const Container: React.FunctionComponent<ContainerProps> = ({
  children,
  flex,
  color,
  alignItems,
  justifyContent,
  direction,
  left,
  right,
  style,
  disablePaddingFix,
}) => (
  <View
    style={[
      {
        flex: flex ? flex : undefined,
        backgroundColor: color ? color : Colors.transparent,
      },
      { alignItems: alignItems ? alignItems : undefined },
      { justifyContent: justifyContent ? justifyContent : undefined },
      { flexDirection: direction ? direction : undefined },
      { paddingLeft: left ? left : 0 },
      { paddingRight: right ? right : 0 },
      {
        paddingTop:
          !disablePaddingFix && Platform.OS === "ios"
            ? heightPercentageToDP("3%")
            : 0,
      },
      style,
    ]}
  >
    {children}
  </View>
);
