import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import linking from "../linking";
import { LandingScreen } from "@screens/LandingScreen";
import { EnrollmentNavigator } from "./EnrollmentNavigator";

const Stack = createStackNavigator();

export const RootNavigator: React.FC<{}> = () => {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      setLoaded(true);
    })();
  }, []);

  return (
    <>
      {loaded && (
        <NavigationContainer linking={linking}>
          {/* @ts-ignore */}
          <Stack.Navigator
            initialRouteName={"Landing"}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Enrollment" component={EnrollmentNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};
