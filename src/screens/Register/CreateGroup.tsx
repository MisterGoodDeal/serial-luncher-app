import * as React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Image, TouchableOpacity } from "react-native";
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
import { CustomText } from "@components/ui/Molecules/CustomText";
import { Popup } from "@components/ui/Molecules/Popup";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Button } from "@components/ui/Atoms/Button";

interface CreateGroupScreenProps {
  nextStep: () => void;
  previousStep: () => void;
}

export const CreateGroupScreen: React.FunctionComponent<
  CreateGroupScreenProps
> = ({ nextStep, previousStep }) => {
  const dispatch = useDispatch();

  // Register infos
  const [groupName, setGroupName] = React.useState("");
  const [groupPicture, setGroupPicture] =
    React.useState<ImagePickerResponse | null>(null);
  const [modalPP, setModalPP] = React.useState(false);

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
      setGroupPicture(result);
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
      setGroupPicture(result);
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
        style={{
          width: wp(100),
        }}
      >
        <Arrow onPress={() => previousStep()} />

        <CustomText size={texts.title} fontWeight={"500"} color={Colors.white}>
          {Lang.enrollment.register.step4.title}
        </CustomText>
        <Spacer space="5%" />
        <TouchableOpacity onPress={() => setModalPP(true)}>
          <Image
            source={
              groupPicture === null
                ? require("@images/default_avatar.webp")
                : { uri: groupPicture.assets![0].uri }
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
          value={groupName}
          setValue={setGroupName}
          placeholder={Lang.enrollment.register.step4.placeholder}
          type={"givenName"}
          height={hp("6%")}
        />
        <Spacer space="5%" />
        <Button
          color={Colors.blue}
          width={wp("50%")}
          onPress={() => nextStep()}
        >
          {Lang.enrollment.register.step4.button}
        </Button>
      </Container>
    </KeyboardDismiss>
  );
};
