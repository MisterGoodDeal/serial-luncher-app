import * as React from "react";
import {
  ScrollView,
  useColorScheme,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Colors, dark, light } from "@themes/Colors";
import { Container } from "@components/common/Container";
import { hp, wp } from "@utils/functions";
import { Spacer } from "@components/common/Spacer";
import { CustomText } from "@components/ui/Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { applicationState } from "@store/application/selector";
import { useDispatch, useSelector } from "react-redux";
import {
  disconnect,
  setLoading,
  setToken,
  setUser,
  useDeleteUserMutation,
  useEditUserMutation,
} from "@store/application/slice";
import { Lang } from "@constants/Lang";
import { Button } from "@components/ui/Atoms/Button";
import {
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import Toast from "react-native-toast-message";
import { Popup } from "@components/ui/Molecules/Popup";
import { vibrate } from "@utils/vibrate";
import { User } from "@store/model/enrollment";
import { Input } from "@components/ui/Atoms/Input";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { useNavigation } from "@react-navigation/native";
import { Arrow } from "@components/ui/Atoms/Arrow";

interface ChangeInfosProps {}

export const ChangeInfos: React.FunctionComponent<ChangeInfosProps> = ({}) => {
  const isDark = useColorScheme() === "dark";

  const dispatch = useDispatch();
  const { userInfos } = useSelector(applicationState);

  const [modalPP, setModalPP] = React.useState(false);
  const [picture, setPicture] = React.useState<
    { base64: string; uri: string } | undefined
  >(undefined);

  const profilePictureOptions: ImageLibraryOptions = {
    mediaType: "photo",
    quality: 0.5,
    includeBase64: true,
  };

  const handleTakePicture = async () => {
    dispatch(setLoading(true));
    const result = await launchCamera(profilePictureOptions);
    if (result.didCancel) {
      vibrate.impactHeavy();
      Toast.show({
        type: "info",
        text1: `📸 ${Lang.map.fromCamera}`,
        text2: Lang.enrollment.register.step1.profile_picture.cancel,
      });
      dispatch(setLoading(false));
    } else if (result.errorCode || result.errorMessage) {
      vibrate.error();
      Toast.show({
        type: "error",
        text1: `📸 ${Lang.map.fromCamera}`,
        text2: Lang.enrollment.register.step1.profile_picture.error,
      });
      dispatch(setLoading(false));
    } else {
      vibrate.soft();
      setModalPP(false);
      Toast.show({
        type: "success",
        text1: `📸 ${Lang.map.fromCamera}`,
        text2: Lang.enrollment.register.step1.profile_picture.success,
      });
      // @ts-ignore
      setPicture(result.assets[0]);
      dispatch(setLoading(false));
      const base64 = result!.assets![0].base64 ?? "no_image";
      editUser({ profile_picture: base64 });
    }
  };

  const handleOpenGallery = async () => {
    dispatch(setLoading(true));
    const result = await launchImageLibrary(profilePictureOptions);
    if (result.didCancel) {
      vibrate.impactHeavy();
      Toast.show({
        type: "info",
        text1: `📸 ${Lang.map.fromGallery}`,
        text2: Lang.enrollment.register.step1.profile_picture.cancel,
      });
      dispatch(setLoading(false));
    } else if (result.errorCode || result.errorMessage) {
      vibrate.error();
      Toast.show({
        type: "error",
        text1: `📸 ${Lang.map.fromGallery}`,
        text2: Lang.enrollment.register.step1.profile_picture.error,
      });
      dispatch(setLoading(false));
    } else {
      vibrate.soft();
      setModalPP(false);
      Toast.show({
        type: "success",
        text1: `📸 ${Lang.map.fromGallery}`,
        text2: Lang.enrollment.register.step1.profile_picture.success,
      });
      dispatch(setLoading(false));
      // @ts-ignore
      setPicture(result.assets[0]);
      const base64 = result!.assets![0].base64 ?? "no_image";
      editUser({ profile_picture: base64 });
    }
  };

  const [editUser, editUserResponse] = useEditUserMutation();

  React.useEffect(() => {
    if (editUserResponse.status === "pending") {
      dispatch(setLoading(true));
    } else if (editUserResponse.status === "fulfilled") {
      const user: User = editUserResponse.data as User;
      dispatch(setUser(user));
      dispatch(setToken(user.token));
      dispatch(setLoading(false));
      Toast.show({
        type: "success",
        text1: Lang.settings.editUser.title,
        text2: Lang.settings.editUser.success,
      });
      vibrate.success();
    } else if (editUserResponse.status === "rejected") {
      dispatch(setLoading(false));
      Toast.show({
        type: "error",
        text1: Lang.settings.editUser.title,
        text2: Lang.settings.editUser.error,
      });
      vibrate.error();
    }
  }, [editUserResponse]);

  const [firstname, setFirstname] = React.useState(userInfos.firstname);
  const [lastname, setLastname] = React.useState(userInfos.lastname);
  const [email, setEmail] = React.useState(userInfos.email);
  const [password, setPassword] = React.useState("");
  const [passwordConfirmation, setPasswordConfirmation] = React.useState("");

  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+/;
  const passwordRegex = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
  );

  const handleChangePassword = () => {
    if (password.length !== 0 && passwordConfirmation.length !== 0) {
      if (password === passwordConfirmation) {
        if (passwordRegex.test(password)) {
          editUser({ password });
        } else {
          Toast.show({
            type: "error",
            text1: Lang.settings.editUser.title,
            text2: Lang.settings.editUser.password_strengh,
          });
          vibrate.error();
        }
      } else {
        Toast.show({
          type: "error",
          text1: Lang.settings.editUser.title,
          text2: Lang.settings.editUser.password_error,
        });
        vibrate.error();
      }
    } else {
      Toast.show({
        type: "error",
        text1: Lang.settings.editUser.password,
        text2: Lang.settings.editUser.password_fill,
      });
    }
  };

  const nav = useNavigation();

  return (
    <Container
      color={isDark ? dark.background : light.background}
      alignItems={"center"}
      style={{
        width: "100%",
        height: "100%",
        paddingHorizontal: wp("10%"),
      }}
    >
      <Arrow
        onPress={() => nav.goBack()}
        color={isDark ? dark.text : light.text}
      />
      <Spacer space={"3%"} />
      <CustomText
        size={texts.subtitle}
        color={isDark ? dark.text : light.text}
        align={"left"}
        fontWeight={"600"}
      >
        {Lang.settings.edit}
      </CustomText>
      <Spacer space={"1%"} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ height: "100%" }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
          }}
        >
          <Spacer space="5%" />
          <TouchableOpacity
            onPress={() => {
              setModalPP(true);
            }}
            style={{
              shadowColor: isDark ? Colors.black : Colors.grey,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 1.5,
              width: hp("15%"),
              height: hp("15%"),
              borderRadius: 20,
            }}
          >
            <Image
              source={
                picture !== undefined
                  ? { uri: picture.uri }
                  : userInfos.profile_picture !== ""
                  ? { uri: userInfos.profile_picture }
                  : require("@images/default_avatar.webp")
              }
              style={{
                width: hp("15%"),
                height: hp("15%"),
                borderRadius: 20,
              }}
            />
          </TouchableOpacity>
          <Popup
            visible={modalPP}
            animation={"slide"}
            margin={{ x: wp("10%"), y: hp("30%") }}
            onClose={() => setModalPP(false)}
            color={isDark ? dark.navBar.background : light.navBar.background}
          >
            <CustomText
              size={texts.subtitle}
              fontWeight={"500"}
              color={isDark ? dark.text : light.text}
              align={"center"}
            >
              {Lang.settings.edit_pp}
            </CustomText>
            <Spacer space="5%" />
            <Button
              color={Colors.lightblue}
              width={wp("60%")}
              onPress={() => handleTakePicture()}
            >
              {Lang.enrollment.register.step1.profile_picture.fromCamera}
            </Button>
            <Spacer space="4%" />
            <Button
              color={Colors.lightblue}
              width={wp("60%")}
              onPress={() => handleOpenGallery()}
            >
              {Lang.enrollment.register.step1.profile_picture.fromGallery}
            </Button>
          </Popup>
          <Spacer space="5%" />
          <Input
            placeholder={""}
            width={wp("80%")}
            value={firstname}
            setValue={setFirstname}
            type={"name"}
            isDark={isDark}
            onBlur={() => {
              if (firstname.length !== 0 && firstname !== userInfos.firstname) {
                editUser({ firstname });
              }
            }}
          />
          <Spacer space="1%" />
          <Input
            placeholder={""}
            width={wp("80%")}
            value={lastname}
            setValue={setLastname}
            type={"name"}
            isDark={isDark}
            onBlur={() => {
              if (lastname.length !== 0 && lastname !== userInfos.lastname) {
                editUser({ lastname });
              }
            }}
          />
          <Spacer space="3%" />
          <Input
            placeholder={""}
            width={wp("80%")}
            value={email}
            setValue={setEmail}
            type={"name"}
            isDark={isDark}
            disabled={userInfos.oauth_service !== null}
            onBlur={() => {
              if (email.length !== 0 && email !== userInfos.email) {
                if (emailRegex.test(email)) {
                  editUser({ email });
                } else {
                  Toast.show({
                    type: "error",
                    text1: Lang.settings.editUser.title,
                    text2: Lang.settings.editUser.invalid_email,
                  });
                  vibrate.error();
                }
              }
            }}
          />
          <Spacer space="1%" />
          <Input
            placeholder={Lang.settings.editUser.password}
            width={wp("80%")}
            value={password}
            setValue={setPassword}
            type={"password"}
            isDark={isDark}
            password
            disabled={userInfos.oauth_service !== null}
            onBlur={() => handleChangePassword()}
          />
          <Spacer space="1%" />
          <Input
            placeholder={Lang.settings.editUser.password_confirm}
            width={wp("80%")}
            value={passwordConfirmation}
            setValue={setPasswordConfirmation}
            password
            type={"password"}
            isDark={isDark}
            disabled={userInfos.oauth_service !== null}
            onBlur={() => handleChangePassword()}
          />
          {userInfos.oauth_service !== null && (
            <>
              <Spacer space=".5%" />
              <CustomText
                size={texts.small}
                color={isDark ? dark.text : light.text}
                align={"center"}
                fontWeight={"500"}
              >
                {`${Lang.settings.editUser.cantEditOAuth} ${
                  userInfos.oauth_service === "ios" ? "Apple" : "Google"
                }`}
              </CustomText>
            </>
          )}
          <Spacer space="10%" />
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};
