import { getDomainName, hp, textColor, wp } from "@utils/functions";
import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Image,
  Linking,
  Platform,
  TouchableOpacity,
} from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { Colors, dark, light } from "@themes/Colors";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Place, StuffedPlace } from "@store/model/places";
import { Container } from "@components/common/Container";
import { CustomText } from "../Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { Spacer } from "@components/common/Spacer";
import { Link } from "../Molecules/Link";
import { Lang } from "@constants/Lang";
import { Rating } from "react-native-ratings";
import { PlaceComment } from "./PlaceComment";
import { Input } from "../Atoms/Input";
import { Button } from "../Atoms/Button";
import { Popup } from "../Molecules/Popup";
import DatePicker from "react-native-date-picker";
import * as RNLocalize from "react-native-localize";
import { useCreateEventMutation } from "@store/places/slice";
import { setLoading } from "@store/application/slice";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface BottomSheetProps {
  showDrawer: boolean;
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  place: StuffedPlace;
  isDark: boolean;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  submitComment: () => void;
}

export const BottomSheet: React.FunctionComponent<BottomSheetProps> = ({
  showDrawer,
  setShowDrawer,
  place,
  isDark,
  comment,
  setComment,
  submitComment,
}) => {
  const MAX_HEIGHT = SCREEN_HEIGHT * 0.8;
  const THRESHOLD = SCREEN_HEIGHT * 0.79;
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
    console.log(place);
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

  const scheme = Platform.select({
    ios: "maps:0,0?q=",
    android: "geo:0,0?q=",
  });
  const latLng = `${place?.lat},${place?.lng}`;
  const label = `${place?.name} (${
    Lang.country_specialities.countries.find(
      (country) => country.code === Number(place?.fk_country_speciality ?? "-1")
    )?.name
  })`;
  const openMap = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  /**
   * Create event
   */

  const dispatch = useDispatch();
  const [showAddEvent, setShowAddEvent] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [createEvent, createEventResult] = useCreateEventMutation();

  React.useEffect(() => {
    if (createEventResult.status === "pending") {
      dispatch(setLoading(true));
    } else if (createEventResult.status === "fulfilled") {
      dispatch(setLoading(false));
      Toast.show({
        type: "success",
        text1: Lang.event.success.title,
        text2: Lang.event.success.content,
      });
      setDate(new Date());
      setShowAddEvent(false);
    } else if (createEventResult.status === "rejected") {
      dispatch(setLoading(false));
      Toast.show({
        type: "error",
        text1: Lang.event.error.title,
        text2: Lang.event.error.content,
      });
    }
  }, [createEventResult]);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          {
            height: SCREEN_HEIGHT * 0.8,
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
        {Platform.OS === "android" && (
          <TouchableOpacity
            style={{
              position: "absolute",
              top: hp("0%"),
              right: hp("1.5%"),
              zIndex: 99,
            }}
            onPress={() => {
              showDrawerShared.value = false;
              setShowDrawer(false);
              translateY.value = withSpring(0, { damping: 50 });
            }}
          >
            <Image
              source={require("@images/close.png")}
              style={{
                tintColor: textColor(isDark ? light.text : dark.text),
                width: hp("5%"),
                height: hp("5%"),
              }}
            />
          </TouchableOpacity>
        )}
        <View
          style={[
            styles.line,
            {
              backgroundColor:
                Platform.OS === "android"
                  ? "transparent"
                  : isDark
                  ? light.background
                  : dark.background,
            },
          ]}
        />
        <ScrollView
          style={{
            width: "100%",
          }}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
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
            <CustomText
              size={texts.paragraph}
              fontWeight={"200"}
              color={Colors.white}
            >
              {
                Lang.country_specialities.countries.find(
                  (country) =>
                    country.code ===
                    Number(place?.fk_country_speciality ?? "-1")
                )?.name
              }
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
              ratingBackgroundColor={
                isDark ? dark.input.background : light.input.background
              }
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
              startingValue={place?.price_range}
              tintColor={isDark ? dark.background : light.background}
              ratingBackgroundColor={
                isDark ? dark.input.background : light.input.background
              }
              ratingColor={Colors.green}
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
              {Lang.map.reusable_package}
            </CustomText>
            <CustomText
              size={texts.paragraph}
              fontWeight={"600"}
              color={isDark ? dark.text : light.text}
            >
              {place?.can_bring_reusable_contents ? "✅" : "❌"}
            </CustomText>
          </Container>
          <Spacer space={"2%"} />

          <Button onPress={() => Linking.openURL(openMap!)} color={Colors.main}>
            {Lang.map.go}
          </Button>
          <Spacer space={"2%"} />
          <Button
            onPress={() => setShowAddEvent(true)}
            color={Colors.main}
            logo={require("@images/calendar.png")}
            logoScale={hp(".05%")}
          >
            {Lang.event.button_creation}
          </Button>
          <Popup
            animation="slide"
            visible={showAddEvent}
            onClose={() => {
              setDate(new Date());
              setShowAddEvent(false);
            }}
            color={isDark ? dark.input.background : light.background}
            margin={{ x: wp("10%"), y: hp("23%") }}
          >
            <Container>
              <CustomText
                size={texts.subtitle}
                fontWeight={"600"}
                color={isDark ? dark.text : light.text}
                align={"center"}
              >
                {`${Lang.event.create_event} \n« ${place?.name} »`}
              </CustomText>
              <Spacer space={"2%"} />
              <DatePicker
                date={date}
                onDateChange={setDate}
                minimumDate={new Date()}
                locale={RNLocalize.getLocales()[0].languageCode}
                theme={isDark ? "dark" : "light"}
              />
              <Spacer space={"2%"} />
              <Button
                color={Colors.main}
                width={wp("70%")}
                onPress={() =>
                  createEvent({
                    date,
                    place: place?.id ?? -1,
                    group: place.fk_lunch_group ?? -1,
                  })
                }
              >
                {Lang.event.create}
              </Button>
              <Spacer space={"2%"} />
            </Container>
          </Popup>
          <Spacer space={"2%"} />

          {place?.url !== "" && (
            <>
              <Link
                onPress={() => Linking.openURL(place?.url!)}
                size={texts.small}
                fontWeight={"400"}
                color={isDark ? dark.text : light.text}
                align={"center"}
                style={{
                  width: "100%",
                }}
              >
                {`${Lang.map.open_link} ${getDomainName(place?.url!)}`}
              </Link>
            </>
          )}
          <Spacer space={"2%"} />
          <Container
            color={isDark ? dark.navBar.background : light.navBar.background}
            disablePaddingFix
            style={{
              shadowColor: isDark ? Colors.black : Colors.grey,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 1.5,
              borderRadius: 15,
            }}
          >
            <Spacer space={"2%"} />
            <CustomText
              size={texts.paragraph}
              fontWeight={"600"}
              color={isDark ? dark.text : light.text}
              align={"center"}
            >
              {Lang.map.comments}
            </CustomText>
            <Spacer space={"2%"} />
            {place?.comments.length !== 0 && (
              <ScrollView
                style={{
                  height: hp("25%"),
                  marginHorizontal: wp("5%"),
                }}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
              >
                {place?.comments.map((comment, index) => (
                  <PlaceComment
                    key={index}
                    comment={comment}
                    isOdd={index % 2 === 0}
                    isDark={isDark}
                  />
                ))}
              </ScrollView>
            )}
            {place?.comments.length === 0 && (
              <CustomText
                size={texts.small}
                fontWeight={"400"}
                color={isDark ? dark.text : light.text}
                align={"center"}
              >
                {Lang.map.no_comment}
              </CustomText>
            )}
            <Spacer space={"2%"} />
            <Container
              style={{
                marginHorizontal: wp("2%"),
              }}
              disablePaddingFix
            >
              <View
                style={{
                  position: "relative",
                  right: 0,
                  top: 0,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    marginRight: hp("1%"),
                  }}
                >
                  <Input
                    placeholder={Lang.map.your_comment}
                    value={comment}
                    setValue={setComment}
                    type={"none"}
                    color={isDark ? dark.background : light.input.background}
                    isDark={isDark}
                    // width={wp("50%")}
                    width={wp("70%")}
                    height={hp("5%")}
                    maxLength={160}
                  />
                </View>
                <Button
                  color={Colors.lightblue}
                  width={wp("14%")}
                  height={hp("5%")}
                  onPress={submitComment}
                >
                  📤
                </Button>
              </View>
            </Container>
            <Spacer space={"2%"} />
          </Container>
          <Spacer space={"2%"} />
          <Button onPress={() => Linking.openURL(openMap!)} color={Colors.main}>
            {Lang.map.go}
          </Button>
          <Spacer space={"15%"} />
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
