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
import { useFormik } from "formik";

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
      nextStep();
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      return () => null;
    }, [])
  );

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
          {Lang.enrollment.register.button}
        </Button>
      </Container>
    </KeyboardDismiss>
  );
};
