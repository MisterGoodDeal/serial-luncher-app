import * as React from "react";
import { Container } from "@components/Container";
import { Colors } from "@constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@store/actions";
import { StatusBar, Image, TouchableOpacity, ScrollView } from "react-native";
import { hp, wp } from "@utils/functions";
import { KeyboardDismiss } from "@components/KeyboardDismiss";
import { selectors } from "@store/selectors";
import { CustomText } from "@components/CustomText";
import { texts } from "@constants/TextsSizes";
import { Lang } from "@constants/Lang";
import { Spacer } from "@components/Spacer";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Arrow } from "@components/Arrow";

interface CredentialsScreenProps {
  nextStep: () => void;
  previousStep: () => void;
}

export const CredentialsScreen: React.FunctionComponent<CredentialsScreenProps> = ({
  nextStep,
  previousStep,
}) => {
  const dispatch = useDispatch();
  const { buttons } = useSelector(selectors.application.info);

  // Register infos
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

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
          onPress={() => nextStep()}
        >
          {Lang.enrollment.register.button}
        </Button>
      </Container>
    </KeyboardDismiss>
  );
};
