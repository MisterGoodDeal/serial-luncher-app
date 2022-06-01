import * as Font from "expo-font";
import * as React from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          "Gibson-Light": require("../assets/fonts/Gibson-Light.otf"),
          "Gibson-Regular": require("../assets/fonts/Gibson-Regular.otf"),
          "Gibson-SemiBold": require("../assets/fonts/Gibson-SemiBold.otf"),
          "Gibson-Bold": require("../assets/fonts/Gibson-Bold.otf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
