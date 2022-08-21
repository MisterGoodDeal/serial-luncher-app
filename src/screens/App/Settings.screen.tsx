import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Colors, dark, light } from "@themes/Colors";
import { Container } from "@components/common/Container";
import { Link } from "@components/ui/Molecules/Link";
import { hp, wp } from "@utils/functions";
import { Spacer } from "@components/common/Spacer";
import { CustomText } from "@components/ui/Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { applicationState } from "@store/application/selector";
import { useDispatch, useSelector } from "react-redux";
import { disconnect } from "@store/application/slice";
import styled from "styled-components/native";

interface SettingsProps {}

export const Settings: React.FunctionComponent<SettingsProps> = ({}) => {
  const isDark = useColorScheme() === "dark";
  const dispatch = useDispatch();
  const { userInfos } = useSelector(applicationState);
  const settingsLinks = ["Paramètres", "Groupes", "Contactez-nous"];
  const getProfilePicture = () => {
    if (userInfos.profile_picture.length > 0) {
      return { uri: userInfos.profile_picture };
    }
    return require("@images/avatar.png");
  };

  const getUserName = () => {
    return `@${userInfos.firstname}${userInfos.lastname}`.toLocaleLowerCase();
  };

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
          <UserText>{userInfos.firstname}</UserText>
          <UserText>{userInfos.lastname}</UserText>
        </UserInfos>
        <UserNameView>
          <UserName>{getUserName()}</UserName>
          <TouchableOpacity activeOpacity={0.7}>
            <UserName>Modifier</UserName>
          </TouchableOpacity>
        </UserNameView>
      </Header>
      <Separator />
      <Content>
        {settingsLinks.map((links, i) => (
          <TouchableOpacity key={i}>
            <Links>{links}</Links>
          </TouchableOpacity>
        ))}
        <TouchableOpacity>
          <SubLinks>A Propos de nous</SubLinks>
        </TouchableOpacity>
        <TouchableOpacity>
          <SubLinks>Politique de confidentialité</SubLinks>
        </TouchableOpacity>
        <TouchableOpacity>
          <SubLinks>Déconnexion</SubLinks>
        </TouchableOpacity>
      </Content>
    </Container>
  );
};

const Header = styled.View`
  margin-vertical: ${hp("4%")};
  margin-horizontal: ${hp("3%")};
`;

const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  resize-mode: contain;
  border-radius: 150px;
`;

const UserInfos = styled.View`
  display: flex;
  flex-direction: row;
`;

const UserText = styled.Text`
  color: ${Colors.white};
  font-size: 28px;
  margin-horizontal: 2px;
  margin-vertical: 10px;
  font-family: "Gibson";
  font-weight: 600;
`;

const UserName = styled.Text`
  color: ${Colors.lightGrey};
  font-size: 14px;
  font-family: "Gibson";
  font-weight: 400;
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

const Links = styled.Text`
  color: ${Colors.white};
  font-size: 18px;
  font-weight: 500;
  font-family: "Gibson";
  margin-vertical: ${hp("2%")}px;
`;

const SubLinks = styled.Text`
  color: ${Colors.grey};
  font-size: 18px;
  font-weight: 500;
  font-family: "Gibson";
  margin-vertical: ${hp("2%")}px;
`;
