import { Lang } from "@constants/Lang";
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

// Function that exports domain name from url
export const getDomainName = (url: string | undefined) => {
  if (url) {
    const domain = url.split("/")[2];
    return domain.split(":")[0];
  }
  return "";
};

// Convert meters to kilometers round two decimals if needed
export const convertMetersToKilometersIfNecessary = (value: number) => {
  if (value < 1000) {
    return `${value}m`;
  }
  return `${(value / 1000).toFixed(2)}km`;
};

// Convert meters to miles round two decimals
export const convertMetersToMiles = (value: number) => {
  return `${(value / 1609.344).toFixed(2)}mi`;
};

// Convert minutes to hours if needed
export const convertMinutesToHoursIfNecessary = (value: number) => {
  if (value < 60) {
    return `${value} minute${value > 1 ? "s" : ""}`;
  }
  return `${Math.floor(value / 60)} ${Lang.map.route_planning.hour}${
    Math.floor(value / 60) > 1 ? "s" : ""
  } ${value % 60} minute${value % 60 > 1 ? "s" : ""}`;
};
