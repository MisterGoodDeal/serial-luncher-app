import * as React from "react";
import { Platform, StyleSheet } from "react-native";
import { Colors, dark, light } from "@themes/Colors";
import { Lang } from "@constants/Lang";
import { texts } from "@constants/TextsSizes";

import { Picker } from "react-native-actions-sheet-picker-serial-luncher";
import { hp } from "@utils/functions";

interface BottomPickerProps {
  id: string;
  data: any[];
  query: string;
  isDark: boolean;
  label: string;
  onSearch: (value: string) => void;
  setSelected: React.Dispatch<any>;
}

export const BottomPicker: React.FunctionComponent<BottomPickerProps> = ({
  id,
  data,
  query,
  isDark,
  onSearch,
  setSelected,
  label,
}) => (
  <Picker
    id={id}
    // @ts-ignore
    data={data}
    inputValue={query}
    searchable={true}
    label={label}
    setSelected={setSelected}
    onSearch={onSearch}
    closeText={Lang.country_specialities.close}
    placeholderText={Lang.country_specialities.search}
    noDataFoundText={Lang.country_specialities.no_result}
    style={{
      actionSheet: {
        backgroundColor: isDark ? dark.background : light.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      close: {
        text: {
          color: Colors.white,
          fontFamily: Platform.OS === "ios" ? "Gibson" : "Gibson-Regular",
          fontWeight: "600",
        },
        container: {
          backgroundColor: Colors.blue,
          borderRadius: hp("1%"),
        },
      },
      input: {
        color: isDark ? dark.text : light.text,
        backgroundColor: isDark
          ? dark.input.background
          : light.input.background,
        height: hp("5%"),
        paddingHorizontal: hp("1%"),
        borderRadius: hp("1%"),
        fontFamily: Platform.OS === "ios" ? "Gibson" : "Gibson-Regular",
      },
      item: {
        text: {
          color: isDark ? dark.text : light.text,
          fontFamily: Platform.OS === "ios" ? "Gibson" : "Gibson-Regular",
        },
      },
      label: {
        text: {
          color: isDark ? dark.text : light.text,
          fontFamily: Platform.OS === "ios" ? "Gibson" : "Gibson-Regular",
          fontWeight: "600",
          fontSize: texts.paragraph,
        },
      },
    }}
  />
);

const styles = StyleSheet.create({});
