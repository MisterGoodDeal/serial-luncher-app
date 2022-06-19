import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Colors, dark, light } from "@themes/Colors";
import { User } from "@store/model/enrollment";
import { Container } from "@components/common/Container";
import { hp, wp } from "@utils/functions";
import { CustomText } from "../Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { Lang } from "@constants/Lang";

interface PlaceItemProps {
  place: {
    name: string;
    country_speciality: string;
    rating: number;
    price_range: number;
    image: string;
    can_bring_reusable_contents: boolean;
    creator: Partial<User>;
    created_at: string;
  };
  isDark: boolean;
  isOdd: boolean;
}

export const PlaceItem: React.FunctionComponent<PlaceItemProps> = ({
  place,
  isDark,
  isOdd,
}) => (
  <Container
    color={isDark ? dark.background : light.background}
    justifyContent={"center"}
    style={{
      marginVertical: hp("1%"),
      marginRight: isOdd ? hp("2%") : hp("5%"),
      marginLeft: isOdd ? hp("5%") : hp("2%"),
      height: hp("10%"),
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
      source={{ uri: place.image }}
      style={[
        {
          width: hp("7%"),
          height: hp("7%"),
          resizeMode: "cover",
          borderRadius: 10,
          position: "absolute",
        },
        isOdd ? styles.left : styles.right,
      ]}
    />
    <Container
      style={{
        height: hp("10%"),
        width: isOdd ? wp("74.5%") : wp("62%"),
        borderRadius: 10,
        marginTop: -hp("3%"),
        paddingLeft: isOdd ? hp("5%") : 0,
        paddingRight: isOdd ? hp("1%") : 0,
        marginLeft: isOdd ? 0 : hp("1%"),
      }}
      justifyContent={"space-between"}
      alignItems={"center"}
      direction={"row"}
    >
      <View>
        <CustomText
          size={texts.tiny}
          color={isDark ? dark.text : light.text}
          fontWeight={"200"}
        >
          {new Date(place.created_at).toLocaleDateString()}
        </CustomText>
        <CustomText
          size={texts.paragraph}
          color={isDark ? dark.text : light.text}
          fontWeight={"600"}
        >
          {place.name}
        </CustomText>
        <CustomText
          size={texts.small}
          color={isDark ? dark.text : light.text}
          fontWeight={"400"}
        >
          {`${Lang.group.added_by} ${place.creator.firstname}`}
        </CustomText>
      </View>
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <CustomText
          size={texts.paragraph}
          color={isDark ? dark.text : light.text}
          fontWeight={"600"}
        >
          {displayEmojis("⭐️", place.rating)}
        </CustomText>
        <CustomText
          size={texts.paragraph}
          color={isDark ? dark.text : light.text}
          fontWeight={"600"}
        >
          {displayEmojis("💶", place.price_range)}
        </CustomText>
        <CustomText
          size={texts.smaller}
          color={isDark ? dark.text : light.text}
          fontWeight={"400"}
        >
          {`${Lang.group.reusable_package} ${
            place.can_bring_reusable_contents ? "✅" : "❌"
          }`}
        </CustomText>
      </View>
    </Container>
  </Container>
);

const styles = StyleSheet.create({
  right: {
    right: -hp("3%"),
  },
  left: {
    left: -hp("3%"),
  },
  rightSecond: {
    right: -hp("0%"),
  },
  leftSecond: {
    left: -hp("0%"),
  },
});

const displayEmojis = (emoji: string, count: number) => {
  let finalChar = "";
  for (let index = 0; index < count; index++) {
    finalChar += emoji;
  }
  return finalChar;
};
