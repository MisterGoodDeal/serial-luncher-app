import * as React from "react";
import { Container } from "@components/common/Container";
import { Colors, dark, light } from "@themes/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Image, TouchableOpacity, useColorScheme } from "react-native";
import { hp, wp } from "@utils/functions";
import { KeyboardDismiss } from "@components/common/KeyboardDismiss";
import { CustomText } from "@components/ui/Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { Lang } from "@constants/Lang";
import { Spacer } from "@components/common/Spacer";
import { Input } from "@components/ui/Atoms/Input";
import { Button } from "@components/ui/Atoms/Button";
import { Popup } from "@components/ui/Molecules/Popup";
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import Toast from "react-native-toast-message";
import { FormikHelpers, useFormik } from "formik";
import { resetRegister, setFirstStep } from "@store/enrollment/slice";
import { setLoading } from "@store/application/slice";
import { Loader } from "@components/ui/Molecules/Loader";
import { applicationState } from "@store/application/selector";

interface InformationsScreenProps {
  nextStep: () => void;
}

interface InformationsForm {
  firstName: string;
  lastName: string;
  profilePicture: ImagePickerResponse | null;
}

export const InformationsScreen: React.FunctionComponent<
  InformationsScreenProps
> = ({ nextStep }) => {
  const isDark = useColorScheme() === "dark";

  const dispatch = useDispatch();
  const { loading } = useSelector(applicationState);
  // Register infos
  const [modalPP, setModalPP] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      return () => null;
    }, [])
  );

  const initialValues: InformationsForm = {
    firstName: "",
    lastName: "",
    profilePicture: null,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values, helpers) => {
      handleNextStep(values, helpers);
    },
  });

  const profilePictureOptions: ImageLibraryOptions = {
    mediaType: "photo",
    quality: 0.5,
    includeBase64: true,
  };

  const handleTakePicture = async () => {
    dispatch(setLoading(true));
    const result = await launchCamera(profilePictureOptions);
    if (result.didCancel) {
      Toast.show({
        type: "info",
        text1: `📸 ${Lang.enrollment.register.step1.profile_picture.title}`,
        text2: Lang.enrollment.register.step1.profile_picture.cancel,
      });
      dispatch(setLoading(false));
    } else if (result.errorCode || result.errorMessage) {
      Toast.show({
        type: "error",
        text1: `📸 ${Lang.enrollment.register.step1.profile_picture.title}`,
        text2: Lang.enrollment.register.step1.profile_picture.error,
      });
      dispatch(setLoading(false));
    } else {
      Toast.show({
        type: "success",
        text1: `📸 ${Lang.enrollment.register.step1.profile_picture.title}`,
        text2: Lang.enrollment.register.step1.profile_picture.success,
      });
      formik.setFieldValue("profilePicture", result);
      dispatch(setLoading(false));
      setModalPP(false);
    }
  };

  const handleOpenGallery = async () => {
    dispatch(setLoading(true));
    const result = await launchImageLibrary(profilePictureOptions);
    if (result.didCancel) {
      Toast.show({
        type: "info",
        text1: `📸 ${Lang.enrollment.register.step1.profile_picture.title}`,
        text2: Lang.enrollment.register.step1.profile_picture.cancel,
      });
      dispatch(setLoading(false));
    } else if (result.errorCode || result.errorMessage) {
      Toast.show({
        type: "error",
        text1: `📸 ${Lang.enrollment.register.step1.profile_picture.title}`,
        text2: Lang.enrollment.register.step1.profile_picture.error,
      });
      dispatch(setLoading(false));
    } else {
      Toast.show({
        type: "success",
        text1: `📸 ${Lang.enrollment.register.step1.profile_picture.title}`,
        text2: Lang.enrollment.register.step1.profile_picture.success,
      });
      formik.setFieldValue("profilePicture", result);
      dispatch(setLoading(false));
      setModalPP(false);
    }
  };

  const handleNextStep = (
    values: InformationsForm,
    formikHelpers: FormikHelpers<InformationsForm>
  ) => {
    dispatch(resetRegister());
    if (values.firstName.length > 0 && values.lastName.length > 0) {
      dispatch(
        setFirstStep({
          firstname: values.firstName,
          lastname: values.lastName,
          picture: values.profilePicture?.assets![0].base64 ?? "",
        })
      );
      nextStep();
    } else {
      Toast.show({
        type: "error",
        text1: `${Lang.enrollment.register.error.oops}`,
        text2: Lang.enrollment.register.error.missing_fields,
      });
    }
  };

  return (
    <KeyboardDismiss>
      <Loader loading={loading} dark={isDark} />
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
          {Lang.enrollment.register.step1.profile_picture.title}
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
        style={{
          width: wp(100),
        }}
      >
        <CustomText
          size={texts.title}
          fontWeight={"500"}
          color={isDark ? dark.text : light.text}
        >
          {Lang.enrollment.register.step1.title}
        </CustomText>
        <Spacer space="5%" />
        <TouchableOpacity onPress={() => setModalPP(true)}>
          <Image
            source={
              formik.values.profilePicture === null
                ? require("@images/avatar.png")
                : { uri: formik.values.profilePicture.assets![0].uri }
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
          value={formik.values.firstName}
          setValue={formik.handleChange("firstName")}
          placeholder={Lang.enrollment.register.step1.firstname}
          type={"givenName"}
          height={hp("6%")}
          isDark={isDark}
        />
        <Spacer space="2%" />
        <Input
          value={formik.values.lastName}
          setValue={formik.handleChange("lastName")}
          placeholder={Lang.enrollment.register.step1.lastname}
          type={"familyName"}
          height={hp("6%")}
          isDark={isDark}
        />
        <Spacer space="5%" />
        <Button
          color={Colors.blue}
          width={wp("50%")}
          onPress={formik.handleSubmit}
        >
          {Lang.enrollment.register.next}
        </Button>
      </Container>
    </KeyboardDismiss>
  );
};
