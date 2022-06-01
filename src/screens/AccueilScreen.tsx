import * as React from "react";
import { Container } from "../components/Container";
import { Colors } from "../constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@store/actions";
import { StatusBar, TextInput } from "react-native";
import { hp, wp } from "@utils/functions";
import { KeyboardDismiss } from "@components/KeyboardDismiss";
import { selectors } from "@store/selectors";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Spacer } from "@components/Spacer";

interface AccueilScreenProps {
  userInfo: string;
  navToLogin: () => void;
  updateUser: (user: string) => void;
}

export const AccueilScreen: React.FunctionComponent<AccueilScreenProps> = ({
  userInfo,
}) => {
  const dispatch = useDispatch();
  const { buttons } = useSelector(selectors.application.info);

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

  const handleCallApi = () => {
    dispatch(actions.user.login({ email, password }));
  };

  return (
    <KeyboardDismiss>
      <StatusBar barStyle="light-content" />
      <Container
        flex={1}
        color={Colors.darkgrey}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Input
          placeholder="Email"
          value={email}
          setValue={setEmail}
          type={"emailAddress"}
        />
        <Spacer direction="vertical" space={"1.5%"} />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          setValue={setPassword}
          password
        />
        <Spacer direction="vertical" space={"3%"} />
        <Button width={wp("30%")} color={Colors.main}>
          Login
        </Button>
      </Container>
    </KeyboardDismiss>
  );
};
