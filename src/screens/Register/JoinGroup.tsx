import * as React from "react";
import { Container } from "@components/common/Container";
import { Colors } from "@themes/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import { hp, wp } from "@utils/functions";
import { KeyboardDismiss } from "@components/common/KeyboardDismiss";
import { CustomText } from "@components/ui/Molecules/CustomText";
import { texts } from "@constants/TextsSizes";
import { Lang } from "@constants/Lang";
import { Spacer } from "@components/common/Spacer";
import { Arrow } from "@components/ui/Atoms/Arrow";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { Loader } from "@components/ui/Molecules/Loader";

interface JoinGroupScreenProps {
  nextStep: () => void;
  previousStep: () => void;
}

export const JoinGroupScreen: React.FunctionComponent<JoinGroupScreenProps> = ({
  nextStep,
  previousStep,
}) => {
  const dispatch = useDispatch();

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
        <Loader loading mode="dark" />
        <Arrow onPress={() => previousStep()} />

        <CustomText
          size={texts.title}
          fontWeight={"500"}
          color={Colors.white}
          align={"center"}
        >
          {Lang.enrollment.register.step3.title}
        </CustomText>
        <Spacer space="2%" />
        <CustomText
          size={texts.paragraph}
          fontWeight={"400"}
          color={Colors.white}
        >
          {Lang.enrollment.register.step3.description}
        </CustomText>
        <Spacer space="5%" />
        {/* @ts-ignore */}
        <OTPInputView
          style={{ width: "80%", height: 45 }}
          pinCount={9}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => {
            // TODO: Check w/ the backend if the group exists, then handle next step if so
          }}
          keyboardAppearance="dark"
          keyboardType={"default"}
        />
        <Spacer space="10%" />
        <CustomText
          size={texts.paragraph}
          fontWeight={"400"}
          color={Colors.white}
        >
          {Lang.enrollment.register.step3.no_group}
        </CustomText>
        <Spacer space="1.5%" />
        <CustomText
          size={texts.paragraph}
          fontWeight={"400"}
          color={Colors.white}
          onPress={() => nextStep()}
        >
          {Lang.enrollment.register.step3.create_group}
        </CustomText>
      </Container>
    </KeyboardDismiss>
  );
};

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: Colors.main,
  },
});
