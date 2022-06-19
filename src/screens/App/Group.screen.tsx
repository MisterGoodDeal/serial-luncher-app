import * as React from "react";
import {
  StyleSheet,
  useColorScheme,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Colors, dark, light } from "@themes/Colors";
import { Container } from "@components/common/Container";
import { Link } from "@components/ui/Molecules/Link";
import {
  getOverlayTextColors,
  getRandomStringInArray,
  hp,
  wp,
} from "@utils/functions";
import { Spacer } from "@components/common/Spacer";
import { CustomText } from "@components/ui/Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { applicationState } from "@store/application/selector";
import { useDispatch, useSelector } from "react-redux";
import { disconnect, setLoading } from "@store/application/slice";
import { Button } from "@components/ui/Atoms/Button";
import { useGetGroupInfoQuery } from "@store/groups/slice";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Lang } from "@constants/Lang";
import { GroupInfo } from "@store/model/groups";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { PlaceItem } from "@components/ui/Organisms/PlacesItem";

interface GroupProps {}

export const Group: React.FunctionComponent<GroupProps> = ({}) => {
  const isDark = useColorScheme() === "dark";
  const { currentData, isFetching, isError, isSuccess, refetch, error } =
    useGetGroupInfoQuery({});

  const [infos, setInfos] = React.useState<GroupInfo>();
  const dispatch = useDispatch();
  const { userInfos } = useSelector(applicationState);

  React.useEffect(() => {
    if (isFetching) {
      dispatch(setLoading(true));
    } else if (isError || isSuccess) {
      if (isError) {
        Toast.show({
          type: "error",
          text1: Lang.group.error.oops,
          text2: Lang.group.error.error_fetching,
        });
      } else {
        const data = currentData as GroupInfo;
        setInfos(data);
      }
      dispatch(setLoading(false));
    }
  }, [currentData, isFetching, isError, error]);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => null;
    }, [])
  );

  return (
    <Container
      color={isDark ? dark.background : light.background}
      alignItems={"center"}
      style={{
        width: "100%",
        height: "100%",
        paddingHorizontal: wp("10%"),
      }}
    >
      <Container
        style={{
          height: hp("30%"),
          width: "100%",
          marginTop: -hp("4%"),
          paddingBottom: hp("2%"),
        }}
        justifyContent={"flex-end"}
        alignItems={"center"}
        color={Colors.black}
      >
        <Image
          source={{ uri: infos?.group.image }}
          style={{
            width: "100%",
            height: hp("35%"),
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <Container
          style={{
            width: "100%",
            height: hp("35%"),
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0.3,
          }}
          color={Colors.black}
        />
        <CustomText
          size={texts.title}
          color={Colors.white}
          align={"center"}
          fontWeight={"600"}
        >
          {infos?.group.name}
        </CustomText>
        <Spacer space={"1.5%"} />

        <OTPInputView
          style={{ width: "55%", height: 30 }}
          pinCount={6}
          code={infos?.group.group_key}
          codeInputFieldStyle={{
            width: 30,
            height: 30,
            borderWidth: 0,
            borderBottomWidth: 1,
            color: Colors.white,
          }}
          autoFocusOnLoad={false}
          editable={false}
        />
      </Container>
      <ScrollView
        style={{
          width: "100%",
          paddingHorizontal: wp("5%"),
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          zIndex: 2,
          backgroundColor: isDark ? dark.background : light.background,
        }}
      >
        <Spacer space={"2%"} />
        <CustomText
          size={texts.subtitle}
          color={isDark ? dark.text : light.text}
          align={"left"}
          fontWeight={"600"}
        >
          {`${Lang.group.hello}, ${
            userInfos.firstname ?? ""
          } ${getRandomStringInArray(["👋", "🙌", "✌️", "🫡"])}`}
        </CustomText>
        <Spacer space={"2%"} />
        <Container
          color={isDark ? dark.navBar.background : light.navBar.background}
          style={{
            shadowColor: isDark ? Colors.black : Colors.grey,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 3,
            borderRadius: 20,
            paddingBottom: hp("3%"),
          }}
        >
          {infos?.last_places.map((p, index: number) => (
            <PlaceItem
              key={index}
              place={p}
              isDark={isDark}
              isOdd={index % 2 === 0}
            />
          ))}
        </Container>
      </ScrollView>
    </Container>
  );
};
