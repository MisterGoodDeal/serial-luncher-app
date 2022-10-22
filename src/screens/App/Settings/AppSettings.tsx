import * as React from "react";
import {
  ScrollView,
  useColorScheme,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import { Colors, dark, light } from "@themes/Colors";
import { Container } from "@components/common/Container";
import { hp, wp } from "@utils/functions";
import { Spacer } from "@components/common/Spacer";
import { CustomText } from "@components/ui/Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { applicationState } from "@store/application/selector";
import { useDispatch, useSelector } from "react-redux";
import { Lang } from "@constants/Lang";
import { useNavigation } from "@react-navigation/native";
import { Arrow } from "@components/ui/Atoms/Arrow";
import ToggleSwitch from "toggle-switch-react-native";
import { setNotificationEnabled, setUnits } from "@store/application/slice";

interface AppSettingsProps {}

export const AppSettings: React.FunctionComponent<AppSettingsProps> = ({}) => {
  const isDark = useColorScheme() === "dark";

  const dispatch = useDispatch();
  const { userInfos, settings } = useSelector(applicationState);

  const nav = useNavigation();

  return (
    <Container
      color={isDark ? dark.background : light.background}
      alignItems={"center"}
      style={{
        width: "100%",
        height: "100%",
        paddingHorizontal: wp("10%"),
      }}
    >
      <Arrow
        onPress={() => nav.goBack()}
        color={isDark ? dark.text : light.text}
      />
      <Spacer space={"3%"} />
      <CustomText
        size={texts.subtitle}
        color={isDark ? dark.text : light.text}
        align={"left"}
        fontWeight={"600"}
      >
        {Lang.settings.app_settings.title}
      </CustomText>
      <Spacer space={"1%"} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ height: "100%" }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
          }}
        >
          <Spacer space="5%" />
          <CustomText
            size={texts.subtitle}
            color={isDark ? dark.text : light.text}
            align={"left"}
            fontWeight={"600"}
            style={{
              width: wp("80%"),
            }}
          >
            {Lang.settings.app_settings.privacy_settings}
          </CustomText>
          <Spacer space=".5%" />
          <CustomText
            size={texts.small}
            color={isDark ? dark.text : light.text}
            align={"left"}
            fontWeight={"400"}
            style={{
              width: wp("80%"),
            }}
          >
            {Lang.settings.app_settings.privacy_settings_description}
          </CustomText>
          <Spacer space="2%" />
          <Container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            disablePaddingFix
            style={{
              width: wp("80%"),
            }}
          >
            <CustomText
              size={texts.paragraph}
              color={isDark ? dark.text : light.text}
              align={"left"}
              fontWeight={"400"}
            >
              {Lang.settings.app_settings.push_notifications}
            </CustomText>
            <ToggleSwitch
              isOn={settings.notification_enabled}
              onColor={Colors.main}
              offColor={isDark ? dark.input.background : light.input.background}
              size="large"
              onToggle={(isOn) => dispatch(setNotificationEnabled(isOn))}
            />
          </Container>
          <Spacer space="5%" />
          <CustomText
            size={texts.subtitle}
            color={isDark ? dark.text : light.text}
            align={"left"}
            fontWeight={"600"}
            style={{
              width: wp("80%"),
            }}
          >
            {Lang.settings.app_settings.unit_settings}
          </CustomText>
          <Spacer space="2%" />
          <Container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            disablePaddingFix
            style={{
              width: wp("80%"),
            }}
          >
            <CustomText
              size={texts.paragraph}
              color={isDark ? dark.text : light.text}
              align={"left"}
              fontWeight={"400"}
            >
              {settings.units === "metric"
                ? Lang.settings.app_settings.unit_metric
                : Lang.settings.app_settings.unit_imperial}
            </CustomText>
            <ToggleSwitch
              isOn={settings.units === "metric"}
              onColor={Colors.main}
              offColor={isDark ? dark.input.background : light.input.background}
              size="large"
              onToggle={(isOn) =>
                dispatch(setUnits(isOn ? "metric" : "imperial"))
              }
            />
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};
