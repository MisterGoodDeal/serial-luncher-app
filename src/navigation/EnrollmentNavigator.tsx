import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "@screens/LoginScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RegisterScreen } from "@screens/Register";
import { Colors } from "@constants/Colors";
import { hp, wp } from "@utils/functions";
import { texts } from "@constants/TextsSizes";
import { MenuBadge } from "@components/MenuBadge";
import { Lang } from "@constants/Lang";
import { useKeyboard } from "@hooks/useKeyboard";

const Stack = createStackNavigator();

export const EnrollmentNavigator: React.FC<{}> = () => {
  const Tab = createBottomTabNavigator();
  const [keyboardStatus] = useKeyboard();

  return (
    <Tab.Navigator
      initialRouteName="Login"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: "Gibson",
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
          top: hp("6%"),
          borderTopWidth: 0,
          paddingHorizontal: wp("15%"),
          height: hp("10%"),
          alignItems: "flex-end",
          justifyContent: "space-evenly",
        },
      }}
    >
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <MenuBadge focused={focused} visible={!keyboardStatus}>
              {Lang.enrollment.login.title}
            </MenuBadge>
          ),
        }}
      />
      <Tab.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <MenuBadge focused={focused} visible={!keyboardStatus}>
              {Lang.enrollment.register.title}
            </MenuBadge>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
