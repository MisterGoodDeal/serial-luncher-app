import * as React from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Image, TouchableOpacity, useColorScheme } from "react-native";
import { hp, wp } from "@utils/functions";
import { texts } from "@constants/TextsSizes";
import { Lang } from "@constants/Lang";
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import Toast from "react-native-toast-message";
import { Container } from "@components/common/Container";
import { KeyboardDismiss } from "@components/common/KeyboardDismiss";
import { Spacer } from "@components/common/Spacer";
import { Arrow } from "@components/ui/Atoms/Arrow";
import { Input } from "@components/ui/Atoms/Input";
import { CustomText } from "@components/ui/Atoms/CustomText";
import { Popup } from "@components/ui/Molecules/Popup";
import { FormikHelpers, useFormik } from "formik";
import {
  setGroup as setGroupStore,
  useRegisterMutation,
} from "@store/enrollment/slice";
import { Group } from "@store/model/groups";
import { enrollmentState } from "@store/enrollment/selector";
import { applicationState } from "@store/application/selector";
import {
  setGroup,
  useCreateGroupMutation,
  useJoinGroupMutation,
} from "@store/groups/slice";
import {
  setHasGroup,
  setLoading,
  setToken,
  setUser,
} from "@store/application/slice";
import { errorHandler } from "@utils/errors/register";
import { User } from "@store/model/enrollment";
import { Colors, dark, light } from "@themes/Colors";
import { Button } from "@components/ui/Atoms/Button";

interface CreateGroupScreenProps {
  nextStep: () => void;
  previousStep: () => void;
}

interface CreateGroupForm {
  groupName: string;
  groupPicture: ImagePickerResponse | null;
}

export const ForceCreateGroupScreen: React.FunctionComponent<
  CreateGroupScreenProps
> = ({ nextStep, previousStep }) => {
  const isDark = useColorScheme() === "dark";

  const dispatch = useDispatch();
  const [register, resultRegister] = useRegisterMutation();
  const [createGroup, resultCreateGroup] = useCreateGroupMutation();

  const { user } = useSelector(enrollmentState);

  const [registeredUser, setRegisteredUser] = React.useState<User>();

  // Register infos
  const [modalPP, setModalPP] = React.useState(false);
  const initialValues: CreateGroupForm = {
    groupName: "",
    groupPicture: null,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values, helpers) => {
      handleRegisterWithNewGroup(values, helpers);
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      return () => null;
    }, [])
  );

  const profilePictureOptions: ImageLibraryOptions = {
    mediaType: "photo",
    quality: 0.5,
    includeBase64: true,
  };

  const handleTakePicture = async () => {
    const result = await launchCamera(profilePictureOptions);
    if (result.didCancel) {
      Toast.show({
        type: "info",
        text1: `📸 ${Lang.enrollment.register.step1.profile_picture.title}`,
        text2: Lang.enrollment.register.step1.profile_picture.cancel,
      });
    } else if (result.errorCode || result.errorMessage) {
      Toast.show({
        type: "error",
        text1: `📸 ${Lang.enrollment.register.step1.profile_picture.title}`,
        text2: Lang.enrollment.register.step1.profile_picture.error,
      });
    } else {
      Toast.show({
        type: "success",
        text1: `📸 ${Lang.enrollment.register.step1.profile_picture.title}`,
        text2: Lang.enrollment.register.step1.profile_picture.success,
      });
      formik.setFieldValue("groupPicture", result);
      setModalPP(false);
    }
  };

  const handleOpenGallery = async () => {
    const result = await launchImageLibrary(profilePictureOptions);
    if (result.didCancel) {
      Toast.show({
        type: "info",
        text1: `📸 ${Lang.enrollment.register.step1.profile_picture.title}`,
        text2: Lang.enrollment.register.step1.profile_picture.cancel,
      });
    } else if (result.errorCode || result.errorMessage) {
      Toast.show({
        type: "error",
        text1: `📸 ${Lang.enrollment.register.step1.profile_picture.title}`,
        text2: Lang.enrollment.register.step1.profile_picture.error,
      });
    } else {
      Toast.show({
        type: "success",
        text1: `📸 ${Lang.enrollment.register.step1.profile_picture.title}`,
        text2: Lang.enrollment.register.step1.profile_picture.success,
      });
      formik.setFieldValue("groupPicture", result);
      setModalPP(false);
    }
  };

  const handleRegisterWithNewGroup = (
    values: CreateGroupForm,
    helpers: FormikHelpers<CreateGroupForm>
  ) => {
    if (values.groupName.length === 0) {
      Toast.show({
        type: "error",
        text1: Lang.enrollment.register.error.oops,
        text2: Lang.enrollment.register.error.missing_fields_group,
      });
    } else {
      createGroup({
        name: values.groupName,
        image: values.groupPicture?.assets![0].base64 ?? "",
      });
    }
  };

  React.useEffect(() => {
    console.log(resultRegister);
    if (resultRegister.status === "pending") {
      dispatch(setLoading(true));
    } else if (resultRegister.status === "rejected") {
      // @ts-ignore
      const res = resultRegister.error.data as GenericApiReponse;
      console.log("error => ", resultRegister.error);
      Toast.show({
        type: "error",
        text1: `${errorHandler(res?.title ?? "").title}`,
        text2: `${errorHandler(res?.title ?? "").content}`,
      });
      dispatch(setLoading(false));
    } else if (resultRegister.status === "fulfilled") {
      dispatch(setLoading(false));
      const res = resultRegister.data as User;
      setRegisteredUser(res);
      dispatch(setToken(res.token));
      createGroup({
        name: formik.values.groupName,
        image: formik.values.groupPicture?.assets![0].base64 ?? "",
      });
    }
  }, [resultRegister]);

  React.useEffect(() => {
    console.log(resultCreateGroup);
    resultCreateGroup.status === "pending"
      ? dispatch(setLoading(true))
      : dispatch(setLoading(false));
    if (resultCreateGroup.status === "fulfilled") {
      const res = resultCreateGroup.data as Group;
      dispatch(setGroup(res));
      dispatch(setHasGroup(true));
      Toast.show({
        type: "success",
        text1: `${Lang.enrollment.login.success.hello} ${user!.firstname} 👋`,
        text2: Lang.group.created,
      });
    } else if (resultCreateGroup.status === "rejected") {
      // @ts-ignore
      const res = resultCreateGroup.error.data as GenericApiReponse;
      console.log("error => ", resultCreateGroup.error);
      Toast.show({
        type: "error",
        text1: `${errorHandler(res?.title ?? "").title}`,
        text2: `${errorHandler(res?.title ?? "").content}`,
      });
    }
  }, [resultCreateGroup]);

  const nav = useNavigation();

  return (
    <KeyboardDismiss>
      <Popup
        visible={modalPP}
        animation={"slide"}
        margin={{ x: wp("10%"), y: hp("30%") }}
        onClose={() => setModalPP(false)}
        color={isDark ? dark.navBar.background : light.navBar.background}
      >
        <CustomText
          size={texts.title}
          fontWeight={"500"}
          color={isDark ? dark.text : light.text}
        >
          {Lang.enrollment.register.step4.popup_title}
        </CustomText>
        <Spacer space="8%" />
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
      <Container
        flex={1}
        alignItems={"center"}
        justifyContent={"center"}
        color={isDark ? dark.background : light.background}
        style={{
          width: wp(100),
        }}
      >
        <Arrow
          onPress={() => nav.goBack()}
          color={isDark ? dark.text : light.text}
        />

        <CustomText
          size={texts.title}
          fontWeight={"500"}
          color={isDark ? dark.text : light.text}
        >
          {Lang.enrollment.register.step4.title}
        </CustomText>
        <Spacer space="5%" />
        <TouchableOpacity onPress={() => setModalPP(true)}>
          <Image
            source={
              formik.values.groupPicture === null
                ? require("@images/avatar.png")
                : { uri: formik.values.groupPicture.assets![0].uri }
            }
            style={{
              width: hp("12.5%"),
              height: hp("12.5%"),
              borderRadius: hp("12.5%") / 2,
            }}
          />
        </TouchableOpacity>
        <Spacer space="5%" />

        <Input
          value={formik.values.groupName}
          setValue={formik.handleChange("groupName")}
          placeholder={Lang.enrollment.register.step4.placeholder}
          type={"givenName"}
          height={hp("6%")}
          isDark={isDark}
        />
        <Spacer space="5%" />
        <Button
          color={Colors.blue}
          width={wp("50%")}
          onPress={formik.handleSubmit}
        >
          {Lang.enrollment.register.step4.button}
        </Button>
      </Container>
    </KeyboardDismiss>
  );
};
