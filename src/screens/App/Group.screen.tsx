import * as React from "react";
import {
  StyleSheet,
  useColorScheme,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Colors, dark, light } from "@themes/Colors";
import { Container } from "@components/common/Container";
import { Link } from "@components/ui/Molecules/Link";
import {
  getOverlayTextColors,
  getRandomStringInArray,
  hp,
  wp,
} from "@utils/functions";
import { Spacer } from "@components/common/Spacer";
import { CustomText } from "@components/ui/Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { applicationState } from "@store/application/selector";
import { useDispatch, useSelector } from "react-redux";
import { disconnect, setHasGroup, setLoading } from "@store/application/slice";
import { Button } from "@components/ui/Atoms/Button";
import {
  useDeleteGroupMutation,
  useGetGroupInfoQuery,
  useLeaveGroupMutation,
} from "@store/groups/slice";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Lang } from "@constants/Lang";
import { GroupInfo } from "@store/model/groups";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { PlaceItem } from "@components/ui/Organisms/PlacesItem";
import { UserItem } from "@components/ui/Organisms/UserItem";

interface GroupProps {}

export const Group: React.FunctionComponent<GroupProps> = ({}) => {
  const isDark = useColorScheme() === "dark";
  const {
    currentData,
    isFetching,
    isError,
    isSuccess,
    refetch: refetchGroupInfo,
    error,
  } = useGetGroupInfoQuery({});

  const [infos, setInfos] = React.useState<GroupInfo>();
  const dispatch = useDispatch();
  const { userInfos } = useSelector(applicationState);

  React.useEffect(() => {
    if (isFetching) {
      dispatch(setLoading(true));
    } else if (isError || isSuccess) {
      if (isError) {
        Toast.show({
          type: "error",
          text1: Lang.group.error.oops,
          text2: Lang.group.error.error_fetching,
        });
      } else {
        const data = currentData as GroupInfo;
        setInfos(data);
      }
      dispatch(setLoading(false));
    }
  }, [currentData, isFetching, isError, error]);

  const [leaveGroup, leaveGroupResponse] = useLeaveGroupMutation();

  React.useEffect(() => {
    if (leaveGroupResponse.status === "pending") {
      dispatch(setLoading(true));
    } else if (leaveGroupResponse.status === "fulfilled") {
      dispatch(setLoading(false));
      dispatch(setHasGroup(false));
    } else if (leaveGroupResponse.status === "rejected") {
      dispatch(setLoading(false));
      Toast.show({
        type: "error",
        text1: Lang.group.error.oops,
        text2: Lang.group.error.error_leaving,
      });
    }
  }, [leaveGroupResponse]);

  const [deleteGroup, deleteGroupReponse] = useDeleteGroupMutation();

  React.useEffect(() => {
    if (deleteGroupReponse.status === "pending") {
      dispatch(setLoading(true));
    } else if (deleteGroupReponse.status === "fulfilled") {
      dispatch(setLoading(false));
      dispatch(setHasGroup(false));
      Toast.show({
        type: "success",
        text1: Lang.group.delete.title,
        text2: Lang.group.delete.success,
      });
    } else if (deleteGroupReponse.status === "rejected") {
      dispatch(setLoading(false));
      Toast.show({
        type: "error",
        text1: Lang.group.error.oops,
        text2: Lang.group.error.error_deleting,
      });
    }
  }, [deleteGroupReponse]);

  useFocusEffect(
    React.useCallback(() => {
      refetchGroupInfo();
      return () => null;
    }, [])
  );

  return (
    <Container
      color={isDark ? dark.background : light.background}
      alignItems={"center"}
      style={{
        width: "100%",
        height: "100%",
        paddingHorizontal: wp("10%"),
      }}
    >
      <Container
        style={{
          height: hp("30%"),
          width: "100%",
          marginTop: -hp("4%"),
          paddingBottom: hp("2%"),
        }}
        justifyContent={"flex-end"}
        alignItems={"center"}
        color={Colors.black}
      >
        <Image
          source={{ uri: infos?.group.image }}
          style={{
            width: "100%",
            height: hp("35%"),
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <Container
          style={{
            width: "100%",
            height: hp("35%"),
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 0.3,
          }}
          color={Colors.black}
        />
        <CustomText
          size={texts.title}
          color={Colors.white}
          align={"center"}
          fontWeight={"600"}
        >
          {infos?.group.name}
        </CustomText>
        <Spacer space={"1.5%"} />

        <OTPInputView
          style={{ width: "55%", height: 30 }}
          pinCount={6}
          code={infos?.group.group_key}
          codeInputFieldStyle={{
            width: 30,
            height: 30,
            borderWidth: 0,
            borderBottomWidth: 1,
            color: Colors.white,
          }}
          autoFocusOnLoad={false}
          editable={false}
        />
      </Container>
      <ScrollView
        style={{
          width: "100%",
          paddingHorizontal: wp("5%"),
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          zIndex: 2,
          backgroundColor: isDark ? dark.background : light.background,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Spacer space={"2%"} />
        <CustomText
          size={texts.subtitle}
          color={isDark ? dark.text : light.text}
          align={"left"}
          fontWeight={"600"}
        >
          {`${Lang.group.hello}, ${
            userInfos.firstname ?? ""
          } ${getRandomStringInArray(["👋", "🙌", "✌️", "🫡"])}`}
        </CustomText>
        <Spacer space={"2%"} />
        <Container
          color={isDark ? dark.navBar.background : light.navBar.background}
          style={{
            shadowColor: isDark ? Colors.black : Colors.grey,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 3,
            borderRadius: 20,
            paddingBottom: hp("3%"),
          }}
        >
          <CustomText
            size={texts.subtitle}
            color={isDark ? dark.text : light.text}
            fontWeight={"600"}
            align={"center"}
          >
            {Lang.group.last_places}
          </CustomText>
          <Spacer space={"2%"} />
          {infos?.last_places.length === 0 && (
            <CustomText
              color={isDark ? dark.text : light.text}
              size={texts.paragraph}
              fontWeight={"400"}
              align={"center"}
            >
              {Lang.group.no_places}
            </CustomText>
          )}
          {infos?.last_places.map((p, index: number) => (
            <PlaceItem
              key={index}
              place={p}
              isDark={isDark}
              isOdd={index % 2 === 0}
            />
          ))}
        </Container>
        <Spacer space={"5%"} />
        <Container
          color={isDark ? dark.navBar.background : light.navBar.background}
          style={{
            shadowColor: isDark ? Colors.black : Colors.grey,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 3,
            borderRadius: 20,
            paddingBottom: hp("3%"),
          }}
        >
          <CustomText
            size={texts.subtitle}
            color={isDark ? dark.text : light.text}
            fontWeight={"600"}
            align={"center"}
          >
            {Lang.group.users}
          </CustomText>
          <Spacer space={"2%"} />
          {infos?.users.map((u, index: number) => (
            <UserItem user={u} isDark={isDark} key={index} />
          ))}
        </Container>
        <Spacer space={"5%"} />
        <Container
          color={isDark ? dark.navBar.background : light.navBar.background}
          style={{
            shadowColor: isDark ? Colors.black : Colors.grey,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 3,
            borderRadius: 20,
            paddingBottom: hp("3%"),
          }}
        >
          <CustomText
            size={texts.subtitle}
            color={isDark ? dark.text : light.text}
            fontWeight={"600"}
            align={"center"}
          >
            {Lang.group.actions}
          </CustomText>
          <Spacer space={"2%"} />
          <Button
            onPress={() => leaveGroup({ id: infos?.group.id ?? -1 })}
            color={Colors.main}
          >
            {Lang.group.leave_group}
          </Button>
          {infos?.group.creator.id === userInfos.id && (
            <>
              <Spacer space={"1%"} />
              <Button
                onPress={() =>
                  Alert.alert(
                    Lang.group.delete.title,
                    Lang.group.delete.content,
                    [
                      {
                        text: Lang.group.delete.cancel,
                      },
                      {
                        text: Lang.group.delete.confirm,
                        onPress: () =>
                          deleteGroup({ id: infos?.group.id ?? -1 }),
                        style: "destructive",
                      },
                    ]
                  )
                }
                color={Colors.red}
              >
                {Lang.group.delete_group}
              </Button>
            </>
          )}
        </Container>
        <Spacer space={"15%"} />
      </ScrollView>
    </Container>
  );
};
