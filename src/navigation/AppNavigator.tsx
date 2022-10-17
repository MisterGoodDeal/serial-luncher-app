import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, useColorScheme, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors, dark, light } from "@themes/Colors";
import { hp, wp } from "@utils/functions";
import { useKeyboard } from "@hooks/useKeyboard";
import { tabsApp } from "./Router";
import { Routes } from "./Routes";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";
import { FirebaseNotification } from "@store/model/notifications";

const Stack = createStackNavigator();

export const AppNavigator: React.FC<{}> = () => {
  const isDark = useColorScheme() === "dark";
  const Tab = createBottomTabNavigator();
  const [keyboardStatus] = useKeyboard();
  const nav = useNavigation();

  /**
   * Handle when notification is opened
   */
  React.useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
      const fbMessage = remoteMessage as FirebaseNotification;
      const extra = JSON.parse(fbMessage.data.extra!);
      if (extra.type === "new_event") {
        // @ts-ignore
        nav.navigate(Routes.GROUP);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
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
    </>
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
