import * as React from "react";
import { Container } from "@components/Container";
import { Colors } from "@constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@store/actions";
import {
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { hp, wp } from "@utils/functions";
import { KeyboardDismiss } from "@components/KeyboardDismiss";
import { selectors } from "@store/selectors";
import { InformationsScreen } from "./Informations";
import { CredentialsScreen } from "./Credentials";
import { JoinGroupScreen } from "./JoinGroup";

interface RegisterScreenProps {}

export const RegisterScreen: React.FunctionComponent<
  RegisterScreenProps
> = ({}) => {
  const dispatch = useDispatch();
  const { buttons } = useSelector(selectors.application.info);

  const ref = React.useRef<FlatList>(null);
  const [index, setIndex] = React.useState(0);

  useFocusEffect(
    React.useCallback(() => {
      return () => null;
    }, [])
  );

  React.useEffect(() => {
    if (buttons?.valid?.action === "connected") {
      dispatch(
        actions.application.setAction({
          function: () => {
            alert("Vous êtes connecté");
            dispatch(actions.application.clean());
          },
          type: "valid",
        })
      );
    }
  }, [buttons]);

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
    <JoinGroupScreen
      key={2}
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
      <StatusBar barStyle="light-content" />
      <Container
        flex={1}
        alignItems={"center"}
        justifyContent={"center"}
        color={Colors.darkgrey}
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
