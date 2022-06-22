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
  icon: ImageSourcePropType;
  size: number;
  top: number;
  right: number;
  color?: string;
}

export const MapButton: React.FunctionComponent<MapButtonProps> = ({
  onPress,
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
      borderRadius: size / 2,
    }}
    onPress={onPress}
  >
    <Image
      source={icon}
      style={[
        {
          width: size * 0.8,
          height: size * 0.8,
          tintColor: textColor(color ?? Colors.main),
        },
      ]}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({});
