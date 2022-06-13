import * as React from "react";
import { Container } from "../components/Container";
import { Colors } from "../constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@store/actions";
import { StatusBar } from "react-native";
import { wp } from "@utils/functions";
import { KeyboardDismiss } from "@components/KeyboardDismiss";
import { selectors } from "@store/selectors";
import { CustomText } from "@components/CustomText";
import { texts } from "@constants/TextsSizes";
import { Lang } from "@constants/Lang";
import { Spacer } from "@components/Spacer";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

interface LoginScreenProps {}

export const LoginScreen: React.FunctionComponent<LoginScreenProps> = ({}) => {
  const dispatch = useDispatch();
  const { buttons } = useSelector(selectors.application.info);

  // Login data
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  useFocusEffect(
    React.useCallback(() => {
      return () => null;
    }, [])
  );

  React.useEffect(() => {
    if (buttons?.valid?.action === "connected") {
      dispatch(
        actions.application.setAction({
          function: () => {
            alert("Vous êtes connecté");
            dispatch(actions.application.clean());
          },
          type: "valid",
        })
      );
    }
  }, [buttons]);

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
          value={email}
          setValue={setEmail}
          placeholder={Lang.enrollment.login.email}
          type={"emailAddress"}
        />
        <Spacer space="2%" />
        <Input
          value={password}
          setValue={setPassword}
          placeholder={Lang.enrollment.login.password}
          type={"password"}
          password
        />
        <Spacer space="5%" />
        <Button color={Colors.blue} width={wp("50%")}>
          {Lang.enrollment.login.button}
        </Button>
      </Container>
    </KeyboardDismiss>
  );
};
