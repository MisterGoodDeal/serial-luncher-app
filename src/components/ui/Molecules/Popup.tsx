import { hp, textColor, wp } from "@utils/functions";
import * as React from "react";
import { Image, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@themes/Colors";
import { Container } from "@components/common/Container";

interface PopupProps {
  animation?: "none" | "slide" | "fade";
  visible: boolean;
  color?: string;
  margin?: {
    x: number;
    y: number;
  };
  children: React.ReactNode;
  onClose: () => void;
}

export const Popup: React.FunctionComponent<PopupProps> = ({
  animation,
  visible,
  color,
  margin,
  children,
  onClose,
}) => (
  <Modal visible={visible} animationType={animation} transparent>
    <Container
      color={color ?? Colors.grey}
      flex={1}
      justifyContent={"center"}
      alignItems={"center"}
      style={{
        marginHorizontal: margin ? margin.x : wp("10%"),
        marginVertical: margin ? margin.y : hp("10%"),
        borderRadius: 20,
        shadowColor: "rgba(0,0,0,.5)",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,

        elevation: 24,
      }}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          top: hp("1.5%"),
          right: hp("1.5%"),
          zIndex: 99,
        }}
        onPress={onClose}
      >
        <Image
          source={require("@images/close.png")}
          style={{
            tintColor: textColor(color ?? Colors.grey),
            width: hp("3%"),
            height: hp("3%"),
          }}
        />
      </TouchableOpacity>
      {children}
    </Container>
  </Modal>
);

const styles = StyleSheet.create({});
