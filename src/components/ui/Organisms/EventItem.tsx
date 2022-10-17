import * as React from "react";
import { StyleSheet, Image, View, ScrollView, Alert } from "react-native";
import { Colors, dark, light } from "@themes/Colors";
import { User } from "@store/model/enrollment";
import { Container } from "@components/common/Container";
import { hp, wp } from "@utils/functions";
import { CustomText } from "../Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { Spacer } from "@components/common/Spacer";
import { FormattedEvent } from "@store/model/events";
import { MapButton } from "../Molecules/MapButton";
import { Lang } from "@constants/Lang";
import { Popup } from "../Molecules/Popup";
import { UserItem } from "./UserItem";
import { Button } from "../Atoms/Button";
import { useSelector } from "react-redux";
import { applicationState } from "@store/application/selector";
import { vibrate } from "@utils/vibrate";
import {
  useDeleteEventMutation,
  useJoinEventMutation,
  useLeaveEventMutation,
} from "@store/places/slice";
import { useDispatch } from "react-redux";
import { setLoading } from "@store/application/slice";
import Toast from "react-native-toast-message";

interface EventItemProps {
  formattedEvent: FormattedEvent;
  isDark: boolean;
  refetchEvents: () => void;
}

export const EventItem: React.FunctionComponent<EventItemProps> = ({
  formattedEvent,
  isDark,
  refetchEvents,
}) => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = React.useState(false);
  const { userInfos } = useSelector(applicationState);

  const [join, joinResult] = useJoinEventMutation();
  const [leave, leaveResult] = useLeaveEventMutation();
  const [deleteEvent, deleteEventResult] = useDeleteEventMutation();

  React.useEffect(() => {
    if (joinResult.status === "pending") {
      dispatch(setLoading(true));
    } else if (joinResult.status === "fulfilled") {
      dispatch(setLoading(false));
      Toast.show({
        type: "success",
        text1: Lang.event.success.title,
        text2: Lang.event.success.successfully_joined,
      });
      refetchEvents();
    } else if (joinResult.status === "rejected") {
      dispatch(setLoading(false));
      Toast.show({
        type: "error",
        text1: Lang.event.error.title,
        text2: Lang.event.error.error_joining,
      });
    }
  }, [joinResult]);

  React.useEffect(() => {
    if (leaveResult.status === "pending") {
      dispatch(setLoading(true));
    } else if (leaveResult.status === "fulfilled") {
      dispatch(setLoading(false));
      Toast.show({
        type: "success",
        text1: Lang.event.success.title,
        text2: Lang.event.success.successfully_left,
      });
      refetchEvents();
    } else if (leaveResult.status === "rejected") {
      dispatch(setLoading(false));
      Toast.show({
        type: "error",
        text1: Lang.event.error.title,
        text2: Lang.event.error.error_leaving,
      });
    }
  }, [leaveResult]);

  React.useEffect(() => {
    if (deleteEventResult.status === "pending") {
      dispatch(setLoading(true));
    } else if (deleteEventResult.status === "fulfilled") {
      dispatch(setLoading(false));
      Toast.show({
        type: "success",
        text1: Lang.event.success.title,
        text2: Lang.event.success.success_deleting,
      });
      refetchEvents();
    } else if (deleteEventResult.status === "rejected") {
      dispatch(setLoading(false));
      Toast.show({
        type: "error",
        text1: Lang.event.error.title,
        text2: Lang.event.error.error_deleting,
      });
    }
  }, [deleteEventResult]);

  return (
    <Container
      color={isDark ? dark.background : light.background}
      alignItems={"center"}
      direction={"row"}
      style={{
        marginVertical: hp("1%"),
        height: hp("10%"),
        marginHorizontal: hp("2%"),
        borderRadius: 10,
        paddingHorizontal: wp("5%"),
        shadowColor: isDark ? Colors.black : Colors.grey,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 3,
        paddingBottom: hp("3%"),
      }}
      flex={1}
    >
      <Image
        source={
          formattedEvent.place.image === ""
            ? require("@images/avatar.png")
            : {
                uri: formattedEvent.place.image,
              }
        }
        style={[
          {
            width: hp("6%"),
            height: hp("6%"),
            resizeMode: "cover",
            borderRadius: 10,
            marginLeft: hp("2%"),
          },
        ]}
      />
      <View
        style={{
          width: wp("50%"),
          height: hp("8%"),
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <CustomText
          size={texts.paragraph}
          color={isDark ? dark.text : light.text}
          fontWeight={"600"}
          align={"center"}
          style={{
            marginLeft: hp("2%"),
          }}
        >
          {formattedEvent.place.name}
        </CustomText>

        <Spacer space={"1%"} />
        <CustomText
          size={texts.small}
          color={isDark ? dark.text : light.text}
          fontWeight={"400"}
          align={"center"}
          style={{
            marginLeft: hp("2%"),
          }}
        >
          {`${Lang.event.proposed_by} ${formattedEvent.creator.firstname}`}
        </CustomText>

        <Spacer space={".25%"} />
        <CustomText
          size={texts.small}
          color={isDark ? dark.text : light.text}
          fontWeight={"200"}
          align={"center"}
          style={{
            marginLeft: hp("2%"),
          }}
        >
          {`${new Date(formattedEvent.date).toLocaleDateString()} @ ${new Date(
            formattedEvent.date
          ).getHours()}:${new Date(formattedEvent.date).getMinutes()}`}
        </CustomText>
      </View>
      <MapButton
        onPress={() => setShowPopup(true)}
        icon={require("@images/information.png")}
        size={hp("4.5%")}
        top={hp("5%") - hp("4.5%") / 2}
        right={wp("4%")}
        color={
          formattedEvent.participants.find(
            (participant) => participant.id === userInfos.id
          )
            ? Colors.green
            : Colors.main
        }
      />
      <Popup
        animation="slide"
        visible={showPopup}
        onClose={() => setShowPopup(false)}
        color={isDark ? dark.background : light.background}
        margin={{ x: wp("10%"), y: hp("15%") }}
      >
        <ScrollView
          style={{
            width: wp("70%"),
          }}
          showsVerticalScrollIndicator={false}
        >
          <CustomText
            size={texts.title}
            color={isDark ? dark.text : light.text}
            fontWeight={"600"}
            align={"center"}
          >
            {formattedEvent.place.name}
          </CustomText>
          <CustomText
            size={texts.subtitle}
            color={isDark ? dark.text : light.text}
            fontWeight={"400"}
            align={"center"}
          >
            {
              Lang.country_specialities.countries.find(
                (country) =>
                  country.code ===
                  Number(formattedEvent.place.fk_country_speciality ?? "-1")
              )?.name
            }
          </CustomText>
          <Spacer space={"2%"} />
          <CustomText
            size={texts.paragraph}
            color={isDark ? dark.text : light.text}
            fontWeight={"400"}
            align={"center"}
          >
            {`${Lang.event.proposed_by} ${formattedEvent.creator.firstname}`}
          </CustomText>

          <Spacer space={".25%"} />
          <CustomText
            size={texts.small}
            color={isDark ? dark.text : light.text}
            fontWeight={"200"}
            align={"center"}
          >
            {`${new Date(
              formattedEvent.date
            ).toLocaleDateString()} @ ${new Date(
              formattedEvent.date
            ).getHours()}:${new Date(formattedEvent.date).getMinutes()}`}
          </CustomText>
          <Spacer space={"2%"} />
          {formattedEvent.participants.find(
            (participant) => participant.id === userInfos.id
          ) ? (
            <Button
              onPress={() =>
                leave({
                  id: formattedEvent.id,
                })
              }
              color={Colors.red}
              width={wp("60%")}
            >
              {Lang.event.not_participating}
            </Button>
          ) : (
            <Button
              onPress={() =>
                join({
                  id: formattedEvent.id,
                })
              }
              color={Colors.main}
              width={wp("60%")}
            >
              {Lang.event.participating}
            </Button>
          )}
          {formattedEvent.creator.id === userInfos.id && (
            <>
              <Spacer space={"1%"} />
              <Button
                onPress={() => {
                  vibrate.error();
                  Alert.alert(
                    Lang.event.delete_event,
                    Lang.event.delete_event_content,
                    [
                      {
                        text: Lang.event.no,
                      },
                      {
                        text: Lang.event.yes,
                        onPress: () => {
                          deleteEvent({
                            id: formattedEvent.id,
                          });
                        },
                        style: "destructive",
                      },
                    ]
                  );
                }}
                color={Colors.red}
                width={wp("60%")}
              >
                {Lang.event.delete_event}
              </Button>
            </>
          )}
          <Spacer space={"3%"} />
          <CustomText
            size={texts.subtitle}
            color={isDark ? dark.text : light.text}
            fontWeight={"600"}
            align={"center"}
          >
            {`${Lang.event.participants} (${formattedEvent.participants.length})`}
          </CustomText>
          <Spacer space={"2%"} />
          {formattedEvent.participants.map((u, index: number) => (
            <UserItem user={u} isDark={isDark} key={index} />
          ))}
        </ScrollView>
      </Popup>
    </Container>
  );
};

const styles = StyleSheet.create({});
