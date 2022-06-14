import * as React from "react";
import { Container } from "@components/common/Container";
import { Colors } from "@themes/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Image } from "react-native";
import { hp, wp } from "@utils/functions";
import { KeyboardDismiss } from "@components/common/KeyboardDismiss";
import { CustomText } from "@components/ui/Molecules/CustomText";
import { texts } from "@constants/TextsSizes";
import { Lang } from "@constants/Lang";
import { Spacer } from "@components/common/Spacer";
import { Arrow } from "@components/ui/Atoms/Arrow";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useGetGroupMutation } from "@store/groups/slice";
import { applicationState } from "@store/application/selector";
import { setLoading } from "@store/application/slice";
import { Group } from "@store/model/groups";
import { Popup } from "@components/ui/Molecules/Popup";
import Toast from "react-native-toast-message";
import { GenericApiReponse } from "@store/model/application";
import { Button } from "@components/ui/Atoms/Button";

interface JoinGroupScreenProps {
  nextStep: () => void;
  previousStep: () => void;
}

export const JoinGroupScreen: React.FunctionComponent<JoinGroupScreenProps> = ({
  nextStep,
  previousStep,
}) => {
  const dispatch = useDispatch();
  const [getGroup, result] = useGetGroupMutation();
  const { token } = useSelector(applicationState);

  const [popup, setPopup] = React.useState(false);
  const [group, setGroup] = React.useState<Group>();

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

  React.useEffect(() => {
    console.log(result);

    result.status === "pending"
      ? dispatch(setLoading(true))
      : dispatch(setLoading(false));
    if (result.status === "fulfilled") {
      const res = result.data as Group;
      setGroup(res);
      setPopup(true);
      console.log(res);
    } else if (result.status === "rejected") {
      // @ts-ignore
      const res = result.error.data as GenericApiReponse;
      console.log("error => ", result.error);
      Toast.show({
        type: "error",
        text1: `${
          res.title === "group_not_found"
            ? Lang.enrollment.register.step3.error.not_found.title
            : Lang.enrollment.register.step3.error.unknown.title
        }`,
        text2: `${
          res.title === "group_not_found"
            ? Lang.enrollment.register.step3.error.not_found.content
            : Lang.enrollment.register.step3.error.unknown.content
        }`,
      });
      setPopup(false);
      setGroup(undefined);
    }
  }, [result]);

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
        <Button color={Colors.blue} width={wp("50%")} onPress={() => null}>
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
        <Arrow onPress={() => previousStep()} />

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
        <CustomText
          size={texts.paragraph}
          fontWeight={"400"}
          color={Colors.white}
          onPress={() => nextStep()}
        >
          {Lang.enrollment.register.step3.create_group}
        </CustomText>
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
