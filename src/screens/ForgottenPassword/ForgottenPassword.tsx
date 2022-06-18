import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppDispatch } from "@store/hooks";
import { useFormik } from "formik";
import { useForgottenPasswordMutation } from "@store/enrollment/slice";
import Toast from "react-native-toast-message";
import { setLoading, setToken, setUser } from "@store/application/slice";
import { User } from "@store/model/enrollment";
import { Lang } from "@constants/Lang";
import { initialState } from "@store/application/constants";
import { KeyboardDismiss } from "@components/common/KeyboardDismiss";
import { Container } from "@components/common/Container";
import { CustomText } from "@components/ui/Atoms/CustomText";
import { Colors } from "@themes/Colors";
import { texts } from "@constants/TextsSizes";
import { Input } from "@components/ui/Atoms/Input";
import { Spacer } from "@components/common/Spacer";
import { Button } from "@components/ui/Atoms/Button";
import { wp } from "@utils/functions";

const ForgottenPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const [forgotPassword, server] = useForgottenPasswordMutation();
  // forgotPassword data
  const initialValues: { email: string } = { email: "" };
  const formik = useFormik({
    initialValues,
    onSubmit: (values, helpers) => {
      forgotPassword(values);
    },
  });

  React.useEffect(() => {
    server.status === "pending"
      ? dispatch(setLoading(true))
      : dispatch(setLoading(false));
    if (server.status === "fulfilled") {
      const res = server.data as User;
      Toast.show({
        type: "success",
        text1: `${Lang.enrollment.login.success.hello} ${res.firstname} 👋`,
        text2: Lang.enrollment.login.success.connected,
      });
    } else if (server.status === "rejected") {
      // @ts-ignore
      const error = errorHandler(server?.error?.data?.title);
      Toast.show({
        type: "error",
        text1: error.title,
        text2: error.content,
      });
      dispatch(setUser(initialState.userInfos));
      dispatch(setToken(initialState.token));
    }
  }, [server]);

  return (
    <KeyboardDismiss>
      <StatusBar barStyle="light-content" />
      <Container
        flex={1}
        alignItems={"center"}
        justifyContent={"center"}
        color={Colors.darkgrey}
      >
        <CustomText size={texts.title} fontWeight={"500"} color={Colors.white}>
          {Lang.enrollment.login.forgotPassword}
        </CustomText>
        <Spacer space="8%" />
        <Input
          value={formik.values.email}
          setValue={formik.handleChange("email")}
          placeholder={Lang.enrollment.login.email}
          type={"emailAddress"}
        />
        <Spacer space="2%" />
        <Button color={Colors.blue} onPress={formik.handleSubmit}>
          {Lang.enrollment.login.send}
        </Button>
      </Container>
    </KeyboardDismiss>
  );
};

export default ForgottenPassword;

const styles = StyleSheet.create({});
