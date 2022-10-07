import * as React from "react";
import { StyleSheet, Image, Platform } from "react-native";
import { Colors, dark, light } from "@themes/Colors";
import { Container } from "@components/common/Container";
import { CustomText } from "../Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { hp } from "@utils/functions";
import { Spacer } from "@components/common/Spacer";
import { Lang } from "@constants/Lang";

interface PlaceCommentProps {
  comment: {
    id: number;
    comment: string;
    created_at: string;
    firstname: string;
    lastname: string;
    profile_picture: string;
  };
  isOdd: boolean;
  isDark: boolean;
}

export const PlaceComment: React.FunctionComponent<PlaceCommentProps> = ({
  comment,
  isOdd,
  isDark,
}) => (
  <>
    <Container
      disablePaddingFix
      justifyContent="center"
      style={{
        backgroundColor: isDark ? dark.background : Colors.lightGreyAlt,
        marginVertical: hp("1%"),
        height: hp("7%"),
        borderRadius: 10,
        marginLeft: isOdd ? hp("2.5%") : undefined,
        marginRight: isOdd ? undefined : hp("2.5%"),
      }}
    >
      <Image
        source={{ uri: comment.profile_picture }}
        style={{
          width: hp("5%"),
          height: hp("5%"),
          position: "absolute",
          left: isOdd ? -hp("2.5%") : undefined,
          right: isOdd ? undefined : -hp("2.5%"),
          borderRadius: 10,
        }}
      />
      <Container
        disablePaddingFix
        justifyContent={"space-between"}
        style={{
          height: hp("5%"),
          marginLeft: isOdd ? hp("3%") : hp(".5%"),
          marginRight: isOdd ? hp(".5%") : hp("3%"),
          marginTop: Platform.OS === "ios" ? 0 : -hp("10%"),
        }}
      >
        <CustomText
          size={texts.small}
          fontWeight={"400"}
          color={isDark ? dark.text : light.text}
          style={{
            height: hp("4%"),
          }}
        >
          {comment.comment}
        </CustomText>
        <CustomText
          size={texts.smaller}
          fontWeight={"400"}
          color={isDark ? dark.text : light.text}
          align={"right"}
        >
          {`${Lang.map.added_by} ${comment.firstname} — ${new Date(
            comment.created_at
          ).toLocaleDateString()}`}
        </CustomText>
      </Container>
    </Container>
  </>
);

const styles = StyleSheet.create({});
