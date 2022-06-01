import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import linking from "../linking";
import { AccueilScreen } from "@screens/AccueilScreen";

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
          <Stack.Navigator
            initialRouteName={"Accueil"}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Accueil" component={AccueilScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};
