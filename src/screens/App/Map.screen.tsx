import * as React from "react";
import { Colors, dark, light } from "@themes/Colors";
import { Container } from "@components/common/Container";
import {
  convertMetersToKilometersIfNecessary,
  convertMetersToMiles,
  convertMinutesToHoursIfNecessary,
  getMarkerAsset,
  hp,
  wp,
} from "@utils/functions";
import { applicationState } from "@store/application/selector";
import { useDispatch, useSelector } from "react-redux";
import MapView from "react-native-map-clustering";
import { Callout, LatLng, Marker, Polyline } from "react-native-maps";
import {
  useColorScheme,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  useAddCommentMutation,
  useAddPlaceMutation,
  useGetPlacesQuery,
  useRequestRoutePlanningMutation,
} from "@store/places/slice";
import { RoutePlannerResponse, StuffedPlace } from "@store/model/places";
import { setLoading, setOptions } from "@store/application/slice";
import { Lang } from "@constants/Lang";
import Toast from "react-native-toast-message";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import Geolocation from "@react-native-community/geolocation";
import { MapButton } from "@components/ui/Molecules/MapButton";
import { BottomSheet } from "@components/ui/Organisms/BottomSheet";
import { Popup } from "@components/ui/Molecules/Popup";
import { CustomText } from "@components/ui/Atoms/CustomText";
import { texts } from "@constants/TextsSizes";
import { Spacer } from "@components/common/Spacer";
import { Input } from "@components/ui/Atoms/Input";
import { Rating } from "react-native-ratings";
import CheckBox from "@react-native-community/checkbox";
import { Button } from "@components/ui/Atoms/Button";
import {
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import { onOpen } from "react-native-actions-sheet-picker-serial-luncher";
import { BottomPicker } from "@components/ui/Molecules/BottomPicker";
import { vibrate } from "@utils/vibrate";
import { darkMap } from "@constants/darkMap";
import { CustomMarkerSheet } from "@components/ui/Organisms/CustomMarkerSheet";
import Geocoder from "react-native-geocoding";
import { configuration } from "@constants/configuration";
Geocoder.init(configuration.GOOGLE_API_KEY); // use a valid API key

interface MapProps {}

export const Map: React.FunctionComponent<MapProps> = ({}) => {
  const isDark = useColorScheme() === "dark";
  const dispatch = useDispatch();
  const { userInfos, options, settings } = useSelector(applicationState);

  React.useEffect(() => {
    if (options?.place2Nav) {
      console.log("options.place2Nav", options.place2Nav);

      const { lat, lng } = options.place2Nav;
      // @ts-ignore
      mapRef.current.animateToRegion(
        {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.005, //this.state.latitudeDelta,
          longitudeDelta: 0.005, //this.state.longitudeDelta,
        },
        300
      );
      dispatch(setOptions({}));
    }
  }, [options]);

  const { currentData, isFetching, isError, isSuccess, refetch, error } =
    useGetPlacesQuery({});

  const mapRef = React.useRef();

  const [places, setPlaces] = React.useState<StuffedPlace[]>();
  const [selectedPlace, setSelectedPlace] = React.useState<StuffedPlace>();
  const [selectedPlaceId, setSelectedPlaceId] = React.useState<number>(-1);
  const [showBottomSheet, setShowBottomSheet] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [addComment, commentResult] = useAddCommentMutation();

  const handleAddComment = () => {
    if (comment.length > 0) {
      dispatch(setLoading(true));
      addComment({
        comment: comment,
        id: selectedPlaceId,
      });
    } else {
      Toast.show({
        type: "error",
        text1: Lang.map.error.oops,
        text2: Lang.map.error.comment_empty,
      });
    }
  };

  React.useEffect(() => {
    if (commentResult.status === "fulfilled") {
      Toast.show({
        type: "success",
        text1: `💬 ${Lang.map.comments}`,
        text2: Lang.map.success.comment_added,
      });
      setComment("");
      dispatch(setLoading(false));
      refetch();
    } else if (commentResult.status === "rejected") {
      Toast.show({
        type: "error",
        text1: Lang.map.error.oops,
        text2: Lang.map.error.error_comment,
      });
      dispatch(setLoading(false));
    }
  }, [commentResult]);

  // Add a place
  const [addPlaceVisible, setAddPlaceVisible] = React.useState(false);
  const [placeName, setPlaceName] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [priceRange, setPriceRange] = React.useState(0);
  const [canBringReusableContent, setCanBringReusableContent] =
    React.useState(false);
  const [url, setUrl] = React.useState("");
  const [picture, setPicture] = React.useState<string>();

  const [addPlace, addPlaceResult] = useAddPlaceMutation();

  const profilePictureOptions: ImageLibraryOptions = {
    mediaType: "photo",
    quality: 0.5,
    includeBase64: true,
  };

  const handleTakePicture = async () => {
    dispatch(setLoading(true));
    const result = await launchCamera(profilePictureOptions);
    if (result.didCancel) {
      Toast.show({
        type: "info",
        text1: `📸 ${Lang.map.fromCamera}`,
        text2: Lang.enrollment.register.step1.profile_picture.cancel,
      });
      dispatch(setLoading(false));
    } else if (result.errorCode || result.errorMessage) {
      Toast.show({
        type: "error",
        text1: `📸 ${Lang.map.fromCamera}`,
        text2: Lang.enrollment.register.step1.profile_picture.error,
      });
      dispatch(setLoading(false));
    } else {
      Toast.show({
        type: "success",
        text1: `📸 ${Lang.map.fromCamera}`,
        text2: Lang.enrollment.register.step1.profile_picture.success,
      });
      // @ts-ignore
      setPicture(result.assets[0].base64);
      dispatch(setLoading(false));
    }
  };

  const handleOpenGallery = async () => {
    dispatch(setLoading(true));
    const result = await launchImageLibrary(profilePictureOptions);
    if (result.didCancel) {
      Toast.show({
        type: "info",
        text1: `📸 ${Lang.map.fromGallery}`,
        text2: Lang.enrollment.register.step1.profile_picture.cancel,
      });
      dispatch(setLoading(false));
    } else if (result.errorCode || result.errorMessage) {
      Toast.show({
        type: "error",
        text1: `📸 ${Lang.map.fromGallery}`,
        text2: Lang.enrollment.register.step1.profile_picture.error,
      });
      dispatch(setLoading(false));
    } else {
      Toast.show({
        type: "success",
        text1: `📸 ${Lang.map.fromGallery}`,
        text2: Lang.enrollment.register.step1.profile_picture.success,
      });
      dispatch(setLoading(false));
      // @ts-ignore
      setPicture(result.assets[0].base64);
    }
  };

  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

  const handleAddPlace = () => {
    if (
      placeName.length > 0 &&
      rating !== 0 &&
      priceRange !== 0 &&
      picture !== "" &&
      selected?.code !== -1 &&
      userCoordinates &&
      userCoordinates
    ) {
      dispatch(setLoading(true));
      addPlace({
        name: placeName,
        rating: rating,
        price_range: priceRange,
        can_bring_reusable_content: canBringReusableContent,
        image: picture!,
        country_speciality: selected?.code ?? -1,
        lat: manualMarker ? manualMarker.latitude : userCoordinates!.latitude,
        lng: manualMarker ? manualMarker.longitude : userCoordinates!.longitude,
        url: urlRegex.test(url) ? url : "",
      });
    } else {
      Toast.show({
        type: "error",
        text1: Lang.map.error.oops,
        text2: Lang.map.error.missing_fields,
      });
    }
  };

  React.useEffect(() => {
    console.log(addPlaceResult);
    if (addPlaceResult.status === "pending") {
      dispatch(setLoading(true));
    } else if (addPlaceResult.status === "fulfilled") {
      dispatch(setLoading(false));
      setAddPlaceVisible(false);
      refetch();
      Toast.show({
        type: "success",
        text1: `🏠 ${Lang.map.place}`,
        text2: Lang.map.success.place_added,
      });
      vibrate.success();
      (async () => {
        await getCurrentLocation();
        manualMarker === undefined &&
          // @ts-ignore
          mapRef.current.animateCamera(
            {
              center: userCoordinates,
              pitch: 10,
              heading: 20,
              altitude: 10,
              zoom: 15,
            },
            { duration: 1000 }
          );
      })();
      setManualMarker(undefined);
      setPlaceName("");
      setRating(0);
      setPriceRange(0);
      setCanBringReusableContent(false);
      setSelected(undefined);
      setUrl("");
      setPicture("");
    } else if (addPlaceResult.status === "rejected") {
      dispatch(setLoading(false));
      Toast.show({
        type: "error",
        text1: Lang.map.error.oops,
        text2: Lang.map.error.error_add,
      });
      vibrate.error();
    }
  }, [addPlaceResult]);

  // Just the useEffect for the main API (places)

  React.useEffect(() => {
    if (isFetching) {
      dispatch(setLoading(true));
    }
    if (isError || isSuccess) {
      if (isError) {
        Toast.show({
          type: "error",
          text1: Lang.group.error.oops,
          text2: Lang.group.error.error_fetching,
        });
      } else {
        const data = currentData as StuffedPlace[];
        setPlaces(data);
      }
      dispatch(setLoading(false));
    }
  }, [currentData, isFetching, isSuccess, isError, error]);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        await getCurrentLocation();
      })();
      refetch();
      return () => null;
    }, [])
  );

  React.useEffect(() => {
    if (selectedPlace) {
      Geocoder.from({
        lat: selectedPlace.lat,
        lng: selectedPlace.lng,
      }).then((json) => setSelectedAddress(json.results[0].formatted_address));
    }
  }, [selectedPlace]);

  // Récupération de la position actuelle de l'utilisateur
  const [userCoordinates, setUserCoordinates] = React.useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }>();

  async function getCurrentLocation() {
    Geolocation.getCurrentPosition(
      async (position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.0,
        };
        setUserCoordinates(region);
      },
      (error) =>
        Toast.show({
          type: "error",
          text1: Lang.map.error.oops,
          text2: Lang.map.error.error_location,
        }),
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 1000,
      }
    );
  }

  const [data, setData] = React.useState(Lang.country_specialities.countries);
  const [selected, setSelected] = React.useState<
    { name: string; code: number } | undefined
  >(undefined);
  const [query, setQuery] = React.useState("");

  const filteredData = React.useMemo(() => {
    if (data && data.length > 0) {
      return data.filter((item, index) =>
        item.name
          .toLocaleLowerCase("en")
          .includes(query.toLocaleLowerCase("en"))
      );
    }
  }, [data, query]);

  const onSearch = (text: string) => {
    setQuery(text);
  };

  /**
   * Filter(s)
   */
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

  const filteredPlaces = React.useMemo(() => {
    if (places && places.length > 0) {
      return places.filter((item, index) => {
        if (selectedFilter !== undefined) {
          return Number(item.fk_country_speciality) === selectedFilter.code
            ? item
            : null;
        } else {
          return item;
        }
      });
    }
  }, [places, selectedFilter]);

  const [manualMarker, setManualMarker] = React.useState<LatLng>();
  const [showCustomMarkerDrawer, setShowCustomMarkerDrawer] =
    React.useState(false);

  const [requestRoutePlanning, requestRoutePlanningResult] =
    useRequestRoutePlanningMutation();
  const [routePlan, setRoutePlan] = React.useState<RoutePlannerResponse>();
  const [link, setLink] = React.useState<string>();

  const handlePlanRoute = (params: { link: string; placeId: number }) => {
    (async () => {
      await getCurrentLocation();
      requestRoutePlanning({
        placeId: params.placeId,
        startLat: userCoordinates?.latitude ?? 0,
        startLng: userCoordinates?.longitude ?? 0,
      });
      setLink(params.link);
    })();
  };

  React.useEffect(() => {
    if (requestRoutePlanningResult.status === "pending") {
      dispatch(setLoading(true));
    } else if (requestRoutePlanningResult.status === "fulfilled") {
      const data = requestRoutePlanningResult.data as RoutePlannerResponse;
      dispatch(setLoading(false));
      setShowBottomSheet(false);
      console.log(data);
      setRoutePlan(data);
      Toast.show({
        type: "info",
        text1: Lang.map.route_planning.title,
        text2: `${convertMinutesToHoursIfNecessary(data.time)} ${
          Lang.map.route_planning.onFeets
        } (${
          settings.units === "metric"
            ? convertMetersToKilometersIfNecessary(data.distance)
            : convertMetersToMiles(data.distance)
        }) ${Lang.map.route_planning.reach}`,
        autoHide: false,
        onHide() {
          setRoutePlan(undefined);
        },
      });
    } else if (requestRoutePlanningResult.status === "rejected") {
      setShowBottomSheet(false);
      Linking.openURL(link!);
    }
  }, [requestRoutePlanningResult]);

  return (
    <Container
      color={Colors.background}
      justifyContent={"center"}
      alignItems={"center"}
      style={{
        width: "100%",
        height: "100%",
        paddingHorizontal: wp("10%"),
      }}
    >
      <CustomMarkerSheet
        setShowDrawer={setShowCustomMarkerDrawer}
        showDrawer={showCustomMarkerDrawer}
        isDark={isDark}
        setCustomMarker={setManualMarker}
        setShowPopup={setAddPlaceVisible}
      />
      <MapView
        // @ts-ignore
        ref={mapRef}
        initialRegion={{
          longitude: 2.347477,
          latitude: 48.85443,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsMyLocationButton={false}
        showsScale={false}
        showsUserLocation={true}
        showsCompass={false}
        cacheEnabled={false}
        clusterColor={Colors.main}
        clusterFontFamily={"Gibson"}
        moveOnMarkerPress={true}
        showsPointsOfInterest={true}
        customMapStyle={isDark ? darkMap : []}
        onLongPress={(e) => {
          vibrate.warning();
          setManualMarker(e.nativeEvent.coordinate);
          setShowCustomMarkerDrawer(true);
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: wp("100%"),
          height: hp("100%"),
        }}
      >
        {routePlan && (
          <Polyline
            coordinates={routePlan.polyline}
            strokeWidth={5}
            strokeColor={Colors.main}
          />
        )}
        {manualMarker && (
          <Marker
            coordinate={{
              latitude: manualMarker.latitude,
              longitude: manualMarker.longitude,
            }}
            title={"custom_marker"}
            description={"custom_marker"}
            image={require("@images/pin-manual/pin.png")}
          >
            <Callout tooltip={true}>
              <Text></Text>
            </Callout>
          </Marker>
        )}
        {filteredPlaces &&
          filteredPlaces.map((place) => (
            <Marker
              key={place.id}
              coordinate={{
                latitude: place.lat,
                longitude: place.lng,
              }}
              title={`place_${place.id}`}
              description={place.name}
              image={getMarkerAsset(selectedPlaceId === place.id)}
              onPress={() => {
                setSelectedPlace(place);
                setSelectedPlaceId(place.id);
                setShowBottomSheet(true);
              }}
            >
              <Callout tooltip={true}>
                <Text></Text>
              </Callout>
            </Marker>
          ))}
      </MapView>
      <MapButton
        onPress={() => {
          // @ts-ignore
          mapRef.current.animateCamera(
            {
              center: userCoordinates,
              pitch: 10,
              heading: 20,
              altitude: 10,
              zoom: 15,
            },
            { duration: 1000 }
          );
        }}
        icon={require("@images/my_position.png")}
        size={hp("5.5%")}
        top={hp("8%")}
        right={wp("4%")}
      />
      <MapButton
        onPress={() => {
          setAddPlaceVisible(true);
          (async () => {
            getCurrentLocation();
          })();
        }}
        icon={require("@images/plus.png")}
        size={hp("5.5%")}
        top={hp("15%")}
        right={wp("4%")}
      />
      <MapButton
        onPress={() => {
          onOpen("country_filter");
        }}
        longPress={() => {
          setSelectedFilter(undefined);
          vibrate.error();
        }}
        icon={require("@images/filter.png")}
        size={hp("5.5%")}
        top={hp("22%")}
        right={wp("4%")}
      />
      <BottomPicker
        id="country_filter"
        // @ts-ignore
        data={filteredDataFilter}
        query={queryFilter}
        isDark={isDark}
        label={Lang.country_specialities.title_filter}
        onSearch={onSearchFilter}
        setSelected={setSelectedFilter}
      />
      <Popup
        animation="slide"
        visible={addPlaceVisible}
        onClose={() => {
          setAddPlaceVisible(false);
          setManualMarker(undefined);
        }}
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
            fontWeight={"600"}
            color={isDark ? dark.text : light.text}
            align={"center"}
          >
            {Lang.map.add_place}
          </CustomText>
          <Spacer space={"5%"} />
          <Input
            placeholder={Lang.map.place_name}
            width={wp("70%")}
            value={placeName}
            setValue={setPlaceName}
            type={"name"}
            isDark={isDark}
          />
          <Spacer space={"2%"} />
          <TouchableOpacity onPress={() => onOpen("country_specialities")}>
            <View pointerEvents="none">
              <Input
                placeholder={`${Lang.country_specialities.title}*`}
                width={wp("70%")}
                // @ts-ignore
                value={selected?.name ?? ""}
                setValue={setPlaceName}
                type={"name"}
                isDark={isDark}
                disabled
              />
            </View>
          </TouchableOpacity>
          <BottomPicker
            id="country_specialities"
            // @ts-ignore
            data={filteredData}
            query={query}
            isDark={isDark}
            label={Lang.country_specialities.title}
            onSearch={onSearch}
            setSelected={setSelected}
          />

          <View
            style={{
              width: wp("80%"),
            }}
          >
            <Container
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <CustomText
                size={texts.paragraph}
                fontWeight={"400"}
                color={isDark ? dark.text : light.text}
              >
                {Lang.map.rating_add}
              </CustomText>
              <Rating
                type="custom"
                ratingImage={require("@images/star.png")}
                jumpValue={1}
                ratingCount={5}
                imageSize={hp("4%")}
                onFinishRating={(value: number) => setRating(value)}
                startingValue={rating}
                tintColor={isDark ? dark.background : light.background}
                ratingBackgroundColor={
                  isDark ? dark.input.background : light.input.background
                }
              />
            </Container>
            <Container
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <CustomText
                size={texts.paragraph}
                fontWeight={"400"}
                color={isDark ? dark.text : light.text}
              >
                {Lang.map.price_range_add}
              </CustomText>
              <Rating
                type="custom"
                ratingImage={require("@images/cash.png")}
                jumpValue={1}
                ratingCount={5}
                imageSize={hp("4%")}
                onFinishRating={(value: number) => setPriceRange(value)}
                startingValue={priceRange}
                tintColor={isDark ? dark.background : light.background}
                ratingBackgroundColor={
                  isDark ? dark.input.background : light.input.background
                }
                ratingColor={Colors.green}
              />
            </Container>
            <Container
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <CustomText
                size={texts.paragraph}
                fontWeight={"400"}
                color={isDark ? dark.text : light.text}
              >
                {Lang.map.reusable_package}
              </CustomText>
              <CheckBox
                disabled={false}
                value={canBringReusableContent}
                onValueChange={(newValue) =>
                  setCanBringReusableContent(newValue)
                }
                animationDuration={0.25}
                tintColor={isDark ? dark.text : light.text}
                onTintColor={Colors.blue}
                onCheckColor={Colors.blue}
                boxType={"circle"}
              />
            </Container>
          </View>
          <Spacer space={"2%"} />
          <Input
            placeholder={Lang.map.link}
            width={wp("70%")}
            value={url}
            setValue={setUrl}
            type={"name"}
            isDark={isDark}
          />
          <Spacer space={"2%"} />
          <View
            style={{
              width: wp("70%"),
            }}
          >
            <CustomText
              size={texts.paragraph}
              fontWeight={"400"}
              color={isDark ? dark.text : light.text}
            >
              {Lang.map.picture}
            </CustomText>
            <Spacer space={"1%"} />
            <Container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              disablePaddingFix
            >
              <Button
                color={Colors.blue}
                width={wp("30%")}
                onPress={handleTakePicture}
              >
                {Lang.map.fromCamera}
              </Button>
              <Button
                color={Colors.blue}
                width={wp("30%")}
                onPress={handleOpenGallery}
              >
                {Lang.map.fromGallery}
              </Button>
            </Container>
          </View>
          <Spacer space={"2%"} />
          <CustomText
            size={texts.small}
            fontWeight={"200"}
            color={isDark ? dark.text : light.text}
          >
            {Lang.map.is_required}
          </CustomText>
          <Spacer space={"2%"} />
          <Button
            color={Colors.main}
            width={wp("70%")}
            onPress={handleAddPlace}
          >
            {Lang.map.add_place}
          </Button>
          <Spacer space={"2%"} />
        </ScrollView>
      </Popup>
      <BottomSheet
        showDrawer={showBottomSheet}
        setShowDrawer={() => {
          setShowBottomSheet(false);
        }}
        place={places?.find((el) => el.id === selectedPlaceId)!}
        refetch={refetch}
        address={selectedAddress}
        isDark={isDark}
        comment={comment}
        setComment={setComment}
        submitComment={handleAddComment}
        planRoute={handlePlanRoute}
      />
    </Container>
  );
};
