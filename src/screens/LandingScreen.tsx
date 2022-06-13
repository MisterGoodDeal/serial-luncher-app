import * as React from "react";
import { Container } from "../components/common/Container";
import { Colors } from "@themes/Colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar, Image, View } from "react-native";
import { hp, wp } from "@utils/functions";
import { KeyboardDismiss } from "@components/common/KeyboardDismiss";
import { Button } from "@components/ui/Atoms/Button";
import { Spacer } from "@components/common/Spacer";
import { CustomText } from "@components/ui/Molecules/CustomText";
import { Lang } from "@constants/Lang";
import { texts } from "@constants/TextsSizes";
import { Overlay } from "@components/ui/Molecules/Overlay";

interface LandingScreenProps {
  userInfo: string;
  navToLogin: () => void;
  updateUser: (user: string) => void;
}

export const LandingScreen: React.FunctionComponent<LandingScreenProps> = ({
  userInfo,
}) => {
  const nav = useNavigation();
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      return () => null;
    }, [])
  );

  return (
    <KeyboardDismiss>
      <StatusBar barStyle="light-content" />
      <Overlay image={require("@images/landing_bg.jpeg")} opacity={0.5} />
      <Container flex={1} alignItems={"center"} justifyContent={"center"}>
        <Image
          source={require("@images/pin/1024.png")}
          style={{
            width: hp("10%"),
            height: hp("10%"),
            borderRadius: 15,
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
        <Button
          width={wp("70%")}
          color={Colors.main}
          shadow
          // @ts-ignore
          onPress={() => nav.navigate("Enrollment")}
        >
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
