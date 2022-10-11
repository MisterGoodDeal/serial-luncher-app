import * as React from "react";
import { StyleSheet, Image } from "react-native";
import { Colors, dark, light } from "@themes/Colors";
import { Container } from "@components/common/Container";
import { hp, wp } from "@utils/functions";
import { CustomText } from "../Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { User } from "@store/model/enrollment";

interface EventItemProps {
  isDark: boolean;
  user: Partial<User>;
}

export const EventItem: React.FunctionComponent<EventItemProps> = ({
  isDark,
  user,
}) => (
  <Container
    color={isDark ? dark.background : light.background}
    alignItems={"center"}
    direction={"row"}
    style={{
      marginVertical: hp("1%"),
      height: hp("8%"),
      marginHorizontal: hp("2%"),
      borderRadius: 10,
      paddingHorizontal: wp("5%"),
      shadowColor: isDark ? Colors.black : Colors.grey,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 3,
      paddingBottom: hp("3%"),
    }}
    flex={1}
  >
    <Image
      source={
        user.profile_picture === ""
          ? require("@images/avatar.png")
          : {
              uri: user.profile_picture,
            }
      }
      style={[
        {
          width: hp("6%"),
          height: hp("6%"),
          resizeMode: "cover",
          borderRadius: 50,
          marginLeft: hp("2%"),
        },
      ]}
    />
    <CustomText
      size={texts.paragraph}
      color={isDark ? dark.text : light.text}
      fontWeight={"400"}
      style={{
        marginLeft: hp("2%"),
      }}
    >
      {user.firstname}
    </CustomText>
    <CustomText
      size={texts.paragraph}
      color={isDark ? dark.text : light.text}
      fontWeight={"600"}
      style={{
        marginLeft: hp(".5%"),
      }}
    >
      {user.lastname}
    </CustomText>
  </Container>
);

const styles = StyleSheet.create({});
