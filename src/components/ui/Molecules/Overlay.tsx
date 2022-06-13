import { hp, wp } from "@utils/functions";
import * as React from "react";
import { ImageSourcePropType, View, Image } from "react-native";
import { Colors } from "themes/Colors";

interface OverlayProps {
  color?: string;
  opacity?: number;
  image?: ImageSourcePropType;
}

export const Overlay: React.FunctionComponent<OverlayProps> = ({
  color,
  opacity,
  image,
}) => (
  <>
    {image && (
      <Image
        source={image}
        blurRadius={3}
        style={{
          width: wp("100%"),
          height: hp("100%"),
          position: "absolute",
        }}
      />
    )}
    <View
      style={{
        width: wp("100%"),
        height: hp("100%"),
        position: "absolute",
        backgroundColor: color ?? Colors.black,
        opacity: opacity ?? 0.3,
      }}
    ></View>
  </>
);
