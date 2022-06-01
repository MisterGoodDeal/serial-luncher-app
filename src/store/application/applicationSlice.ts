import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Linking, Platform } from "react-native";
import { Lang } from "../../constants/Lang";
import { addThunksWithInfo } from "./utils";
import { initialState, sliceName } from "./constants";
import AndroidOpenSettings from "react-native-android-open-settings";
import { login } from "@store/user/thunks";
import { Application } from "@store/model/application";

export const applicationSlice = createSlice({
  name: sliceName,
  initialState: initialState,
  reducers: {
    clean: () => {
      return initialState;
    },
    setPending: (state, action: PayloadAction<boolean>) => {
      state.pending = action.payload;
    },
    setAction(
      state,
      action: PayloadAction<{ function: () => void; type: "valid" | "cancel" }>
    ) {
      action.payload.type === "valid" && state.info.buttons?.valid
        ? (state.info.buttons.valid.action = action.payload.function)
        : state.info.buttons?.cancel
        ? (state.info.buttons.cancel.action = action.payload.function)
        : null;
    },
    setInfo(state, action: PayloadAction<Application>) {
      state = action.payload;
    },
    serverFailed: () => {
      return {
        info: {
          visible: true,
          title: Lang.fr.application.serverFailedTitle,
          content: Lang.fr.application.serverFailedContent,
          type: "error" as const,
          buttons: {
            valid: null,
            cancel: {
              text: null,
              action: null,
            },
          },
        },
        pending: false,
      };
    },
    unhandledError: () => {
      return {
        info: {
          visible: true,
          title: Lang.fr.application.unhandledErrorTitle,
          content: Lang.fr.application.unhandledErrorContent,
          type: "error" as const,
          buttons: {
            valid: null,
            cancel: {
              text: null,
              action: null,
            },
          },
        },
        pending: false,
      };
    },
    networkError: () => {
      return {
        info: {
          visible: true,
          title: Lang.fr.application.networkErrorTitle,
          content: Lang.fr.application.networkErrorContent,
          type: "error" as const,
          buttons: {
            valid: {
              text: Lang.fr.application.networkErrorButton,
              action:
                Platform.OS === "ios"
                  ? () => Linking.openURL("app-settings:")
                  : () => AndroidOpenSettings.generalSettings(),
            },
            cancel: {
              text: null,
              action: null,
            },
          },
        },
        pending: false,
      };
    },
  },
  extraReducers: (builder) => {
    addThunksWithInfo([login], builder);
  },
});
