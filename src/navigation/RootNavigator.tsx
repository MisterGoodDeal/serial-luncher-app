import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import linking from "../linking";
import { LandingScreen } from "@screens/LandingScreen";
import { EnrollmentNavigator } from "./EnrollmentNavigator";
import { Loader } from "@components/ui/Molecules/Loader";
import { useSelector } from "react-redux";
import { applicationState } from "@store/application/selector";
import { Map } from "@screens/App/Map";

const Stack = createStackNavigator();

export const RootNavigator: React.FC<{}> = () => {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      setLoaded(true);
    })();
  }, []);

  const { loading, token } = useSelector(applicationState);

  return (
    <>
      {loaded && (
        <NavigationContainer linking={linking}>
          {token === "" && (
            <>
              <Loader loading={loading} mode="dark" />
              {/* @ts-ignore */}
              <Stack.Navigator
                initialRouteName={"Landing"}
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Landing" component={LandingScreen} />
                <Stack.Screen
                  name="Enrollment"
                  component={EnrollmentNavigator}
                />
              </Stack.Navigator>
            </>
          )}
          {token !== "" && <Map />}
        </NavigationContainer>
      )}
    </>
  );
};
