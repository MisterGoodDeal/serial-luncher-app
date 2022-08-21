import * as React from "react";
import { tabsSettings } from "./Router";
import { Colors } from "@themes/Colors";
import { StyleSheet, useColorScheme } from "react-native";
import { hp, wp } from "@utils/functions";
import { texts } from "@constants/TextsSizes";
import { useKeyboard } from "@hooks/useKeyboard";
import { Routes } from "./Routes";
import { createStackNavigator } from "@react-navigation/stack";

export const SettingsNavigator: React.FC<{}> = () => {
  const isDark = useColorScheme() === "dark";

  const Stack = createStackNavigator();
  const [keyboardStatus] = useKeyboard();

  return (
    <Stack.Navigator
      initialRouteName={Routes.SETTINGS}
      screenOptions={{
        headerShown: false,
      }}
    >
      {tabsSettings.map(({ component, icon, key, name }) => (
        <Stack.Screen key={key} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};
