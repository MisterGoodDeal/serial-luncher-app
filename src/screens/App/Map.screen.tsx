import * as React from "react";
import { Colors } from "@themes/Colors";
import { Container } from "@components/common/Container";
import { hp, wp } from "@utils/functions";
import { applicationState } from "@store/application/selector";
import { useDispatch, useSelector } from "react-redux";
import MapView from "react-native-maps";

interface MapProps {}

export const Map: React.FunctionComponent<MapProps> = ({}) => {
  const dispatch = useDispatch();
  const { userInfos } = useSelector(applicationState);

  return (
    <Container
      color={Colors.background}
      justifyContent={"center"}
      alignItems={"center"}
      style={{
        width: "100%",
        height: "100%",
        paddingHorizontal: wp("10%"),
      }}
    >
      <MapView
        initialRegion={{
          longitude: 2.347477,
          latitude: 48.85443,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: wp("100%"),
          height: hp("100%"),
        }}
      />
    </Container>
  );
};
