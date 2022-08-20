import * as React from "react";
import { StyleSheet } from "react-native";
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
}) => (
  <Picker
    id={id}
    // @ts-ignore
    data={data}
    inputValue={query}
    searchable={true}
    label={Lang.country_specialities.title}
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
          fontFamily: "Gibson",
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
        fontFamily: "Gibson",
      },
      item: {
        text: {
          color: isDark ? dark.text : light.text,
          fontFamily: "Gibson",
        },
      },
      label: {
        text: {
          color: isDark ? dark.text : light.text,
          fontFamily: "Gibson",
          fontWeight: "600",
          fontSize: texts.paragraph,
        },
      },
    }}
  />
);

const styles = StyleSheet.create({});
