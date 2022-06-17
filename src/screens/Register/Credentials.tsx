import * as React from "react";
import { Container } from "@components/common/Container";
import { Colors } from "@themes/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { hp, wp } from "@utils/functions";
import { KeyboardDismiss } from "@components/common/KeyboardDismiss";
import { CustomText } from "@components/ui/Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { Lang } from "@constants/Lang";
import { Spacer } from "@components/common/Spacer";
import { Input } from "@components/ui/Atoms/Input";
import { Button } from "@components/ui/Atoms/Button";
import { Arrow } from "@components/ui/Atoms/Arrow";
import Toast from "react-native-toast-message";
import { setSecondStep } from "@store/enrollment/slice";

interface CredentialsScreenProps {
  nextStep: () => void;
  previousStep: () => void;
}

export const CredentialsScreen: React.FunctionComponent<
  CredentialsScreenProps
> = ({ nextStep, previousStep }) => {
  const dispatch = useDispatch();

  // Register infos
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const emailRegex = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+");
  const passwordRegex = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
  );

  useFocusEffect(
    React.useCallback(() => {
      return () => null;
    }, [])
  );

  const handleNextStep = () => {
    if (!email || !password || !passwordConfirm) {
      Toast.show({
        type: "error",
        text1: Lang.enrollment.register.error.oops,
        text2: Lang.enrollment.register.error.missing_fields,
      });
    } else if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text1: Lang.enrollment.register.error.oops,
        text2: Lang.enrollment.register.error.invalid_email,
      });
    } else if (password !== passwordConfirm) {
      Toast.show({
        type: "error",
        text1: Lang.enrollment.register.error.oops,
        text2: Lang.enrollment.register.error.password_mismatch,
      });
    } else if (!passwordRegex.test(password)) {
      Toast.show({
        type: "error",
        text1: Lang.enrollment.register.error.oops,
        text2: Lang.enrollment.register.error.invalid_password,
      });
    } else {
      dispatch(
        setSecondStep({
          email,
          password,
        })
      );
      nextStep();
    }
  };

  return (
    <KeyboardDismiss>
      <Container
        flex={1}
        alignItems={"center"}
        justifyContent={"center"}
        style={{
          width: wp(100),
        }}
      >
        <Arrow onPress={() => previousStep()} />

        <CustomText size={texts.title} fontWeight={"500"} color={Colors.white}>
          {Lang.enrollment.register.step2.title}
        </CustomText>
        <Spacer space="5%" />
        <Input
          value={email}
          setValue={setEmail}
          placeholder={Lang.enrollment.register.step2.email}
          type={"emailAddress"}
          height={hp("6%")}
        />
        <Spacer space="2%" />
        <Input
          value={password}
          setValue={setPassword}
          placeholder={Lang.enrollment.register.step2.password}
          type={"password"}
          height={hp("6%")}
          password
        />
        <Spacer space="2%" />
        <Input
          value={passwordConfirm}
          setValue={setPasswordConfirm}
          placeholder={Lang.enrollment.register.step2.repeatPassword}
          type={"password"}
          height={hp("6%")}
          password
        />
        <Spacer space="5%" />
        <Button
          color={Colors.blue}
          width={wp("50%")}
          onPress={() => handleNextStep()}
        >
          {Lang.enrollment.register.next}
        </Button>
      </Container>
    </KeyboardDismiss>
  );
};
