import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import linking from "../linking";
import { Loader } from "@components/ui/Molecules/Loader";
import { useDispatch, useSelector } from "react-redux";
import { applicationState } from "@store/application/selector";
import { stack } from "@navigation/Router";
import { Routes } from "./Routes";
import { Arrow } from "@components/ui/Atoms/Arrow";
import { hp } from "@utils/functions";
import { initialState } from "@store/application/constants";
import { AppNavigator } from "./AppNavigator";
import { useColorScheme } from "react-native";
import { dark, light } from "@themes/Colors";
import { GroupNavigator } from "./GroupNavigator";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import {
  disconnect,
  setLoading,
  useDeleteUserMutation,
} from "@store/application/slice";
import Toast from "react-native-toast-message";
import { vibrate } from "@utils/vibrate";
import { Lang } from "@constants/Lang";

const Stack = createStackNavigator();

export const RootNavigator: React.FC<{}> = () => {
  const isDark = useColorScheme() === "dark";
  const dispatch = useDispatch();
  const [deleteUser, deleteUserResult] = useDeleteUserMutation();

  React.useEffect(() => {
    if (deleteUserResult.status === "pending") {
      dispatch(setLoading(true));
    } else if (deleteUserResult.status === "fulfilled") {
      dispatch(setLoading(false));
      dispatch(disconnect());
      Toast.show({
        type: "success",
        text1: Lang.settings.delete.title,
        text2: Lang.settings.delete.success,
      });
      vibrate.success();
    } else if (deleteUserResult.status === "rejected") {
      dispatch(setLoading(false));
      Toast.show({
        type: "error",
        text1: Lang.settings.delete.title,
        text2: Lang.settings.delete.error,
      });
      vibrate.error();
    }
  }, [deleteUserResult]);

  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      setLoaded(true);
    })();
  }, []);

  React.useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        "If this function executes, User Credentials have been Revoked"
      );
      deleteUser({});
    });
  }, []);

  const { loading, userInfos, hasGroup } = useSelector(applicationState);

  return (
    <>
      <Loader loading={loading} dark={isDark} />
      {loaded && userInfos.id === -1 && (
        <NavigationContainer linking={linking}>
          <>
            <Stack.Navigator
              initialRouteName={Routes.LANDING}
              screenOptions={{
                headerTransparent: true,
                headerTitle: ({}) => null,
                animationEnabled: true,
                gestureEnabled: true,
              }}
            >
              {stack.map((s) => (
                <Stack.Screen
                  {...s}
                  options={({ navigation, route }) => ({
                    headerBackTitleVisible: false,
                    headerLeft: ({}) =>
                      route.name === Routes.FORGOTTEN_PASSWORD ? (
                        <Arrow
                          onPress={() => navigation.goBack()}
                          top={hp("2.5%")}
                          color={isDark ? dark.text : light.text}
                        />
                      ) : null,
                  })}
                />
              ))}
            </Stack.Navigator>
          </>
        </NavigationContainer>
      )}
      {loaded && userInfos.id !== -1 && hasGroup && <AppNavigator />}
      {loaded && userInfos.id !== -1 && !hasGroup && <GroupNavigator />}
    </>
  );
};
