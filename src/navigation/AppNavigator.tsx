import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, useColorScheme, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors, dark, light } from "@themes/Colors";
import { hp, wp } from "@utils/functions";
import { useKeyboard } from "@hooks/useKeyboard";
import { tabsApp } from "./Router";
import { Routes } from "./Routes";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export const AppNavigator: React.FC<{}> = () => {
  const isDark = useColorScheme() === "dark";
  const Tab = createBottomTabNavigator();
  const [keyboardStatus] = useKeyboard();

  return (
    <NavigationContainer>
      {/* @ts-ignore */}
      <Tab.Navigator
        initialRouteName={Routes.MAP}
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarStyle: [
            tabStyle.tabBarStyle,
            {
              backgroundColor: isDark
                ? dark.navBar.background
                : light.navBar.background,
            },
          ],
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
                return tab.icon(focused, keyboardStatus, isDark);
              },
              tabBarHideOnKeyboard: true,
              tabBarLabel: ({ focused }) => {
                return tab.label(focused);
              },
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const tabStyle = StyleSheet.create({
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
