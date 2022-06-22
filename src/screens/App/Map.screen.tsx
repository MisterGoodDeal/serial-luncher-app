import * as React from "react";
import { Colors } from "@themes/Colors";
import { Container } from "@components/common/Container";
import { getMarkerAsset, hp, wp } from "@utils/functions";
import { applicationState } from "@store/application/selector";
import { useDispatch, useSelector } from "react-redux";
import MapView from "react-native-map-clustering";
import { Callout, Marker } from "react-native-maps";
import { useColorScheme, Text } from "react-native";
import { useGetPlacesQuery } from "@store/places/slice";
import { Place } from "@store/model/places";
import { setLoading } from "@store/application/slice";
import { Lang } from "@constants/Lang";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";
import Geolocation from "@react-native-community/geolocation";
import { MapButton } from "@components/ui/Molecules/MapButton";
import { BottomSheet } from "@components/ui/Organisms/BottomSheet";

interface MapProps {}

export const Map: React.FunctionComponent<MapProps> = ({}) => {
  const isDark = useColorScheme() === "dark";

  const dispatch = useDispatch();
  const { userInfos } = useSelector(applicationState);

  const { currentData, isFetching, isError, isSuccess, refetch, error } =
    useGetPlacesQuery({});

  const mapRef = React.useRef();

  const [places, setPlaces] = React.useState<Place[]>();
  const [selectedPlace, setSelectedPlace] = React.useState<Place>();
  const [selectedPlaceId, setSelectedPlaceId] = React.useState<number>(-1);
  const [showBottomSheet, setShowBottomSheet] = React.useState(false);

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
        const data = currentData as Place[];
        setPlaces(data);
        console.log("places =>", places);
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

  // Récupération de la position actuelle de l'utilisateur
  const [userCoordinates, setUserCoordinates] = React.useState<any>();

  async function getCurrentLocation() {
    Geolocation.getCurrentPosition(
      async (position) => {
        let region = {
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

  React.useEffect(() => {}, [showBottomSheet]);
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
        cacheEnabled={false}
        clusterColor={Colors.main}
        clusterFontFamily={"Gibson"}
        moveOnMarkerPress={true}
        showsPointsOfInterest={true}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: wp("100%"),
          height: hp("100%"),
        }}
      >
        {places &&
          places.map((place) => (
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
          console.log(userCoordinates);
          console.log(mapRef.current);

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
        icon={require("@images/map.png")}
        size={hp("5.5%")}
        top={hp("8%")}
        right={wp("4%")}
      />
      <BottomSheet
        showDrawer={showBottomSheet}
        setShowDrawer={() => {
          setShowBottomSheet(false);
        }}
        place={selectedPlace!}
        isDark={isDark}
      />
    </Container>
  );
};
