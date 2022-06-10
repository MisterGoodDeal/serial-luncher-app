import * as React from "react";
import { Container } from "@components/Container";
import { Colors } from "@constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@store/actions";
import { StatusBar, Image, TouchableOpacity, ScrollView } from "react-native";
import { hp, wp } from "@utils/functions";
import { KeyboardDismiss } from "@components/KeyboardDismiss";
import { selectors } from "@store/selectors";
import { CustomText } from "@components/CustomText";
import { texts } from "@constants/TextsSizes";
import { Lang } from "@constants/Lang";
import { Spacer } from "@components/Spacer";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Popup } from "@components/Popup";
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import Toast from "react-native-toast-message";

interface InformationsScreenProps {
  nextStep: () => void;
}

export const InformationsScreen: React.FunctionComponent<InformationsScreenProps> = ({
  nextStep,
}) => {
  const dispatch = useDispatch();
  const { buttons } = useSelector(selectors.application.info);

  // Register infos
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [
    profilePicture,
    setProfilePicture,
  ] = React.useState<ImagePickerResponse | null>(null);
  const [modalPP, setModalPP] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      return () => null;
    }, [])
  );

  React.useEffect(() => {
    if (buttons?.valid?.action === "connected") {
      dispatch(
        actions.application.setAction({
          function: () => {
            alert("Vous êtes connecté");
            dispatch(actions.application.clean());
          },
          type: "valid",
        })
      );
    }
  }, [buttons]);

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
      setProfilePicture(result);
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
      setProfilePicture(result);
      setModalPP(false);
    }
  };

  return (
    <KeyboardDismiss>
      <Popup
        visible={modalPP}
        animation={"slide"}
        margin={{ x: wp("10%"), y: hp("30%") }}
        onClose={() => setModalPP(false)}
      >
        <CustomText size={texts.title} fontWeight={"500"} color={Colors.white}>
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
        <CustomText size={texts.title} fontWeight={"500"} color={Colors.white}>
          {Lang.enrollment.register.step1.title}
        </CustomText>
        <Spacer space="5%" />
        <TouchableOpacity onPress={() => setModalPP(true)}>
          <Image
            source={
              profilePicture === null
                ? require("@images/default_avatar.webp")
                : { uri: profilePicture.assets![0].uri }
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
          value={firstname}
          setValue={setFirstname}
          placeholder={Lang.enrollment.register.step1.firstname}
          type={"givenName"}
          height={hp("6%")}
        />
        <Spacer space="2%" />
        <Input
          value={lastname}
          setValue={setLastname}
          placeholder={Lang.enrollment.register.step1.lastname}
          type={"familyName"}
          height={hp("6%")}
        />
        <Spacer space="5%" />
        <Button
          color={Colors.blue}
          width={wp("50%")}
          onPress={() => nextStep()}
        >
          {Lang.enrollment.register.next}
        </Button>
      </Container>
    </KeyboardDismiss>
  );
};
