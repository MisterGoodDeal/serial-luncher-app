import React, { useEffect, useRef, useCallback, useState } from "react";
import {
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  View,
  Button,
  Text,
} from "react-native";
import { Colors } from "@themes/Colors";
import { hp, wp } from "@utils/functions";
import { Container } from "../../common/Container";
import Layout from "@constants/Layout";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@store/actions";
import { selectors } from "@store/selectors";
import { images } from "@constants/Images";

const GenericModal = () => {
  const info = useSelector(selectors.application.info);
  const dispatch = useDispatch();
  const hide = useCallback(() => {
    dispatch(actions.application.clean());
  }, []);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [info.visible, opacity]);

  useEffect(() => {
    if (info.visible) {
      dispatch(actions.application.setPending(false));
    }
  }, [info.visible]);

  const onCloseModal = () => {
    dispatch(actions.application.clean());
  };

  if (info.visible) {
    return (
      <Container style={styles.centeredView}>
        <Animated.View
          style={{
            position: "relative",
            top: -hp("1.5%"),
            width: Layout.window.width + 200,
            height: Layout.window.height,
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            opacity,
          }}
        ></Animated.View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={info.visible}
          onRequestClose={
            info.buttons?.cancel?.action
              ? () => info.buttons?.cancel?.action
              : () => onCloseModal()
          }
        >
          <Container style={styles.centeredView}>
            <Container style={styles.modalView}>
              {info.buttons?.cancel !== null && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.closeImageContainer}
                  onPress={
                    info.buttons?.cancel &&
                    info.buttons.cancel.action &&
                    typeof info.buttons.cancel.action === "function"
                      ? info.buttons.cancel.action()
                      : () => dispatch(actions.application.clean())
                  }
                >
                  <Image
                    style={styles.closeImage}
                    source={require("@images/close.png")}
                  />
                </TouchableOpacity>
              )}
              {info.type && (
                <Image
                  style={styles.mainImage}
                  source={images.icon[info.type]}
                />
              )}
              <Text>{info.title}</Text>
              <Container
                style={{
                  marginHorizontal: hp("1.5%"),
                }}
              >
                <Text>{info.content}</Text>
              </Container>
              {info.buttons && (
                <Container direction={"row"} justifyContent={"space-between"}>
                  {info.buttons.valid?.text && (
                    <Button
                      title={info.buttons.valid.text}
                      onPress={
                        info.buttons?.valid?.action
                          ? info.buttons?.valid?.action
                          : () => dispatch(actions.application.clean())
                      }
                    ></Button>
                  )}
                  {info.buttons.cancel?.text && info.buttons.valid?.text && (
                    <View style={{ marginHorizontal: hp("1.5%") }} />
                  )}
                  {info.buttons.cancel?.text && (
                    <Button
                      title={info.buttons.cancel?.text}
                      onPress={
                        info.buttons?.cancel?.action
                          ? () => info.buttons?.cancel?.action
                          : () => dispatch(actions.application.clean())
                      }
                    ></Button>
                  )}
                </Container>
              )}
            </Container>
          </Container>
        </Modal>
      </Container>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: Layout.window.width,
    height: Layout.window.height,
    backgroundColor: Colors.transparent,
    zIndex: 99,
  },
  modalView: {
    width: Layout.window.width / 1.2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  mainImage: {
    height: hp("7%"),
    marginTop: hp("2%"),
    marginBottom: hp("2%"),
    resizeMode: "contain",
  },
  closeImageContainer: {
    position: "absolute",
    top: hp("1%"),
    right: hp("1%"),
    height: hp("3.5%"),
    width: hp("3.5%"),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
  closeImage: {
    height: hp("3%"),
    width: hp("3%"),
  },
});

export default GenericModal;
