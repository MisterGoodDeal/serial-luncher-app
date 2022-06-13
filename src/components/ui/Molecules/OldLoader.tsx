import { selectors } from "@store/selectors";
import { hp } from "@utils/functions";
import React, { useEffect, useRef } from "react";
import { View } from "react-native";

import Spinner from "react-native-spinkit";
import { useSelector } from "react-redux";
import { Colors } from "@themes/Colors";

export const OldLoader = () => {
  const pending = useSelector(selectors.application.pending);

  if (pending) {
    return (
      <View
        style={{
          position: "absolute",
          top: hp("5%"),
          zIndex: 99,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Spinner
          style={{}}
          isVisible={true}
          size={hp("3%")}
          type={"Circle"}
          color={Colors.black}
        />
      </View>
    );
  } else return null;
};
