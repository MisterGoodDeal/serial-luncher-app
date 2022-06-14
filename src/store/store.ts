import { configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { reducers } from "./reducers";
import { applicationAPI } from "./application/slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { combineReducers } from "redux";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const combinedReducers = combineReducers({
  ...reducers,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(applicationAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
