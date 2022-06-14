import React from "react";
import { Provider } from "react-redux";
import useCachedResources from "./src/hooks/useCachedResources";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { store } from "./src/store/store";
import Toast from "react-native-toast-message";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { StoreHydration } from "@screens/StoreHydration";

export default function App() {
  const isLoadingComplete = useCachedResources();

  let persistor = persistStore(store);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <Provider store={store}>
          {/* @ts-ignore */}
          <PersistGate persistor={persistor} loading={<StoreHydration />}>
            <RootNavigator />
          </PersistGate>
        </Provider>
        <Toast />
      </>
    );
  }
}
