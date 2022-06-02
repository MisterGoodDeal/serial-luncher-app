import * as React from "react";
import { Container } from "../components/Container";
import { Colors } from "../constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@store/actions";
import { StatusBar, Image, View } from "react-native";
import { hp, wp } from "@utils/functions";
import { KeyboardDismiss } from "@components/KeyboardDismiss";
import { selectors } from "@store/selectors";
import { Button } from "@components/Button";
import { Spacer } from "@components/Spacer";
import { CustomText } from "@components/CustomText";
import { Lang } from "@constants/Lang";
import { texts } from "@constants/TextsSizes";
import { Overlay } from "@components/Overlay";

interface LandingScreenProps {
  userInfo: string;
  navToLogin: () => void;
  updateUser: (user: string) => void;
}

export const LandingScreen: React.FunctionComponent<LandingScreenProps> = ({
  userInfo,
}) => {
  const dispatch = useDispatch();
  const { buttons } = useSelector(selectors.application.info);

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
      <Overlay image={require("@images/landing_bg.jpeg")} opacity={0.5} />
      <Container flex={1} alignItems={"center"} justifyContent={"center"}>
        <Image
          source={require("@images/pin-selected/pin.png")}
          style={{
            width: hp("10%"),
            height: hp("10%"),
          }}
        />
        <Spacer direction="vertical" space={"1.5%"} />
        <CustomText
          color={Colors.white}
          fontWeight={"600"}
          size={texts.title}
          align={"center"}
        >
          {Lang.landing.title}
        </CustomText>
        <Spacer direction="vertical" space={"15%"} />
        <CustomText
          color={Colors.white}
          fontWeight={"500"}
          transform={"uppercase"}
          size={texts.small}
          align={"center"}
        >
          {Lang.landing.continue_with}
        </CustomText>
        <Spacer direction="vertical" space={"1%"} />
        <Button width={wp("70%")} color={Colors.main} shadow>
          {Lang.landing.email}
        </Button>
        <Spacer direction="vertical" space={"8%"} />
        <Button width={wp("70%")} color={Colors.black} shadow>
          {Lang.landing.apple}
        </Button>
        <Spacer direction="vertical" space={"1%"} />
        <Button width={wp("70%")} color={Colors.green} shadow>
          {Lang.landing.google}
        </Button>
      </Container>
    </KeyboardDismiss>
  );
};
