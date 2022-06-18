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
import { FormikHelpers, useFormik } from "formik";
import Toast from "react-native-toast-message";
import { setSecondStep } from "@store/enrollment/slice";

interface CredentialsScreenProps {
  nextStep: () => void;
  previousStep: () => void;
}

interface CredentialsForm {
  email: string;
  password: string;
  passwordConfirm: string;
}

export const CredentialsScreen: React.FunctionComponent<
  CredentialsScreenProps
> = ({ nextStep, previousStep }) => {
  const dispatch = useDispatch();

  // Register infos
  const initialValues: CredentialsForm = {
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values, formikHelpers) => {
      handleNextStep(values, formikHelpers);
    },
  });

  const emailRegex = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+");
  const passwordRegex = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
  );

  useFocusEffect(
    React.useCallback(() => {
      return () => null;
    }, [])
  );

  const handleNextStep = (
    values: CredentialsForm,
    formikHelpers: FormikHelpers<CredentialsForm>
  ) => {
    if (!values.email || !values.password || !values.passwordConfirm) {
      Toast.show({
        type: "error",
        text1: Lang.enrollment.register.error.oops,
        text2: Lang.enrollment.register.error.missing_fields,
      });
    } else if (!emailRegex.test(values.email)) {
      Toast.show({
        type: "error",
        text1: Lang.enrollment.register.error.oops,
        text2: Lang.enrollment.register.error.invalid_email,
      });
    } else if (values.password !== values.passwordConfirm) {
      Toast.show({
        type: "error",
        text1: Lang.enrollment.register.error.oops,
        text2: Lang.enrollment.register.error.password_mismatch,
      });
    } else if (!passwordRegex.test(values.password)) {
      Toast.show({
        type: "error",
        text1: Lang.enrollment.register.error.oops,
        text2: Lang.enrollment.register.error.invalid_password,
      });
    } else {
      dispatch(
        setSecondStep({
          email: values.email,
          password: values.password,
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
          value={formik.values.email}
          setValue={formik.handleChange("email")}
          placeholder={Lang.enrollment.register.step2.email}
          type={"emailAddress"}
          height={hp("6%")}
        />
        <Spacer space="2%" />
        <Input
          value={formik.values.password}
          setValue={formik.handleChange("password")}
          placeholder={Lang.enrollment.register.step2.password}
          type={"password"}
          height={hp("6%")}
          password
        />
        <Spacer space="2%" />
        <Input
          value={formik.values.passwordConfirm}
          setValue={formik.handleChange("passwordConfirm")}
          placeholder={Lang.enrollment.register.step2.repeatPassword}
          type={"password"}
          height={hp("6%")}
          password
        />
        <Spacer space="5%" />
        <Button
          color={Colors.blue}
          width={wp("50%")}
          onPress={formik.handleSubmit}
        >
          {Lang.enrollment.register.next}
        </Button>
      </Container>
    </KeyboardDismiss>
  );
};
