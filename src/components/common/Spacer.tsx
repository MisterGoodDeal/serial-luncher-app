import * as React from "react";
import { View } from "react-native";
import { hp, wp } from "../../utils/functions";

interface SpacerProps {
  space: string;
  visible?: boolean;
  direction?: "vertical" | "horizontal";
  width?: string;
  color?: string;
}

export const Spacer: React.FunctionComponent<SpacerProps> = ({
  space,
  visible,
  direction,
  width,
  color,
}) => (
  <View
    style={[
      {
        marginHorizontal: direction === "horizontal" ? hp(space) / 2 : 0,
        marginVertical:
          direction === "vertical"
            ? hp(space) / 2
            : direction === "horizontal"
            ? 0
            : hp(space) / 2,
      },
      {
        height: visible ? 1 : 0,
        width: width !== undefined ? wp(width) : "80%",
      },
      {
        borderColor:
          visible && color !== undefined
            ? color
            : visible && color === undefined
            ? "#000"
            : undefined,
      },
      { borderWidth: visible ? 1 : 0, borderRadius: 50 },
    ]}
  ></View>
);
