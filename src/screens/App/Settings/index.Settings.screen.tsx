import * as React from "react";
import { Alert, useColorScheme } from "react-native";
import { Colors, dark, light } from "@themes/Colors";
import { Container } from "@components/common/Container";
import { hp, wp } from "@utils/functions";
import { applicationState } from "@store/application/selector";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { CustomText } from "@components/ui/Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { Lang } from "@constants/Lang";
import { Spacer } from "@components/common/Spacer";
import { MenuLink } from "@components/ui/Organisms/MenuLink";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "@navigation/Routes";
import {
  disconnect,
  setLoading,
  useDeleteUserMutation,
} from "@store/application/slice";
import appleAuth from "@invertase/react-native-apple-authentication";
import Toast from "react-native-toast-message";
import { vibrate } from "@utils/vibrate";

interface SettingsProps {}

export const Settings: React.FunctionComponent<SettingsProps> = ({}) => {
  const isDark = useColorScheme() === "dark";
  const nav = useNavigation();
  const dispatch = useDispatch();
  const { userInfos } = useSelector(applicationState);
  const getProfilePicture = () => {
    if (userInfos.profile_picture.length > 0) {
      return { uri: userInfos.profile_picture };
    }
    return require("@images/avatar.png");
  };

  const getUserName = () => {
    return `@${userInfos.firstname}${userInfos.lastname}`.toLocaleLowerCase();
  };

  const [deleteUser, deleteUserResult] = useDeleteUserMutation();

  return (
    <Container
      color={isDark ? dark.background : light.background}
      style={{
        width: "100%",
        height: "100%",
        paddingHorizontal: wp("10%"),
      }}
    >
      <Header>
        <Avatar
          source={getProfilePicture()}
          width={hp("4%")}
          height={hp("4%")}
          resizeMode="contain"
        />
        <UserInfos>
          <CustomText
            size={texts.subtitle}
            fontWeight="600"
            color={isDark ? dark.text : light.text}
          >
            {`${userInfos.firstname} ${userInfos.lastname}`}
          </CustomText>
        </UserInfos>
        <UserNameView>
          <CustomText
            size={texts.small}
            fontWeight="400"
            color={isDark ? dark.text : light.text}
          >
            {getUserName()}
          </CustomText>
        </UserNameView>
      </Header>
      <Separator />
      <Content>
        <MenuLink
          isDark={isDark}
          onPress={() =>
            // @ts-ignore
            nav.navigate(`${Routes.SETTINGS_NAVIGATOR}`, {
              screen: Routes.SETTINGS_CHANGE_INFOS,
            })
          }
        >
          {Lang.settings.edit}
        </MenuLink>
        <MenuLink isDark={isDark} onPress={() => null}>
          {Lang.settings.manage_group}
        </MenuLink>
        <MenuLink isDark={isDark} onPress={() => null}>
          {Lang.settings.contact_us}
        </MenuLink>
        <MenuLink isDark={isDark} onPress={() => null}>
          {Lang.settings.privacy_policy}
        </MenuLink>
        <Spacer space="3%" />
        <MenuLink
          isDark={isDark}
          onPress={() => dispatch(disconnect())}
          color={Colors.grey}
        >
          {Lang.settings.disconnect}
        </MenuLink>
        <MenuLink
          isDark={isDark}
          onPress={() =>
            Alert.alert(
              Lang.settings.delete.title,
              Lang.settings.delete.content,
              [
                {
                  text: Lang.group.delete.cancel,
                },
                {
                  text: Lang.group.delete.confirm,
                  onPress: () => {
                    deleteUser({});
                    dispatch(setLoading(false));
                    appleAuth.Operation.LOGOUT;
                    dispatch(disconnect());
                    Toast.show({
                      type: "success",
                      text1: Lang.settings.delete.title,
                      text2: Lang.settings.delete.success,
                    });
                    vibrate.success();
                  },
                  style: "destructive",
                },
              ]
            )
          }
          color={Colors.red}
        >
          {Lang.settings.delete.button}
        </MenuLink>
      </Content>
    </Container>
  );
};

const Header = styled.View`
  margin-vertical: ${hp("4%")};
  margin-horizontal: ${hp("3%")};
`;

const Avatar = styled.Image`
  width: ${hp("8%")};
  height: ${hp("8%")};
  resize-mode: cover;
  border-radius: ${hp("4%")};
  margin-bottom: ${hp("1%")};
`;

const UserInfos = styled.View`
  display: flex;
  flex-direction: row;
`;

const UserNameView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Separator = styled.View`
  background-color: ${Colors.grey};
  width: ${wp("100%")};
  height: ${hp("0.2%")};
`;

const Content = styled.View`
  margin-vertical: ${hp("4%")};
  margin-horizontal: ${hp("3%")};
`;
