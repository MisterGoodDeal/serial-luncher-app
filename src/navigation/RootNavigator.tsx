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
import { AppNavigator } from "./AppNavigator";
import { useColorScheme, Text, Platform, Alert } from "react-native";
import { dark, light } from "@themes/Colors";
import { GroupNavigator } from "./GroupNavigator";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import {
  disconnect,
  setLoading,
  setNotificationToken,
  useAddMobileTokenMutation,
  useDeleteUserMutation,
} from "@store/application/slice";
import Toast from "react-native-toast-message";
import { vibrate } from "@utils/vibrate";
import { Lang } from "@constants/Lang";

import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { FirebaseNotification } from "@store/model/notifications";
import * as RNLocalize from "react-native-localize";

const Stack = createStackNavigator();

export const RootNavigator: React.FC<{}> = () => {
  const isDark = useColorScheme() === "dark";
  const dispatch = useDispatch();
  const [deleteUser, deleteUserResult] = useDeleteUserMutation();
  const { loading, userInfos, hasGroup, notification_token, settings } =
    useSelector(applicationState);
  React.useEffect(() => {
    // Vérification de la permission

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        // console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      popInitialNotification: true,
      requestPermissions: true,
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
    });

    PushNotification.createChannel(
      {
        channelId: "serialluncher", // (required)
        channelName: "Serial Luncher Notifications", // (required)
        channelDescription:
          "Ces notifications vous permettent de recevoir des mise a jour sur les évènements de groupe",
      },
      () => {}
    );

    PushNotification.getScheduledLocalNotifications((rn) => {
      console.log("SN --- ", rn);
    });

    messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
        } else {
          NotiPermission();
        }
      });

    // Récupération du token FCM
    (async () => {
      if (notification_token === "") {
        const token = await messaging().getToken();
        dispatch(setNotificationToken(token));
      }
    })();
  }, []);

  const [addMobileToken, addMobileTokenResponse] = useAddMobileTokenMutation();

  React.useEffect(() => {
    if (userInfos.id !== -1 && notification_token !== "") {
      addMobileToken({
        token: notification_token,
        platform: Platform.OS,
        lang: RNLocalize.getLocales()[0].languageCode,
      });
    }
  }, [userInfos, notification_token]);

  /**
   * Handle notification in foreground
   */
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (settings.notification_enabled) {
        vibrate.warning();
        const fbMessage = remoteMessage as FirebaseNotification;
      }
    });
    return unsubscribe;
  }, []);

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
    if (appleAuth.isSupported) {
      return appleAuth.onCredentialRevoked(async () => {
        console.warn(
          "If this function executes, User Credentials have been Revoked"
        );
        deleteUser({});
      });
    }
  }, []);

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
      {loaded && userInfos.id !== -1 && hasGroup && (
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      )}
      {loaded && userInfos.id !== -1 && !hasGroup && <GroupNavigator />}
    </>
  );
};

async function NotiPermission() {
  messaging()
    .requestPermission()
    .then(() => {
      console.log("Push notif Authorized");
    })
    .catch((error) => {
      console.log("Push notif Authorized");
    });
}
