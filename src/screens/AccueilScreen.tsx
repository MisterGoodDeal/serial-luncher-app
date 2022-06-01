import * as React from "react";
import { Container } from "../components/Container";
import { Colors } from "../constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@store/actions";
import { TextInput, Button } from "react-native";
import { wp } from "@utils/functions";
import { KeyboardDismiss } from "@components/KeyboardDismiss";
import { selectors } from "@store/selectors";

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
      <Container
        flex={1}
        color={Colors.greengoGreen}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <TextInput
          style={{
            backgroundColor: "black",
            height: 40,
            color: "white",
            width: wp("80%"),
            padding: 10,
          }}
          placeholderTextColor={"white"}
          onChangeText={(text) => setEmail(text)}
          placeholder={"email"}
        />
        <TextInput
          style={{
            backgroundColor: "black",
            height: 40,
            color: "white",
            width: wp("80%"),
            padding: 10,
          }}
          placeholderTextColor={"white"}
          onChangeText={(text) => setPassword(text)}
          placeholder={"password"}
        />
        <Button title="Call API" onPress={() => handleCallApi()} />
      </Container>
    </KeyboardDismiss>
  );
};
