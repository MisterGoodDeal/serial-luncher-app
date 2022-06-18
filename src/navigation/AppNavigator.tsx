import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RegisterScreen } from "@screens/Register";
import { Colors } from "@themes/Colors";
import { hp, wp } from "@utils/functions";
import { texts } from "@constants/TextsSizes";
import { MenuBadge } from "@components/ui/Organisms/MenuBadge";
import { Lang } from "@constants/Lang";
import { useKeyboard } from "@hooks/useKeyboard";
import { tabsApp } from "./Router";
import { Routes } from "./Routes";
import { CustomText } from "@components/ui/Atoms/CustomText";

const Stack = createStackNavigator();

export const AppNavigator: React.FC<{}> = () => {
  const Tab = createBottomTabNavigator();
  const [keyboardStatus] = useKeyboard();

  return (
    <>
      {/* @ts-ignore */}
      <Tab.Navigator
        initialRouteName={Routes.MAP}
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarLabelStyle: tabStyle.tabBarLabelStyle,
          tabBarIconStyle: tabStyle.tabBarIconStyle,
          tabBarStyle: tabStyle.tabBarStyle,
          tabBarShowLabel: false,
        }}
      >
        {tabsApp.map((tab) => (
          <Tab.Screen
            key={tab.key}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarIcon: ({ focused }) => {
                return tab.icon(focused, keyboardStatus);
              },
              tabBarHideOnKeyboard: true,
              tabBarLabel: ({ focused }) => {
                return tab.label(focused);
              },
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

const tabStyle = StyleSheet.create({
  tabBarLabelStyle: {
    fontFamily: "Gibson",
    fontSize: hp("1.5%"),
    color: Colors.white,
  },
  tabBarIconStyle: {},
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    left: hp("2.5%"),
    alignSelf: "center",
    width: wp("90%"),
    height: hp("7%"),
    border: "none",
    borderRadius: 15,
    marginBottom: hp("2%"),
    backgroundColor: Colors.darkgrey,
    shadowColor: "#757575",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3,
  },
});
