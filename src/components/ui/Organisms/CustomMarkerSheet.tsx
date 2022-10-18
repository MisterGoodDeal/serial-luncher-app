import { hp, textColor, wp } from "@utils/functions";
import * as React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Colors, dark, light } from "@themes/Colors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { CustomText } from "../Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { Lang } from "@constants/Lang";
import { Button } from "../Atoms/Button";
import { LatLng } from "react-native-maps";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface CustomMarkerSheetProps {
  showDrawer: boolean;
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  isDark: boolean;
  setCustomMarker: React.Dispatch<React.SetStateAction<LatLng | undefined>>;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CustomMarkerSheet: React.FunctionComponent<
  CustomMarkerSheetProps
> = ({ showDrawer, setShowDrawer, isDark, setCustomMarker, setShowPopup }) => {
  const MAX_HEIGHT = SCREEN_HEIGHT * 0.18;
  const translateY = useSharedValue(0);
  const showDrawerShared = useSharedValue(showDrawer);

  React.useEffect(() => {
    showDrawer
      ? (translateY.value = withSpring(-MAX_HEIGHT, { damping: 50 }))
      : null;
    showDrawerShared.value === false && setShowDrawer(false);
  }, [showDrawer, showDrawerShared.value]);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: hp("8%"),
          width: wp("90%"),
          position: "absolute",
          top: SCREEN_HEIGHT,
          borderRadius: 15,
          zIndex: 10,
          backgroundColor: isDark ? dark.background : light.background,
          paddingVertical: hp(".5%"),
          justifyContent: "space-evenly",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.25,
          shadowRadius: 5,
          elevation: 5,
        },
        rBottomSheetStyle,
      ]}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          top: hp("0%"),
          right: hp("0%"),
          zIndex: 99,
        }}
        onPress={() => {
          showDrawerShared.value = false;
          setShowDrawer(false);
          translateY.value = withSpring(0, { damping: 50 });
          setCustomMarker(undefined);
        }}
      >
        <Image
          source={require("@images/close.png")}
          style={{
            tintColor: textColor(isDark ? light.text : dark.text),
            width: hp("4%"),
            height: hp("4%"),
          }}
        />
      </TouchableOpacity>
      <CustomText
        size={texts.paragraph}
        fontWeight={"600"}
        color={isDark ? dark.text : light.text}
        align={"center"}
      >
        {Lang.map.add_this_one}
      </CustomText>
      <View
        style={{
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Button
          onPress={() => {
            translateY.value = withSpring(0, { damping: 50 });
            showDrawerShared.value = false;
            setShowDrawer(false);
            setShowPopup(true);
          }}
          height={hp("4%")}
          color={Colors.main}
          logoScale={hp(".05%")}
          width={wp("50%")}
        >
          {Lang.map.yes}
        </Button>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  line: {
    width: "20%",
    height: 4,
    alignSelf: "center",
    borderRadius: 2,
    marginVertical: SCREEN_HEIGHT * 0.02,
  },
});
