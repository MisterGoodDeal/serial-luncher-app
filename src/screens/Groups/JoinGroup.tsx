import * as React from "react";
import { Container } from "@components/common/Container";
import { Colors, dark, light } from "@themes/Colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Image, useColorScheme, Alert } from "react-native";
import { hp, wp } from "@utils/functions";
import { KeyboardDismiss } from "@components/common/KeyboardDismiss";
import { CustomText } from "@components/ui/Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { Lang } from "@constants/Lang";
import { Spacer } from "@components/common/Spacer";
import { Arrow } from "@components/ui/Atoms/Arrow";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useGetGroupMutation, useJoinGroupMutation } from "@store/groups/slice";
import { applicationState } from "@store/application/selector";
import {
  setHasGroup,
  setLoading,
  setToken,
  setUser,
} from "@store/application/slice";
import { Group } from "@store/model/groups";
import { Popup } from "@components/ui/Molecules/Popup";
import Toast from "react-native-toast-message";
import { GenericApiReponse } from "@store/model/application";
import { Button } from "@components/ui/Atoms/Button";
import { Link } from "@components/ui/Molecules/Link";
import { setGroupCode, useRegisterMutation } from "@store/enrollment/slice";
import { enrollmentState } from "@store/enrollment/selector";
import { errorHandler } from "@utils/errors/register";
import { User } from "@store/model/enrollment";
import { setGroup as setGroupStore } from "@store/groups/slice";
import { Routes } from "@navigation/Routes";
import { Loader } from "@components/ui/Molecules/Loader";
interface JoinGroupScreenProps {}

export const ForceJoinGroupScreen: React.FunctionComponent<
  JoinGroupScreenProps
> = ({}) => {
  const isDark = useColorScheme() === "dark";
  const nav = useNavigation();

  const dispatch = useDispatch();
  const [getGroup, resultGetGroup] = useGetGroupMutation();
  const [joinGroup, resultJoinGroup] = useJoinGroupMutation();

  const { token, userInfos, loading } = useSelector(applicationState);

  const [popup, setPopup] = React.useState(false);
  const [group, setGroup] = React.useState<Group>();

  const [groupId, setGroupId] = React.useState("");

  const handleFetchGroup = (code: string) => {
    getGroup({
      group_key: code,
    });
  };

  React.useEffect(() => {
    console.log(resultGetGroup);

    resultGetGroup.status === "pending"
      ? dispatch(setLoading(true))
      : dispatch(setLoading(false));
    if (resultGetGroup.status === "fulfilled") {
      const res = resultGetGroup.data as Group;
      setGroup(res);
      setPopup(true);
      console.log(res);
    } else if (resultGetGroup.status === "rejected") {
      // @ts-ignore
      const res = resultGetGroup.error.data as GenericApiReponse;
      console.log("error => ", resultGetGroup.error);
      Toast.show({
        type: "error",
        text1: `${errorHandler(res?.title ?? "").title}`,
        text2: `${errorHandler(res?.title ?? "").content}`,
      });
      setPopup(false);
      setGroup(undefined);
    }
  }, [resultGetGroup]);

  React.useEffect(() => {
    console.log(resultJoinGroup);
    if (resultJoinGroup.status === "pending") {
      dispatch(setLoading(true));
    } else if (resultJoinGroup.status === "rejected") {
      // @ts-ignore
      const res = resultJoinGroup.error.data as GenericApiReponse;
      console.log("error => ", resultJoinGroup.error);
      Toast.show({
        type: "error",
        text1: `${errorHandler(res?.title ?? "").title}`,
        text2: `${errorHandler(res?.title ?? "").content}`,
      });
      dispatch(setLoading(false));
    } else if (resultJoinGroup.status === "fulfilled") {
      Toast.show({
        type: "success",
        text1: `${Lang.enrollment.login.success.hello} ${userInfos?.firstname} 👋`,
        text2: Lang.enrollment.login.success.connected,
      });
      const joinedGroup = resultJoinGroup.data as Group;
      dispatch(setLoading(false));
      dispatch(setGroupStore(joinedGroup));
      dispatch(setHasGroup(true));
    }
  }, [resultJoinGroup]);

  return (
    <KeyboardDismiss>
      <Loader loading={loading} dark={isDark} />
      <Popup
        visible={popup}
        animation={"slide"}
        margin={{ x: wp("10%"), y: hp("25%") }}
        onClose={() => setPopup(false)}
        color={isDark ? dark.navBar.background : light.navBar.background}
      >
        <Image
          source={{ uri: group?.image }}
          style={{
            width: hp("12.5%"),
            height: hp("12.5%"),
            borderRadius: hp("12.5%") / 2,
          }}
        />
        <Spacer space="3%" />
        <CustomText
          size={texts.title}
          fontWeight={"500"}
          color={isDark ? dark.text : light.text}
          align={"center"}
          style={{
            marginHorizontal: wp("2%"),
          }}
        >
          {group?.name}
        </CustomText>
        <Spacer space="5%" />
        <Button
          color={Colors.blue}
          width={wp("50%")}
          onPress={() =>
            joinGroup({
              group_key: groupId,
            })
          }
        >
          {Lang.enrollment.register.step3.title}
        </Button>
      </Popup>
      <Container
        flex={1}
        alignItems={"center"}
        justifyContent={"center"}
        color={isDark ? dark.background : light.background}
        style={{
          width: wp(100),
        }}
      >
        <CustomText
          size={texts.title}
          fontWeight={"500"}
          color={isDark ? dark.text : light.text}
          align={"center"}
        >
          {Lang.enrollment.register.step3.title}
        </CustomText>
        <Spacer space="2%" />
        <CustomText
          size={texts.paragraph}
          fontWeight={"400"}
          color={isDark ? dark.text : light.text}
        >
          {Lang.enrollment.register.step3.description}
        </CustomText>
        <Spacer space="5%" />
        {/* @ts-ignore */}
        <OTPInputView
          style={{ width: "80%", height: 45 }}
          pinCount={6}
          codeInputFieldStyle={{
            width: 30,
            height: 45,
            borderWidth: 0,
            borderBottomWidth: 1,
            color: isDark ? dark.text : light.text,
          }}
          onCodeChanged={(code) => setGroupId(code)}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => {
            handleFetchGroup(code);
          }}
          keyboardAppearance={isDark ? "dark" : "light"}
          keyboardType={"default"}
        />
        <Spacer space="5%" />
        <Button
          color={Colors.main}
          width={wp("50%")}
          onPress={() => {
            handleFetchGroup(groupId);
          }}
        >
          {Lang.enrollment.register.step3.search}
        </Button>
        <Spacer space="10%" />
        <CustomText
          size={texts.paragraph}
          fontWeight={"400"}
          color={isDark ? dark.text : light.text}
        >
          {Lang.enrollment.register.step3.no_group}
        </CustomText>
        <Spacer space="1.5%" />
        <Link
          // @ts-ignore
          onPress={() => nav.navigate(Routes.CREATE_GROUP)}
          size={hp("2%")}
          fontWeight={"400"}
          color={isDark ? dark.text : light.text}
        >
          {Lang.enrollment.register.step3.create_group}
        </Link>
      </Container>
    </KeyboardDismiss>
  );
};

const styles = StyleSheet.create({
  underlineStyleHighLighted: {
    borderColor: Colors.main,
  },
});
