import * as React from "react";
import { Image, StyleSheet, useColorScheme, View } from "react-native";
import { LandingScreen } from "@screens/LandingScreen";
import { EnrollmentNavigator } from "@navigation/EnrollmentNavigator";
import { LoginScreen } from "@screens/LoginScreen";
import { MenuBadge } from "@components/ui/Organisms/MenuBadge";
import { Lang } from "@constants/Lang";
import { RegisterScreen } from "@screens/Register";
import ForgottenPassword from "@screens/ForgottenPassword/ForgottenPassword";
import { Group } from "@screens/App/Group.screen";
import { Map } from "@screens/App/Map.screen";
import { Settings } from "@screens/App/Settings.screen";
import { Routes } from "./Routes";
import { hp } from "@utils/functions";
import { Colors, dark, light } from "@themes/Colors";
import { CustomText } from "@components/ui/Atoms/CustomText";
import { Spacer } from "@components/common/Spacer";
import { ForceJoinGroupScreen } from "@screens/Groups/JoinGroup";
import { ForceCreateGroupScreen } from "@screens/Groups/CreateGroup";

type StackScreen = {
  key: number;
  name: string;
  component: React.FC<any>;
  header?: boolean;
}[];

type TabsScreen = {
  key: number;
  name: string;
  component: React.FC<any>;
  icon: (focused: boolean, keyboardStatus: boolean) => JSX.Element;
}[];

type AppTabs = {
  key: number;
  name: string;
  component: React.FC<any>;
  icon: (
    focused: boolean,
    keyboardStatus: boolean,
    isDark: boolean
  ) => JSX.Element;
  label: (focused: boolean) => React.ReactNode;
}[];

export const stack: StackScreen = [
  {
    key: 0,
    name: "Landing",
    component: LandingScreen,
    header: false,
  },
  {
    key: 1,
    name: "Enrollment",
    component: EnrollmentNavigator,
  },
  {
    key: 2,
    name: "ForgottenPassword",
    component: ForgottenPassword,
    header: true,
  },
];

export const tabs: TabsScreen = [
  {
    key: 0,
    name: "Login",
    component: LoginScreen,
    icon: (focused: boolean, keyboardStatus: boolean) => (
      <MenuBadge focused={focused} visible={!keyboardStatus}>
        {Lang.enrollment.login.title}
      </MenuBadge>
    ),
  },
  {
    key: 1,
    name: "Register",
    component: RegisterScreen,
    icon: (focused: boolean, keyboardStatus: boolean) => (
      <MenuBadge focused={focused} visible={!keyboardStatus}>
        {Lang.enrollment.register.title}
      </MenuBadge>
    ),
  },
];

export const tabsGroup: TabsScreen = [
  {
    key: 0,
    name: Routes.JOIN_GROUP,
    component: ForceJoinGroupScreen,
    icon: (focused: boolean, keyboardStatus: boolean) => <></>,
  },
  {
    key: 1,
    name: Routes.CREATE_GROUP,
    component: ForceCreateGroupScreen,
    icon: (focused: boolean, keyboardStatus: boolean) => <></>,
  },
];

export const tabsApp: AppTabs = [
  {
    key: 0,
    name: Routes.GROUP,
    component: Group,
    icon: (focused: boolean, keyboardStatus: boolean, isDark: boolean) => (
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/group.png")}
          style={[
            styles.icon,
            {
              tintColor: focused
                ? isDark
                  ? dark.navBar.icons.active
                  : light.navBar.icons.active
                : isDark
                ? dark.navBar.icons.inactive
                : light.navBar.icons.inactive,
            },
          ]}
        />
      </View>
    ),
    label: (focused: boolean) => (
      <>
        <CustomText
          color={Colors.white}
          fontWeight={focused ? "600" : "400"}
          size={hp("1.5%")}
        >
          {Lang.navigation.group}
        </CustomText>
        {focused && <View style={styles.bottomIndicator} />}
      </>
    ),
  },
  {
    key: 1,
    name: Routes.MAP,
    component: Map,
    icon: (focused: boolean, keyboardStatus: boolean, isDark: boolean) => (
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/map.png")}
          style={[
            styles.icon,
            {
              tintColor: focused
                ? isDark
                  ? dark.navBar.icons.active
                  : light.navBar.icons.active
                : isDark
                ? dark.navBar.icons.inactive
                : light.navBar.icons.inactive,
            },
          ]}
        />
      </View>
    ),
    label: (focused: boolean) => (
      <>
        <CustomText
          color={Colors.white}
          fontWeight={focused ? "600" : "400"}
          size={hp("1.5%")}
        >
          {Lang.navigation.map}
        </CustomText>
        {focused && <View style={styles.bottomIndicator} />}
      </>
    ),
  },
  {
    key: 2,
    name: Routes.SETTINGS,
    component: Settings,
    icon: (focused: boolean, keyboardStatus: boolean, isDark: boolean) => (
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/settings.png")}
          style={[
            styles.icon,
            {
              tintColor: focused
                ? isDark
                  ? dark.navBar.icons.active
                  : light.navBar.icons.active
                : isDark
                ? dark.navBar.icons.inactive
                : light.navBar.icons.inactive,
            },
          ]}
        />
      </View>
    ),
    label: (focused: boolean) => (
      <>
        <CustomText
          color={Colors.white}
          fontWeight={focused ? "600" : "400"}
          size={hp("1.5%")}
        >
          {Lang.navigation.settings}
        </CustomText>
        {focused && <View style={styles.bottomIndicator} />}
      </>
    ),
  },
];

const styles = StyleSheet.create({
  imageContainer: {
    marginTop: hp("3.5%"),
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    alignSelf: "center",
    width: hp("4.5%"),
    height: hp("4.5%"),
    resizeMode: "contain",
    tintColor: Colors.white,
  },
  bottomIndicator: {
    height: 5,
    width: "100%",
    position: "absolute",
    bottom: -hp("2%"),
  },
});
