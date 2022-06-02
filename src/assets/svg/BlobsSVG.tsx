import * as React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Svg, { G, Path, Defs, Mask } from "react-native-svg";
import { Colors } from "../../constants/Colors";

interface BlobsSVGProps {
  color?: string;
  size?: number;
  variant: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  style?: StyleProp<ViewStyle>;
}

export const BlobsSVG: React.FunctionComponent<BlobsSVGProps> = ({
  color,
  size,
  variant,
  style,
}) => (
  <View>
    {variant === 1 && (
      <Svg viewBox={`0 0 ${size ?? 200} ${size ?? 200}`} style={styles}>
        <Path
          fill={color ?? Colors.blob_default}
          d="M138.5 54.1c12.3 10.4 24 21.6 31.4 37.4 7.3 15.8 10.3 36.1 2.8 51.7-7.5 15.5-25.5 26.3-44.1 31.1-18.5 4.8-37.5 3.7-55.9-1.9-18.3-5.5-36-15.6-43.9-30.6-7.9-15.1-6.1-35.1-1.2-53.1 4.9-18 12.9-34 25.5-44.4 12.6-10.4 29.7-15.2 44.8-12.8 15.2 2.5 28.2 12.2 40.6 22.6Z"
        />
      </Svg>
    )}
    {variant === 2 && (
      <Svg viewBox={`0 0 ${size ?? 200} ${size ?? 200}`}>
        <Path
          fill={color ?? Colors.blob_default}
          d="M150.4 40.4c11 8.8 13.5 28.4 15.5 46.9 2.1 18.6 3.8 36.3-2.8 50.7-6.5 14.4-21.2 25.6-36.3 27.6-15.1 2-30.7-5-44.8-12-14.2-6.9-26.9-13.6-32.4-24-5.4-10.5-3.6-24.6-1.5-39.2 2.1-14.5 4.4-29.4 13.1-38.6 8.6-9.3 23.7-12.8 41.1-15.6 17.4-2.7 37-4.6 48.1 4.2Z"
        />
      </Svg>
    )}
    {variant === 3 && (
      <Svg viewBox={`0 0 ${size ?? 200} ${size ?? 200}`}>
        <Path
          fill={color ?? Colors.blob_default}
          d="M138.8 48.9c8.2 11.8 9.5 27.1 14.8 43.7 5.3 16.5 14.7 34.4 11 48.4-3.7 14-20.4 24.1-38.4 30.4-18 6.3-37.1 8.8-56 4.5-18.8-4.3-37.3-15.4-47.5-31.8-10.2-16.5-11.9-38.3-6.6-57.2 5.3-19 17.7-35 32.9-45.6 15.1-10.5 33.1-15.7 49.7-14.1 16.6 1.6 31.9 9.9 40.1 21.7Z"
        />
      </Svg>
    )}
    {variant === 4 && (
      <Svg viewBox={`0 0 ${size ?? 200} ${size ?? 200}`}>
        <Path
          fill={color ?? Colors.blob_default}
          d="M129.6 55.1c8.7 10.4 15.6 19.2 18.5 29.1 2.9 9.8 1.9 20.8 2.6 36.4.6 15.7 3 36.1-5.2 42.2-8.2 6.2-26.8-1.9-45.2-2.3-18.3-.4-36.4 6.8-49.3 2.2-12.9-4.7-20.7-21.1-22-36.9-1.3-15.7 3.9-30.8 7.7-47.6 3.7-16.8 6-35.3 16.3-45.2 10.4-9.9 28.7-11.2 43.1-5.8 14.4 5.4 24.9 17.4 33.5 27.9Z"
        />
      </Svg>
    )}
    {variant === 5 && (
      <Svg viewBox={`0 0 ${size ?? 200} ${size ?? 200}`}>
        <Path
          fill={color ?? Colors.blob_default}
          d="M136 46.3c8.9 10.6 13.1 23.5 18.7 36.8 5.6 13.4 12.7 27.3 12.1 41.5-.7 14.2-9 28.8-21.5 39.9-12.4 11.1-28.8 18.7-43.9 16.8-15.1-1.9-28.8-13.3-38.2-25.4-9.4-12.1-14.4-24.8-20.4-38.4-5.9-13.6-12.7-28-11.7-42.6 1-14.6 9.8-29.3 22.6-38.6s29.5-13 44.7-10.9c15.2 2.2 28.8 10.4 37.6 20.9Z"
        />
      </Svg>
    )}
    {variant === 6 && (
      <Svg viewBox={`0 0 ${size ?? 200} ${size ?? 200}`}>
        <Path
          fill={color ?? Colors.blob_default}
          d="M137.7 47.2c13.1 10.4 27 18.8 30.5 30.5 3.6 11.6-3.1 26.4-8.3 41.5-5.2 15.1-8.9 30.5-18.7 37.5-9.7 7-25.5 5.7-39.4 3.3-14-2.4-26.3-6-35.2-13.2-9-7.3-14.7-18.3-22.2-31.1-7.5-12.9-16.7-27.5-12.7-37.2 4.1-9.7 21.4-14.4 35-24.7 13.6-10.2 23.5-26 34.5-27.7 11.1-1.7 23.4 10.7 36.5 21.1Z"
        />
      </Svg>
    )}
    {variant === 7 && (
      <Svg viewBox={`0 0 ${size ?? 200} ${size ?? 200}`}>
        <Path
          fill={color ?? Colors.blob_default}
          d="M149.3 35.1c14.8 7.7 27.1 21.9 32.2 38.3 5.2 16.4 3.3 34.9-5.5 48-8.7 13.1-24.3 20.7-38.1 24.6-13.8 3.8-25.9 4-40.7 7.8-14.8 3.8-32.3 11.3-40.7 5.6-8.3-5.6-7.4-24.4-9.4-40-2-15.5-6.8-28-4-38.3C46 70.8 56.4 62.6 67.2 53.6c10.7-9 21.8-18.8 35.9-23.1 14.2-4.3 31.5-3.1 46.2 4.6Z"
        />
      </Svg>
    )}
    {variant === 8 && (
      <Svg viewBox={`0 0 ${size ?? 200} ${size ?? 200}`}>
        <Path
          fill={color ?? Colors.blob_default}
          d="M133.6 54.4c9.7 6.4 17 16.6 24.4 29.2 7.5 12.6 15 27.6 14.6 43.4-.5 15.9-8.8 32.5-22.3 36.8-13.4 4.2-31.8-4.1-49.5-5.2-17.6-1.2-34.4 4.8-44.5-.5-10.1-5.3-13.4-21.9-19.2-38.1-5.8-16.2-14.1-31.9-12.7-47.2 1.3-15.3 12.2-30.1 26.4-35 14.3-4.9 31.7.2 46.4 4 14.8 3.8 26.7 6.3 36.4 12.6Z"
        />
      </Svg>
    )}
    {variant === 9 && (
      <Svg viewBox={`0 0 ${size ?? 200} ${size ?? 200}`}>
        <Path
          fill={color ?? Colors.blob_default}
          d="M149.4 32.4c11.3 7.7 14.7 26.7 15.3 43.1.6 16.5-1.6 30.4-7.8 41-6.2 10.7-16.3 18.1-26.4 23.5-10.2 5.4-20.3 9-34.4 14.3C82 159.7 64 167 50.2 162.8c-13.7-4.3-23.3-20.1-25.5-36.2-2.2-16 2.9-32.2 8.6-47.8C39 63.2 45.2 48.2 56.4 40.4 67.6 32.6 83.8 32 101.5 30c17.6-2 36.7-5.4 47.9 2.4Z"
        />
      </Svg>
    )}
    {variant === 10 && (
      <Svg viewBox={`0 0 ${size ?? 200} ${size ?? 200}`}>
        <Path
          fill={color ?? Colors.blob_default}
          d="M137.6 47.5c8.8 7.2 12.1 21.2 15.2 34.5 3.1 13.2 6 25.6 3.4 37.1-2.6 11.4-10.7 22-21 35-10.2 13.1-22.7 28.7-35.3 28.9-12.6.1-25.3-15.3-33.3-29.1-8.1-13.8-11.5-26-14.5-37.7-2.9-11.8-5.3-23-3.8-34.6 1.6-11.6 7.1-23.5 16.4-30.5 9.3-7.1 22.3-9.4 36-10.4 13.7-.9 28-.5 36.9 6.8Z"
        />
      </Svg>
    )}
  </View>
);

const styles = StyleSheet.create({});