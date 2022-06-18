import * as React from "react";
import { Container } from "@components/common/Container";
import { Colors } from "@themes/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Image } from "react-native";
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
import { setLoading, setToken, setUser } from "@store/application/slice";
import { Group } from "@store/model/groups";
import { Popup } from "@components/ui/Molecules/Popup";
import Toast from "react-native-toast-message";
import { GenericApiReponse } from "@store/model/application";
import { Button } from "@components/ui/Atoms/Button";
import Link from "@components/ui/Molecules/Link";
import { setGroupCode, useRegisterMutation } from "@store/enrollment/slice";
import { enrollmentState } from "@store/enrollment/selector";
import { errorHandler } from "@utils/errors/register";
import { User } from "@store/model/enrollment";
import { setGroup as setGroupStore } from "@store/groups/slice";
interface JoinGroupScreenProps {
  nextStep: () => void;
  previousStep: () => void;
}

export const JoinGroupScreen: React.FunctionComponent<JoinGroupScreenProps> = ({
  nextStep,
  previousStep,
}) => {
  const dispatch = useDispatch();
  const [register, resultRegister] = useRegisterMutation();
  const [getGroup, resultGetGroup] = useGetGroupMutation();
  const [joinGroup, resultJoinGroup] = useJoinGroupMutation();

  const { token } = useSelector(applicationState);
  const { user, groupId } = useSelector(enrollmentState);

  const [popup, setPopup] = React.useState(false);
  const [group, setGroup] = React.useState<Group>();

  const [registeredUser, setRegisteredUser] = React.useState<User>();

  useFocusEffect(
    React.useCallback(() => {
      return () => null;
    }, [])
  );

  const handleFetchGroup = (code: string) => {
    getGroup({
      group_key: code,
      token,
    });
  };

  const handleRegisterWithExistingGroup = () => {
    if (!registeredUser) {
      dispatch(setGroupCode(group!.group_key));
      register({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        profile_picture: user.profile_picture,
        oauth_service: user.oauth_service,
        oauth_service_id: user.oauth_service_id,
      });
    } else {
      joinGroup({
        group_key: groupId,
      });
    }
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
    console.log(resultRegister);
    if (resultRegister.status === "pending") {
      dispatch(setLoading(true));
    } else if (resultRegister.status === "rejected") {
      // @ts-ignore
      const res = resultRegister.error.data as GenericApiReponse;
      console.log("error => ", resultRegister.error);
      Toast.show({
        type: "error",
        text1: `${errorHandler(res?.title ?? "").title}`,
        text2: `${errorHandler(res?.title ?? "").content}`,
      });
      dispatch(setLoading(false));
    } else if (resultRegister.status === "fulfilled") {
      dispatch(setLoading(false));
      console.log(resultRegister);
      const res = resultRegister.data as User;
      setRegisteredUser(res);
      dispatch(setToken(res.token));
      joinGroup({
        group_key: groupId,
      });
    }
  }, [resultRegister]);

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
        text1: `${Lang.enrollment.login.success.hello} ${
          registeredUser!.firstname
        } 👋`,
        text2: Lang.enrollment.login.success.connected,
      });
      const joinedGroup = resultJoinGroup.data as Group;
      dispatch(setLoading(false));
      dispatch(setGroupStore(joinedGroup));
      dispatch(setUser(registeredUser!));
      dispatch(setToken(registeredUser!.token));
    }
  }, [resultJoinGroup]);

  return (
    <KeyboardDismiss>
      <Popup
        visible={popup}
        animation={"slide"}
        margin={{ x: wp("10%"), y: hp("30%") }}
        onClose={() => setPopup(false)}
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
        <CustomText size={texts.title} fontWeight={"500"} color={Colors.white}>
          {group?.name}
        </CustomText>
        <Spacer space="5%" />
        <Button
          color={Colors.blue}
          width={wp("50%")}
          onPress={() => handleRegisterWithExistingGroup()}
        >
          {Lang.enrollment.register.step3.title}
        </Button>
      </Popup>
      <Container
        flex={1}
        alignItems={"center"}
        justifyContent={"center"}
        style={{
          width: wp(100),
        }}
      >
        <Arrow
          onPress={() => {
            setRegisteredUser(undefined);
            previousStep();
          }}
        />

        <CustomText
          size={texts.title}
          fontWeight={"500"}
          color={Colors.white}
          align={"center"}
        >
          {Lang.enrollment.register.step3.title}
        </CustomText>
        <Spacer space="2%" />
        <CustomText
          size={texts.paragraph}
          fontWeight={"400"}
          color={Colors.white}
        >
          {Lang.enrollment.register.step3.description}
        </CustomText>
        <Spacer space="5%" />
        {/* @ts-ignore */}
        <OTPInputView
          style={{ width: "80%", height: 45 }}
          pinCount={6}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => {
            // TODO: Check w/ the backend if the group exists, then handle next step if so
            handleFetchGroup(code);
          }}
          keyboardAppearance="dark"
          keyboardType={"default"}
        />
        <Spacer space="10%" />
        <CustomText
          size={texts.paragraph}
          fontWeight={"400"}
          color={Colors.white}
        >
          {Lang.enrollment.register.step3.no_group}
        </CustomText>
        <Spacer space="1.5%" />
        <Link onPress={() => nextStep()} top={hp("0%")}>
          {Lang.enrollment.register.step3.create_group}
        </Link>
      </Container>
    </KeyboardDismiss>
  );
};

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: Colors.main,
  },
});
