import * as React from "react";
import { Container } from "../components/common/Container";
import { Colors } from "@themes/Colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  StatusBar,
  Image,
  View,
  useColorScheme,
  Alert,
  Platform,
} from "react-native";
import { hp, wp } from "@utils/functions";
import { KeyboardDismiss } from "@components/common/KeyboardDismiss";
import { Button } from "@components/ui/Atoms/Button";
import { Spacer } from "@components/common/Spacer";
import { CustomText } from "@components/ui/Atoms/CustomText";
import { Lang } from "@constants/Lang";
import { texts } from "@constants/TextsSizes";
import { Overlay } from "@components/ui/Molecules/Overlay";
import { Link } from "@components/ui/Molecules/Link";
import {
  appleAuth,
  AppleButton,
} from "@invertase/react-native-apple-authentication";
import Toast from "react-native-toast-message";
import {
  setHasGroup,
  setLoading,
  setToken,
  setUser,
} from "@store/application/slice";
import {
  useLoginOAuthMutation,
  useRegisterMutation,
} from "@store/enrollment/slice";
import { User } from "@store/model/enrollment";
import {
  GoogleSignin,
  statusCodes,
  User as GoogleUser,
} from "@react-native-community/google-signin";
import { WEB_CLIENT_ID } from "@environments/prod.environment";

interface LandingScreenProps {
  userInfo: string;
  navToLogin: () => void;
  updateUser: (user: string) => void;
}

export const LandingScreen: React.FunctionComponent<LandingScreenProps> = ({
  userInfo,
}) => {
  const isDark = useColorScheme() === "dark";

  const nav = useNavigation();
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      return () => null;
    }, [])
  );

  const [appleLogin, appleLoginResponse] = useLoginOAuthMutation();
  const [register, registerResponse] = useRegisterMutation();
  const handleAppleLogin = async () => {
    dispatch(setLoading(true));
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const {
        user: newUser,
        email,
        fullName,
        identityToken,
      } = appleAuthRequestResponse;

      if (identityToken) {
        // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
        email !== null
          ? handleRegisterAppleApi({
              email: email ?? "",
              firstname: fullName!.givenName ?? "John",
              lastname: fullName!.familyName ?? "Doe",
              user: newUser ?? "",
              token: identityToken,
            })
          : handleLoginAppleApi({
              user: newUser ?? "",
              token: identityToken,
            });
      } else {
        Toast.show({
          type: "error",
          text1: Lang.enrollment.oauth.apple.robotError.title,
          text2: Lang.enrollment.oauth.apple.robotError.body,
        });
      }
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(setLoading(false));
      if (error.code === appleAuth.Error.CANCELED) {
        Toast.show({
          type: "error",
          text1: Lang.enrollment.oauth.apple.userCancel.title,
          text2: Lang.enrollment.oauth.apple.userCancel.body,
        });
      } else {
        console.error(error);
      }
    }
  };

  const handleRegisterAppleApi = (infos: {
    email: string;
    firstname: string;
    lastname: string;
    user: string;
    token: string;
  }) => {
    register({
      firstname: infos.firstname,
      lastname: infos.lastname,
      email: infos.email,
      password: infos.user,
      oauth_service: "ios",
      oauth_service_id: infos.user,
    });
  };
  React.useEffect(() => {
    if (registerResponse.status === "pending") {
      dispatch(setLoading(true));
    } else if (registerResponse.status === "fulfilled") {
      dispatch(setLoading(false));
      console.log("registered => ", registerResponse.data);
      const user: User = registerResponse.data as User;
      dispatch(setToken(user.token));
      dispatch(setUser(user));
      dispatch(setHasGroup(false));
      setTryCount(0);
    } else if (registerResponse.status === "rejected") {
      setTryCount(0);
      dispatch(setLoading(false));
      Toast.show({
        type: "error",
        text1: Lang.enrollment.oauth.apple.registerFailed.title,
        text2: Lang.enrollment.oauth.apple.registerFailed.body,
      });
      console.log("error => ", registerResponse);
    }
  }),
    [registerResponse];

  const handleLoginAppleApi = (infos: { user: string; token: string }) => {
    appleLogin({
      oauth_service: "ios",
      oauth_service_id: infos.user,
    });
  };

  React.useEffect(() => {
    if (appleLoginResponse.status === "pending") {
      dispatch(setLoading(true));
    } else if (appleLoginResponse.status === "fulfilled") {
      dispatch(setLoading(false));
      console.log("logged in => ", appleLoginResponse.data);
      const user: User = appleLoginResponse.data as User;
      const userHasGroup = user.hasGroup as boolean;
      dispatch(setHasGroup(userHasGroup));
      dispatch(setToken(user.token));
      dispatch(setUser(user));
    } else if (appleLoginResponse.status === "rejected") {
      dispatch(setLoading(false));
      Toast.show({
        type: "error",
        text1: Lang.enrollment.oauth.apple.loginFailed.title,
        text2: Lang.enrollment.oauth.apple.loginFailed.body,
      });
      console.log("error => ", appleLoginResponse);
    }
  }),
    [appleLoginResponse];

  /**
   * GOOGLE LOGIN
   */
  const [googleLogin, googleLoginResponse] = useLoginOAuthMutation();
  const [googleUserInfo, setGoogleUserInfo] = React.useState(null);
  const [userNeedregister, setUserNeedRegister] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    configureGoogleSign();
  }, []);

  function configureGoogleSign() {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: false,
    });
  }

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const ggui = await GoogleSignin.signIn();
      // @ts-ignore
      setGoogleUserInfo(ggui);
      setError(null);
      setIsLoggedIn(true);
      googleLogin({
        oauth_service: "google",
        oauth_service_id: ggui.user.id,
      });
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // when user cancels sign in process,
        Toast.show({
          type: "error",
          text1: Lang.enrollment.oauth.google.userCancel.title,
          text2: Lang.enrollment.oauth.google.userCancel.body,
        });
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // when play services not available
        Toast.show({
          type: "error",
          text1: Lang.enrollment.oauth.google.playServiceUnavailable.title,
          text2: Lang.enrollment.oauth.google.playServiceUnavailable.body,
        });
      } else {
        // some other error
        Toast.show({
          type: "error",
          text1: Lang.enrollment.oauth.google.unknownError.title,
          text2: Lang.enrollment.oauth.google.unknownError.body,
        });
        setError(error);
      }
    }
  };

  React.useEffect(() => {
    if (googleLoginResponse.status === "pending") {
      dispatch(setLoading(true));
    } else if (googleLoginResponse.status === "fulfilled") {
      dispatch(setLoading(false));
      console.log("data => ", googleLoginResponse.data);
      const user: User = googleLoginResponse.data as User;
      const userHasGroup = user.hasGroup as boolean;
      dispatch(setHasGroup(userHasGroup));
      dispatch(setToken(user.token));
      dispatch(setUser(user));
    } else if (googleLoginResponse.status === "rejected") {
      dispatch(setLoading(false));
      // @ts-ignore
      if (googleLoginResponse.error.status === 404) {
        setUserNeedRegister(true);
      } else {
        Toast.show({
          type: "error",
          text1: Lang.enrollment.oauth.google.loginFailed.title,
          text2: Lang.enrollment.oauth.google.loginFailed.body,
        });
      }
    }
  }),
    [googleLoginResponse];

  const [tryCount, setTryCount] = React.useState(0);

  React.useEffect(() => {
    setTryCount(tryCount + 1);
    if (userNeedregister && tryCount === 1) {
      // Register the user
      // @ts-ignore
      const googleUser: GoogleUser = googleUserInfo;
      console.log("user not found, registering the user");
      register({
        firstname: googleUser.user.givenName!,
        lastname: googleUser.user.familyName!,
        email: googleUser.user.email!,
        password: googleUser.user.id!,
        oauth_service: "google",
        oauth_service_id: googleUser.user.id!,
      });
      setUserNeedRegister(false);
    }
  }, [userNeedregister]);

  return (
    <KeyboardDismiss>
      <StatusBar barStyle={isDark ? "light-content" : "light-content"} />
      <Overlay image={require("@images/landing_bg.jpeg")} opacity={0.5} />
      <Container flex={1} alignItems={"center"} justifyContent={"center"}>
        <Image
          source={require("@images/pin/1024.png")}
          style={{
            width: hp("10%"),
            height: hp("10%"),
            borderRadius: 15,
          }}
        />
        <Spacer direction="vertical" space={"1.5%"} />
        <CustomText
          color={Colors.white}
          fontWeight={"600"}
          size={texts.title}
          align={"center"}
        >
          {Lang.landing.title}
        </CustomText>
        <Spacer direction="vertical" space={"15%"} />
        <CustomText
          color={Colors.white}
          fontWeight={"500"}
          transform={"uppercase"}
          size={texts.small}
          align={"center"}
        >
          {Lang.landing.continue_with}
        </CustomText>
        <Spacer direction="vertical" space={"1%"} />
        <Button
          width={wp("70%")}
          color={Colors.main}
          shadow
          // @ts-ignore
          onPress={() => nav.navigate("Enrollment")}
        >
          {Lang.landing.email}
        </Button>
        <Spacer direction="vertical" space={"8%"} />
        {Platform.OS === "ios" && (
          <>
            <Button
              width={wp("70%")}
              color={Colors.black}
              shadow
              onPress={() => handleAppleLogin()}
              logo={require("@images/apple.png")}
              logoScale={0.4}
            >
              {Lang.landing.apple}
            </Button>
            <Spacer direction="vertical" space={"1%"} />
          </>
        )}
        <Button
          width={wp("70%")}
          color={Colors.green}
          onPress={() => googleSignIn()}
          shadow
          logo={require("@images/google.png")}
          logoScale={0.4}
        >
          {Lang.landing.google}
        </Button>
      </Container>
    </KeyboardDismiss>
  );
};
