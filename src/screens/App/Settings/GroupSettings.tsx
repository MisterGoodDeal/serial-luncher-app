import * as React from "react";
import {
  ScrollView,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { Colors, dark, light } from "@themes/Colors";
import { Container } from "@components/common/Container";
import { hp, wp } from "@utils/functions";
import { Spacer } from "@components/common/Spacer";
import { CustomText } from "@components/ui/Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { applicationState } from "@store/application/selector";
import { useDispatch, useSelector } from "react-redux";
import { Lang } from "@constants/Lang";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Arrow } from "@components/ui/Atoms/Arrow";
import ToggleSwitch from "toggle-switch-react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { Group, GroupInfo } from "@store/model/groups";
import {
  useGetGroupInfoQuery,
  useGetGroupsQuery,
  useJoinGroupMutation,
  useLeaveGroupMutation,
} from "@store/groups/slice";
import { setHasGroup, setLoading } from "@store/application/slice";
import Toast from "react-native-toast-message";
import { Button } from "@components/ui/Atoms/Button";
import { BottomPicker } from "@components/ui/Molecules/BottomPicker";
import { onOpen } from "react-native-actions-sheet-picker-serial-luncher";
import { setGroup as setGroupStore } from "@store/groups/slice";
import { Loader } from "@components/ui/Molecules/Loader";

interface GroupSettingsProps {}

export const GroupSettings: React.FunctionComponent<
  GroupSettingsProps
> = ({}) => {
  const isDark = useColorScheme() === "dark";

  const dispatch = useDispatch();
  const { userInfos, settings, loading } = useSelector(applicationState);

  const nav = useNavigation();

  const {
    currentData,
    isFetching,
    isError,
    isSuccess,
    refetch: refetchGroupInfo,
    error,
  } = useGetGroupInfoQuery({});
  const [infos, setInfos] = React.useState<GroupInfo>();

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
        setSelectedFilter({
          name: `${data.group.name} (${data.group.group_key})`,
          code: data.group.id!,
        });
        setInfos(data);
      }
      dispatch(setLoading(false));
    }
  }, [currentData, isFetching, isError, error]);

  /**
   * Leave the group
   */
  const [leaveGroup, leaveGroupSettingsResponse] = useLeaveGroupMutation();
  const [softLeave, setSoftLeave] = React.useState(false);
  const [changeGroup, setChangeGroup] = React.useState(false);

  React.useEffect(() => {
    if (leaveGroupSettingsResponse.status === "pending") {
      dispatch(setLoading(true));
    } else if (leaveGroupSettingsResponse.status === "fulfilled") {
      dispatch(setLoading(false));
      if (!softLeave || changeGroup) {
        dispatch(setHasGroup(false));
      } else {
        joinGroup({ group_key: group2Join?.group_key ?? "" });
      }
    } else if (leaveGroupSettingsResponse.status === "rejected") {
      dispatch(setLoading(false));
      Toast.show({
        type: "error",
        text1: Lang.group.error.oops,
        text2: Lang.group.error.error_leaving,
      });
    }
  }, [leaveGroupSettingsResponse]);

  /**
   * Join the group
   */

  const [joinGroup, joinGroupSettingsResponse] = useJoinGroupMutation();

  React.useEffect(() => {
    if (joinGroupSettingsResponse.status === "pending") {
      dispatch(setLoading(true));
    } else if (joinGroupSettingsResponse.status === "fulfilled") {
      const joinedGroup = joinGroupSettingsResponse.data as Group;
      dispatch(setLoading(false));
      dispatch(setGroupStore(joinedGroup));
      dispatch(setHasGroup(true));
      Toast.show({
        type: "success",
        text1: Lang.navigation.group,
        text2: Lang.settings.group_settings.group_switched,
      });
      refetchGroupInfo();
    } else if (joinGroupSettingsResponse.status === "rejected") {
      dispatch(setLoading(false));
      Toast.show({
        type: "error",
        text1: Lang.group.error.oops,
        text2: Lang.settings.group_settings.group_switched_error,
      });
    }
  }, [joinGroupSettingsResponse]);

  /**
   * Get the groups
   */
  const [groups, setGroups] = React.useState<Partial<Group>[]>([]);
  const {
    currentData: groupsData,
    isFetching: isFetchingGroups,
    isError: isErrorGroups,
    isSuccess: isSuccessGroups,
    refetch: refetchGroups,
    error: errorGroups,
  } = useGetGroupsQuery();

  React.useEffect(() => {
    if (isFetchingGroups) {
      dispatch(setLoading(true));
    } else if (isErrorGroups || isSuccessGroups) {
      if (isErrorGroups) {
        Toast.show({
          type: "error",
          text1: Lang.group.error.oops,
          text2: Lang.group.error.error_fetching,
        });
      } else {
        const data = groupsData as Partial<Group>[];
        setGroups(data);
        const formattedData = data.map((group) => {
          return {
            name: `${group.name} (${group.group_key})`,
            code: group.id!,
          };
        });
        setData(formattedData);
      }
      dispatch(setLoading(false));
    }
  }, [
    groupsData,
    isFetchingGroups,
    isErrorGroups,
    errorGroups,
    isSuccessGroups,
  ]);

  /**
   * Filter
   */
  const [data, setData] = React.useState<{ name: string; code: number }[]>([]);
  const [selectedFilter, setSelectedFilter] = React.useState<
    { name: string; code: number } | undefined
  >(undefined);
  const [queryFilter, setQueryFilter] = React.useState("");

  const filteredDataFilter = React.useMemo(() => {
    if (data && data.length > 0) {
      return data.filter((item, index) =>
        item.name
          .toLocaleLowerCase("en")
          .includes(queryFilter.toLocaleLowerCase("en"))
      );
    }
  }, [data, queryFilter]);

  const onSearchFilter = (text: string) => {
    setQueryFilter(text);
  };

  /**
   * Manage switch group
   */
  const [group2Join, setGroup2Join] = React.useState<
    Partial<Group> | undefined
  >();
  React.useEffect(() => {
    if (selectedFilter?.code !== infos?.group.id) {
      const g = groups.find((group) => group.id === selectedFilter?.code);
      setGroup2Join(g);
      setSoftLeave(true);
      leaveGroup({ id: infos?.group.id!, is_soft: true });
    }
  }, [selectedFilter]);

  /**
   * Focus effect
   */
  useFocusEffect(
    React.useCallback(() => {
      refetchGroupInfo();
      refetchGroups();
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
      <Loader loading={loading} dark={isDark} />
      <Arrow
        onPress={() => nav.goBack()}
        color={isDark ? dark.text : light.text}
      />
      <Spacer space={"3%"} />
      <CustomText
        size={texts.subtitle}
        color={isDark ? dark.text : light.text}
        align={"left"}
        fontWeight={"600"}
      >
        {Lang.settings.group_settings.title}
      </CustomText>
      <Spacer space={"1%"} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ height: "100%" }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
          }}
        >
          <Spacer space="5%" />
          <Image
            source={{ uri: infos?.group.image }}
            style={{
              width: hp("15%"),
              height: hp("15%"),
              resizeMode: "cover",
              borderRadius: 15,
            }}
          />
          <Spacer space="1%" />
          <CustomText
            size={texts.title}
            color={isDark ? dark.text : light.text}
            align={"center"}
            fontWeight={"600"}
          >
            {infos?.group.name}
          </CustomText>
          <Spacer space={"1%"} />

          <OTPInputView
            style={{ width: "70%", height: 40 }}
            pinCount={6}
            code={infos?.group.group_key}
            codeInputFieldStyle={{
              width: 30,
              height: 40,
              borderWidth: 0,
              borderBottomWidth: 1,
              color: isDark ? dark.text : light.text,
            }}
            autoFocusOnLoad={false}
            editable={false}
          />
          <Spacer space={"5%"} />
          <Button color={Colors.main} onPress={() => onOpen("groups")}>
            {Lang.settings.group_settings.change_group}
          </Button>
          <BottomPicker
            id="groups"
            // @ts-ignore
            data={filteredDataFilter}
            query={queryFilter}
            isDark={isDark}
            label={Lang.settings.group_settings.label_filter}
            onSearch={onSearchFilter}
            setSelected={setSelectedFilter}
            noDataFoundText={Lang.settings.group_settings.not_found_filter}
            placeholderText={Lang.settings.group_settings.placeholder_filter}
          />
          <Spacer space={"1%"} />
          <Button
            color={Colors.main}
            onPress={() => {
              setChangeGroup(true);
              leaveGroup({ id: infos?.group.id!, is_soft: true });
            }}
          >
            {Lang.settings.group_settings.joinAnotherGroup}
          </Button>
          <Spacer space={"3%"} />
          <Button
            onPress={() => {
              setSoftLeave(false);
              leaveGroup({ id: infos?.group.id ?? -1, is_soft: false });
            }}
            color={Colors.red}
          >
            {Lang.group.leave_group}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};
