import * as React from "react";
import { Modal, ScrollView, StyleSheet, View } from "react-native";
import { Colors, dark, light } from "@themes/Colors";
import { Arrow } from "../Atoms/Arrow";
import Markdown from "react-native-markdown-display";
import { hp, wp } from "@utils/functions";
import { Platform } from "react-native";
import { Spacer } from "@components/common/Spacer";
import { Lang } from "@constants/Lang";

interface PrivacyPolicyProps {
  visible: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  isDark: boolean;
}

export const PrivacyPolicy: React.FunctionComponent<PrivacyPolicyProps> = ({
  visible,
  setVisibility,
  isDark,
}) => {
  const styles = StyleSheet.create({
    // The main container
    body: {},

    // Headings
    heading1: {
      flexDirection: "row",
      fontFamily: Platform.OS === "ios" ? "Gibson" : "Gibson-Regular",
      fontSize: 32,
    },
    heading2: {
      flexDirection: "row",
      fontFamily: Platform.OS === "ios" ? "Gibson" : "Gibson-Regular",
      fontSize: 24,
    },
    heading3: {
      flexDirection: "row",
      fontFamily: Platform.OS === "ios" ? "Gibson" : "Gibson-Regular",
      fontSize: 18,
    },
    heading4: {
      flexDirection: "row",
      fontFamily: Platform.OS === "ios" ? "Gibson" : "Gibson-Regular",
      fontSize: 16,
    },
    heading5: {
      flexDirection: "row",
      fontFamily: Platform.OS === "ios" ? "Gibson" : "Gibson-Regular",
      fontSize: 13,
    },
    heading6: {
      flexDirection: "row",
      fontFamily: Platform.OS === "ios" ? "Gibson" : "Gibson-Regular",
      fontSize: 11,
    },

    // Horizontal Rule
    hr: {
      backgroundColor: "#000000",
      height: 1,
    },

    // Emphasis
    strong: {
      fontWeight: "bold",
    },
    em: {
      fontStyle: "italic",
    },
    s: {
      textDecorationLine: "line-through",
    },

    // Blockquotes
    blockquote: {
      backgroundColor: "#F5F5F5",
      borderColor: "#CCC",
      borderLeftWidth: 4,
      marginLeft: 5,
      paddingHorizontal: 5,
    },

    // Lists
    bullet_list: {
      color: isDark ? dark.text : light.text,
      fontFamily: Platform.OS === "ios" ? "Gibson" : "Gibson-Regular",
    },
    ordered_list: {
      color: isDark ? dark.text : light.text,
      fontFamily: Platform.OS === "ios" ? "Gibson" : "Gibson-Regular",
    },
    list_item: {
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    // @pseudo class, does not have a unique render rule
    bullet_list_icon: {
      marginLeft: 10,
      marginRight: 10,
    },
    // @pseudo class, does not have a unique render rule
    bullet_list_content: {
      flex: 1,
    },
    // @pseudo class, does not have a unique render rule
    ordered_list_icon: {
      marginLeft: 10,
      marginRight: 10,
    },
    // @pseudo class, does not have a unique render rule
    ordered_list_content: {
      flex: 1,
    },

    // Code
    code_inline: {
      borderWidth: 1,
      borderColor: "#CCCCCC",
      backgroundColor: "#f5f5f5",
      padding: 10,
      borderRadius: 4,
      ...Platform.select({
        ["ios"]: {
          fontFamily: "Courier",
        },
        ["android"]: {
          fontFamily: "monospace",
        },
      }),
    },
    code_block: {
      borderWidth: 1,
      borderColor: "#CCCCCC",
      backgroundColor: "#f5f5f5",
      padding: 10,
      borderRadius: 4,
      ...Platform.select({
        ["ios"]: {
          fontFamily: "Courier",
        },
        ["android"]: {
          fontFamily: "monospace",
        },
      }),
    },
    fence: {
      borderWidth: 1,
      borderColor: "#CCCCCC",
      backgroundColor: "#f5f5f5",
      padding: 10,
      borderRadius: 4,
      ...Platform.select({
        ["ios"]: {
          fontFamily: "Courier",
        },
        ["android"]: {
          fontFamily: "monospace",
        },
      }),
    },

    // Tables
    table: {
      borderWidth: 1,
      borderColor: "#000000",
      borderRadius: 3,
    },
    thead: {},
    tbody: {},
    th: {
      flex: 1,
      padding: 5,
    },
    tr: {
      borderBottomWidth: 1,
      borderColor: "#000000",
      flexDirection: "row",
    },
    td: {
      flex: 1,
      padding: 5,
    },

    // Links
    link: {
      textDecorationLine: "underline",
    },
    blocklink: {
      flex: 1,
      borderColor: "#000000",
      borderBottomWidth: 1,
    },

    // Images
    image: {
      flex: 1,
    },

    // Text Output
    text: {
      fontFamily: Platform.OS === "ios" ? "Gibson" : "Gibson-Regular",
      color: isDark ? dark.text : light.text,
    },
    textgroup: {},
    paragraph: {
      marginTop: 10,
      marginBottom: 10,
      flexWrap: "wrap",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      width: "100%",
    },
    hardbreak: {
      width: "100%",
      height: 1,
    },
    softbreak: {},

    // Believe these are never used but retained for completeness
    pre: {},
    inline: {},
    span: {},
  });

  return (
    <Modal
      animationType="slide"
      animated
      visible={visible}
      transparent
      style={{
        backgroundColor: isDark ? dark.background : light.background,
      }}
    >
      <View
        style={{
          backgroundColor: isDark ? dark.navBar.background : light.background,
        }}
      >
        <Arrow
          onPress={() => setVisibility(false)}
          color={isDark ? dark.text : light.text}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{
            height: "100%",
            marginTop: hp("10%"),
            paddingHorizontal: hp("2.5%"),
          }}
        >
          <Markdown style={styles}>{Lang.privacy_policy}</Markdown>
          <Spacer space={"10%"} />
        </ScrollView>
      </View>
    </Modal>
  );
};
