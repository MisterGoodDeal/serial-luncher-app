import * as React from "react";
import { StyleSheet } from "react-native";
import { Colors } from "@themes/Colors";
import { Container } from "@components/common/Container";
import Link from "@components/ui/Molecules/Link";
import { hp, wp } from "@utils/functions";
import { Spacer } from "@components/common/Spacer";
import { CustomText } from "@components/ui/Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { applicationState } from "@store/application/selector";
import { useDispatch, useSelector } from "react-redux";
import { disconnect } from "@store/application/slice";

interface MapProps {}

export const Map: React.FunctionComponent<MapProps> = ({}) => {
  const dispatch = useDispatch();
  const { userInfos } = useSelector(applicationState);

  return (
    <Container
      color={Colors.darkgrey}
      justifyContent={"center"}
      alignItems={"center"}
      style={{
        width: "100%",
        height: "100%",
        paddingHorizontal: wp("10%"),
      }}
    >
      <CustomText
        size={texts.small}
        color={Colors.white}
        align={"left"}
        fontWeight={"200"}
      >
        Map
      </CustomText>
      <Spacer space="10" />
      <Link
        color="white"
        size={hp("3%")}
        align={"center"}
        onPress={() => dispatch(disconnect())}
        fontWeight={"400"}
      >
        Disconnect
      </Link>
    </Container>
  );
};
