import * as React from "react";
import {
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Colors } from "@themes/Colors";
import { textColor, wp } from "@utils/functions";

interface MapButtonProps {
  onPress: () => void;
  longPress?: () => void;
  icon: ImageSourcePropType;
  size: number;
  top: number;
  right: number;
  color?: string;
}

export const MapButton: React.FunctionComponent<MapButtonProps> = ({
  onPress,
  longPress,
  icon,
  size,
  top,
  right,
  color,
}) => (
  <TouchableOpacity
    style={{
      position: "absolute",
      top: top,
      right: right,
      width: size,
      height: size,
      backgroundColor: color || Colors.main,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 12,
    }}
    onPress={onPress}
    onLongPress={longPress}
  >
    <Image
      source={icon}
      style={[
        {
          width: size * 0.6,
          height: size * 0.6,
          tintColor: textColor(color ?? Colors.main),
        },
      ]}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({});
