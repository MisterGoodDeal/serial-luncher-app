export const Colors = {
  main: "#665EFF",
  accent: "#5773FF",
  blue: "#3497FD",
  lightblue: "#3ACCE1",
  green: "#3cba54",
  yellow: "#FFB900",
  orange: "#FF9057",
  red: "#FF3B30",
  pink: "#FF4F9A",
  purple: "#C840E9",
  cyan: "#78849E",
  lightGrey: "#dedede",
  placeholder: "#9b9b9b",
  grey: "#454F63",
  darkgrey: "#2A2E43",
  black: "#000000",
  white: "#FFFFFF",
  background: "#fafafa",
  blob_default: "rgb(102,94,255,0.3)",
  transparent: "transparent",
};

export const dark = {
  text: Colors.white,
  background: Colors.darkgrey,
  navBar: {
    background: Colors.grey,
    icons: {
      active: Colors.white,
      inactive: Colors.darkgrey,
    },
  },
  input: {
    background: Colors.grey,
    placeholder: Colors.white,
    text: Colors.white,
  },
};

export const light = {
  text: Colors.black,
  background: Colors.background,
  navBar: {
    background: Colors.white,
    icons: {
      active: Colors.darkgrey,
      inactive: Colors.lightGrey,
    },
  },
  input: {
    background: Colors.lightGrey,
    placeholder: Colors.placeholder,
    text: Colors.black,
  },
};
