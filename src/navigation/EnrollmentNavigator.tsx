import * as React from "react";
import { tabs } from "./Router";
import { Colors } from "@themes/Colors";
import { Platform, StyleSheet, useColorScheme } from "react-native";
import { hp, wp } from "@utils/functions";
import { texts } from "@constants/TextsSizes";
import { useKeyboard } from "@hooks/useKeyboard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Routes } from "./Routes";
import { ifIphoneX, isIphoneX } from "react-native-iphone-x-helper";

export const EnrollmentNavigator: React.FC<{}> = () => {
  const isDark = useColorScheme() === "dark";

  const Tab = createBottomTabNavigator();
  const [keyboardStatus] = useKeyboard();

  return (
    <Tab.Navigator
      initialRouteName={Routes.LOGIN}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarLabelStyle: tabStyle.tabBarLabelStyle,
        tabBarIconStyle: tabStyle.tabBarIconStyle,
        tabBarStyle: tabStyle.tabBarStyle,
      }}
    >
      {tabs.map(({ component, icon, key, name }) => (
        <Tab.Screen
          key={key}
          name={name}
          component={component}
          options={{
            tabBarLabel: ({ focused }) => {
              return icon(focused, keyboardStatus);
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const tabStyle = StyleSheet.create({
  tabBarLabelStyle: {
    fontFamily: Platform.OS === "ios" ? "Gibson" : "Gibson-Regular",
    textTransform: "uppercase",
    fontSize: texts.small,
    color: Colors.white,
    fontWeight: "500",
    position: "absolute",

    top: hp("2.5%"),
  },
  tabBarIconStyle: {
    display: "none",
  },
  tabBarStyle: {
    backgroundColor: Colors.transparent,
    position: "absolute",
    top: isIphoneX() ? hp("15%") : hp("10%"),
    borderWidth: 0,
    borderTopColor: "transparent",
    paddingHorizontal: wp("15%"),
    height: hp("1%"),
    alignItems: "flex-end",
    justifyContent: "space-evenly",
  },
});
