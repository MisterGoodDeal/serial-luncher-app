import { configureStore, Store } from "@reduxjs/toolkit";
import { actions } from "./actions";
import { getThunkGreengoApi } from "./api";
import { reducers } from "./reducers";
import { selectors } from "./selectors";

// hack to inject store in thunk from store definition
let _store: Store;

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: {
        extraArgument: {
          greengoApi: getThunkGreengoApi(() => _store, selectors, actions),
          actions,
        },
      },
    }),
});

_store = store;

export type AppState = ReturnType<typeof store.getState>;
