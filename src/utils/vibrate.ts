import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const options = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: false,
};

export const vibrate = {
  error: () => ReactNativeHapticFeedback.trigger("notificationError", options),
  success: () =>
    ReactNativeHapticFeedback.trigger("notificationSuccess", options),
  warning: () =>
    ReactNativeHapticFeedback.trigger("notificationWarning", options),
  soft: () => ReactNativeHapticFeedback.trigger("soft", options),
  rigid: () => ReactNativeHapticFeedback.trigger("rigid", options),
  impactHeavy: () => ReactNativeHapticFeedback.trigger("impactHeavy", options),
  impactMedium: () =>
    ReactNativeHapticFeedback.trigger("impactMedium", options),
  impactLight: () => ReactNativeHapticFeedback.trigger("impactLight", options),
};
