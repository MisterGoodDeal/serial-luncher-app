import React from "react";
import { Provider } from "react-redux";
import useCachedResources from "./src/hooks/useCachedResources";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { store } from "./src/store/store";
import GenericModal from "@components/GenericModal";
import { Loader } from "@components/Loader";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <GenericModal />
        <Loader />
        <RootNavigator />
      </Provider>
    );
  }
}
