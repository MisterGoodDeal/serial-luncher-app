import { hp, wp } from "@utils/functions";
import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Image,
  Linking,
} from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { Colors, dark, light } from "@themes/Colors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Place } from "@store/model/places";
import { Container } from "@components/common/Container";
import { CustomText } from "../Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { Spacer } from "@components/common/Spacer";
import { Link } from "../Molecules/Link";
import { Lang } from "@constants/Lang";
import { Rating } from "react-native-ratings";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface BottomSheetProps {
  showDrawer: boolean;
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  place: Place;
  isDark: boolean;
}

export const BottomSheet: React.FunctionComponent<BottomSheetProps> = ({
  showDrawer,
  setShowDrawer,
  place,
  isDark,
}) => {
  const MAX_HEIGHT = SCREEN_HEIGHT * 0.6;
  const THRESHOLD = SCREEN_HEIGHT * 0.59;
  const translateY = useSharedValue(0);
  const showDrawerShared = useSharedValue(showDrawer);
  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart((e) => {
      context.value = { y: translateY.value };
    })
    .onUpdate((e) => {
      translateY.value = e.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -MAX_HEIGHT);
    })
    .onEnd((e) => {
      if (translateY.value > -THRESHOLD) {
        translateY.value = withSpring(0, { damping: 50 });
        showDrawerShared.value = false;
      }
    });

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
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          {
            height: SCREEN_HEIGHT * 0.6,
            width: "100%",
            position: "absolute",
            top: SCREEN_HEIGHT,
            borderRadius: 25,
            zIndex: 10,
            backgroundColor: isDark ? dark.background : light.background,
            paddingHorizontal: wp("5%"),
          },
          rBottomSheetStyle,
        ]}
      >
        <View
          style={[
            styles.line,
            { backgroundColor: isDark ? light.background : dark.background },
          ]}
        />
        <ScrollView
          style={{
            width: "100%",
          }}
        >
          {/** CONTENT OF THE BOTTOM SHEET */}
          <Container
            style={{
              height: hp("20%"),
              width: "100%",
            }}
            justifyContent={"center"}
            alignItems={"center"}
            flex={1}
            disablePaddingFix
          >
            <Image
              source={
                place ? { uri: place.image } : require("@images/default.png")
              }
              style={{
                width: "100%",
                height: hp("20%"),
                borderRadius: 10,
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.3)",
                width: "100%",
                height: hp("20%"),
                borderRadius: 10,
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
            <CustomText
              size={texts.subtitle}
              fontWeight={"600"}
              color={Colors.white}
            >
              {place?.name}
            </CustomText>
          </Container>
          <Spacer space={"2%"} />
          <Container
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <CustomText
              size={texts.paragraph}
              fontWeight={"600"}
              color={isDark ? dark.text : light.text}
            >
              {Lang.map.rating}
            </CustomText>
            <Rating
              type="custom"
              ratingImage={require("@images/star.png")}
              jumpValue={0.5}
              ratingCount={5}
              imageSize={hp("4%")}
              onFinishRating={() => null}
              readonly
              startingValue={place?.rating}
              tintColor={isDark ? dark.background : light.background}
            />
          </Container>
          <Container
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <CustomText
              size={texts.paragraph}
              fontWeight={"600"}
              color={isDark ? dark.text : light.text}
            >
              {Lang.map.price_range}
            </CustomText>
            <Rating
              type="custom"
              ratingImage={require("@images/cash.png")}
              jumpValue={0.5}
              ratingCount={5}
              imageSize={hp("4%")}
              onFinishRating={() => null}
              readonly
              startingValue={place?.rating}
              tintColor={isDark ? dark.background : light.background}
              ratingColor={Colors.green}
            />
          </Container>
          {place?.url !== null && (
            <>
              <Spacer space={"4%"} />
              <Link
                onPress={() => Linking.openURL(place.url!)}
                size={texts.small}
                fontWeight={"400"}
                color={isDark ? dark.text : light.text}
                align={"center"}
                style={{
                  width: "100%",
                }}
              >
                {Lang.map.open_link}
              </Link>
            </>
          )}
        </ScrollView>
      </Animated.View>
    </GestureDetector>
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
