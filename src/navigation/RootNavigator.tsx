import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import linking from "../linking";
import { Loader } from "@components/ui/Molecules/Loader";
import { useSelector } from "react-redux";
import { applicationState } from "@store/application/selector";
import { stack } from "@navigation/Router";
import { Routes } from "./Routes";
import { Arrow } from "@components/ui/Atoms/Arrow";
import { Colors } from "@themes/Colors";
import { hp } from "@utils/functions";
import { initialState } from "@store/application/constants";
import { AppNavigator } from "./AppNavigator";

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
              <Loader loading={loading} mode="dark" />
              <Stack.Navigator
                initialRouteName={Routes.LANDING}
                screenOptions={{
                  headerTransparent: true,
                  headerTitle: ({}) => null,
                  animationEnabled: true,
                  gestureEnabled: true,
                }}
              >
                {stack.map((s) => (
                  <Stack.Screen
                    {...s}
                    options={({ navigation, route }) => ({
                      headerBackTitleVisible: false,
                      headerLeft: ({}) =>
                        route.name === Routes.FORGOTTEN_PASSWORD ? (
                          <Arrow
                            onPress={() => navigation.goBack()}
                            top={hp("2.5%")}
                          />
                        ) : null,
                    })}
                  />
                ))}
              </Stack.Navigator>
            </>
          )}
          {userInfos.id !== -1 && <AppNavigator />}
        </NavigationContainer>
      )}
    </>
  );
};
