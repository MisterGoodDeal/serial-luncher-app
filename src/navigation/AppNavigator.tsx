import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RegisterScreen } from "@screens/Register";
import { Colors } from "@themes/Colors";
import { hp, wp } from "@utils/functions";
import { texts } from "@constants/TextsSizes";
import { MenuBadge } from "@components/ui/Organisms/MenuBadge";
import { Lang } from "@constants/Lang";
import { useKeyboard } from "@hooks/useKeyboard";
import { Group } from "@screens/App/Group.screen";
import { Map } from "@screens/App/Map.screen";
import { Settings } from "@screens/App/Settings.screen";

const Stack = createStackNavigator();

export const AppNavigator: React.FC<{}> = () => {
  const Tab = createBottomTabNavigator();
  const [keyboardStatus] = useKeyboard();

  return (
    <>
      {/* @ts-ignore */}
      <Tab.Navigator
        initialRouteName="Login"
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarLabelStyle: {},
          tabBarIconStyle: {},
          tabBarStyle: {},
        }}
      >
        <Tab.Screen name="Group" component={Group} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </>
  );
};
