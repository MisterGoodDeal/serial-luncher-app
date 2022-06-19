import * as React from "react";
import { Container } from "@components/common/Container";
import { Colors, dark, light } from "@themes/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar, FlatList, useColorScheme } from "react-native";
import { hp, wp } from "@utils/functions";
import { InformationsScreen } from "./Informations";
import { CredentialsScreen } from "./Credentials";
import { JoinGroupScreen } from "./JoinGroup";
import { CreateGroupScreen } from "./CreateGroup";

interface RegisterScreenProps {}

export const RegisterScreen: React.FunctionComponent<
  RegisterScreenProps
> = ({}) => {
  const isDark = useColorScheme() === "dark";

  const dispatch = useDispatch();

  const ref = React.useRef<FlatList>(null);
  const [index, setIndex] = React.useState(0);

  useFocusEffect(
    React.useCallback(() => {
      return () => null;
    }, [])
  );

  const nextStep = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
    }
  };

  const previousStep = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const data = [
    <InformationsScreen key={0} nextStep={nextStep} />,
    <CredentialsScreen
      key={1}
      previousStep={previousStep}
      nextStep={nextStep}
    />,
    <JoinGroupScreen key={2} previousStep={previousStep} nextStep={nextStep} />,
    <CreateGroupScreen
      key={3}
      previousStep={previousStep}
      nextStep={() => null}
    />,
  ];

  React.useEffect(() => {
    ref.current?.scrollToIndex({
      index,
      animated: true,
    });
  }, [index]);

  return (
    <>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <Container
        flex={1}
        alignItems={"center"}
        justifyContent={"center"}
        color={isDark ? dark.background : light.background}
      >
        <FlatList
          ref={ref}
          initialScrollIndex={index}
          keyExtractor={(item, index) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          style={{
            width: wp("100%"),
            height: hp("100%"),
            flexGrow: 0,
          }}
          data={data}
          renderItem={({ item, index }) => {
            return item;
          }}
        />
      </Container>
    </>
  );
};
