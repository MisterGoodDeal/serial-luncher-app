import * as React from "react";
import { Container } from "../components/common/Container";
import { Colors, dark, light } from "@themes/Colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar, useColorScheme } from "react-native";
import { hp, wp } from "@utils/functions";
import { KeyboardDismiss } from "@components/common/KeyboardDismiss";
import { CustomText } from "@components/ui/Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { Lang } from "@constants/Lang";
import { Spacer } from "@components/common/Spacer";
import { Input } from "@components/ui/Atoms/Input";
import { Button } from "@components/ui/Atoms/Button";
import { useLoginMutation } from "@store/enrollment/slice";
import {
  setHasGroup,
  setLoading,
  setToken,
  setUser,
} from "@store/application/slice";
import { User } from "@store/model/enrollment";
import { initialState } from "@store/application/constants";
import { applicationState } from "@store/application/selector";
import Toast from "react-native-toast-message";
import { errorHandler } from "@utils/errors/register";
import { Link } from "@components/ui/Molecules/Link";
import { useFormik } from "formik";
import { Routes } from "@navigation/Routes";
import { Arrow } from "@components/ui/Atoms/Arrow";
import { Loader } from "@components/ui/Molecules/Loader";

interface LoginScreenProps {}
interface LoginForm {
  email: string;
  password: string;
}

export const LoginScreen: React.FunctionComponent<LoginScreenProps> = ({}) => {
  const isDark = useColorScheme() === "dark";

  const dispatch = useDispatch();
  const nav = useNavigation();
  const { userInfos, token, loading } = useSelector(applicationState);
  const [login, result] = useLoginMutation();
  const initialValues: LoginForm = { email: userInfos.email, password: "" };

  // Login data
  const formik = useFormik({
    initialValues,
    onSubmit: (values, helpers) => {
      login(values);
    },
  });

  React.useEffect(() => {
    result.status === "pending"
      ? dispatch(setLoading(true))
      : dispatch(setLoading(false));
    if (result.status === "fulfilled") {
      const res = result.data as User;
      const userHasGroup = res.hasGroup as boolean;
      dispatch(setHasGroup(userHasGroup));
      Toast.show({
        type: "success",
        text1: `${Lang.enrollment.login.success.hello} ${res.firstname} 👋`,
        text2: Lang.enrollment.login.success.connected,
      });
      dispatch(setUser(res));
      dispatch(setToken(res.token));
    } else if (result.status === "rejected") {
      // @ts-ignore
      const error = errorHandler(result?.error?.data?.title);
      Toast.show({
        type: "error",
        text1: error.title,
        text2: error.content,
      });
      dispatch(setUser(initialState.userInfos));
      dispatch(setToken(initialState.token));
    }
  }, [result]);

  return (
    <KeyboardDismiss>
      <Loader loading={loading} dark={isDark} />
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <Container
        flex={1}
        alignItems={"center"}
        justifyContent={"center"}
        color={isDark ? dark.background : light.background}
      >
        <CustomText
          size={texts.title}
          fontWeight={"500"}
          color={isDark ? dark.text : light.text}
        >
          {Lang.enrollment.login.title}
        </CustomText>
        <Spacer space="8%" />
        <Input
          value={formik.values.email}
          setValue={formik.handleChange("email")}
          placeholder={Lang.enrollment.login.email}
          type={"emailAddress"}
          isDark={isDark}
        />
        <Spacer space="2%" />
        <Input
          value={formik.values.password}
          setValue={formik.handleChange("password")}
          placeholder={Lang.enrollment.login.password}
          type={"password"}
          password
          isDark={isDark}
        />
        <Spacer space="4%" />
        <Button
          color={Colors.blue}
          width={wp("50%")}
          onPress={formik.handleSubmit}
        >
          {Lang.enrollment.login.button}
        </Button>
        <Spacer space="4%" />
        <Link
          /* @ts-ignore */
          onPress={() => nav.navigate(Routes.FORGOTTEN_PASSWORD)}
          size={hp("2%")}
          fontWeight={"400"}
          color={isDark ? dark.text : light.text}
        >
          {Lang.enrollment.login.forgotPassword}
        </Link>
      </Container>
    </KeyboardDismiss>
  );
};
