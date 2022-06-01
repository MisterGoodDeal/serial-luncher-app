import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { localStorage } from "../services/localStorage.service";
import { GGLog } from "../utils/functions";
import { MangoUser, User } from "./model/user";
import { AppState } from "./store";
import { Stats } from "./user/interfaces";

const initialState: User = {
  firstName: "",
  lastName: "",
  clientNumber: "",
  email: "",
  hasSeenTutorial: true,
  id: -1,
  name: "",
  carteBancaire: "",
  token: null,
  refreshToken: null,
  stats: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState as User,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{
        token: string | null;
        refreshToken: string | null;
      }>
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      (async () => {
        await localStorage.store(
          "user",
          JSON.stringify({
            id: state.id,
            name: state.name,
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            hasSeenTutorial: state.hasSeenTutorial,
            clientNumber: state.clientNumber,
            carteBancaire: state.carteBancaire,
            token: action.payload.token,
            refreshToken: action.payload.refreshToken,
          })
        );
      })();
    },
    updateUser: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
    disconnectUser: () => {
      GGLog("Disconnecting user => Reset to initial state");
      (async () => {
        await localStorage.removeItem("user");
      })();
      return initialState;
    },
    updateCb: (state, action: PayloadAction<any>) => {
      state.carteBancaire = action.payload;
    },
    updateInfos: (
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        firstname: string;
        lastname: string;
      }>
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.firstName = action.payload.firstname;
      state.lastName = action.payload.lastname;
    },
    persistUser: (state) => {
      console.log("persistUser");

      (async () => {
        await localStorage.store(
          "user",
          JSON.stringify({
            id: state.id,
            name: state.name,
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            hasSeenTutorial: state.hasSeenTutorial,
            clientNumber: state.clientNumber,
            carteBancaire: state.carteBancaire,
            token: state.token,
            refreshToken: state.refreshToken,
          })
        );
      })();
    },
    setStats: (state, action: PayloadAction<Stats>) => {
      state.stats = action.payload;
    },
    setMangoUser: (state, action: PayloadAction<MangoUser | undefined>) => {
      state.MangoUser = action.payload;
    },
  },
});

export const userSelector = (state: AppState): User => state.user;

export const { updateUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
