import { Colors } from "@themes/Colors";
import { Platform } from "react-native";
import ImageColors from "react-native-image-colors";

export {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const textColor = (bgColor: string) => {
  var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16);
  var g = parseInt(color.substring(2, 4), 16);
  var b = parseInt(color.substring(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "black" : "white";
};

// Function that get the dominant color of an image
export const getOverlayTextColors = async (uri: string) => {
  const result = await ImageColors.getColors(uri, {
    fallback: Colors.black,
    cache: true,
    key: "unique_key",
  });

  return textColor(
    result.platform === "ios"
      ? result.primary ?? Colors.black
      : result.platform === "android"
      ? result.average ?? Colors.black
      : Colors.black
  );
};

export const getRandomStringInArray = (array: string[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getMarkerAsset = (isSelected: boolean) => {
  return isSelected
    ? require("@images/pin-selected/pin.png")
    : require("@images/pin-normal/pin.png");
};
