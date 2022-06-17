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
import { initialState } from "@store/application/constants";

const Stack = createStackNavigator();

export const RootNavigator: React.FC<{}> = () => {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      setLoaded(true);
    })();
  }, []);

  const { loading, token, userInfos } = useSelector(applicationState);

  return (
    <>
      <Loader loading={loading} mode="dark" />
      {loaded && (
        <NavigationContainer linking={linking}>
          {userInfos.id === -1 && (
            <>
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
          {userInfos.id !== -1 && <Map />}
        </NavigationContainer>
      )}
    </>
  );
};
