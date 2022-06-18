import * as React from "react";
import { Container } from "../components/common/Container";
import { Colors } from "@themes/Colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "react-native";
import { hp, wp } from "@utils/functions";
import { KeyboardDismiss } from "@components/common/KeyboardDismiss";
import { CustomText } from "@components/ui/Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { Lang } from "@constants/Lang";
import { Spacer } from "@components/common/Spacer";
import { Input } from "@components/ui/Atoms/Input";
import { Button } from "@components/ui/Atoms/Button";
import { useLoginMutation } from "@store/enrollment/slice";
import { setLoading, setToken, setUser } from "@store/application/slice";
import { User } from "@store/model/enrollment";
import { initialState } from "@store/application/constants";
import { applicationState } from "@store/application/selector";
import Toast from "react-native-toast-message";
import { errorHandler } from "@utils/errors/register";
import { Link } from "@components/ui/Molecules/Link";
import { useFormik } from "formik";
import { Routes } from "@navigation/Routes";

interface LoginScreenProps {}
interface LoginForm {
  email: string;
  password: string;
}

export const LoginScreen: React.FunctionComponent<LoginScreenProps> = ({}) => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const { userInfos, token } = useSelector(applicationState);
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
      <StatusBar barStyle="light-content" />
      <Container
        flex={1}
        alignItems={"center"}
        justifyContent={"center"}
        color={Colors.darkgrey}
      >
        <CustomText size={texts.title} fontWeight={"500"} color={Colors.white}>
          {Lang.enrollment.login.title}
        </CustomText>
        <Spacer space="8%" />
        <Input
          value={formik.values.email}
          setValue={formik.handleChange("email")}
          placeholder={Lang.enrollment.login.email}
          type={"emailAddress"}
        />
        <Spacer space="2%" />
        <Input
          value={formik.values.password}
          setValue={formik.handleChange("password")}
          placeholder={Lang.enrollment.login.password}
          type={"password"}
          password
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
          onPress={() => nav.navigate(Routes.FORGOTTEN_PASSWORD)}
          size={hp("2%")}
          fontWeight={"400"}
          color={Colors.white}
        >
          {Lang.enrollment.login.forgotPassword}
        </Link>
      </Container>
    </KeyboardDismiss>
  );
};
