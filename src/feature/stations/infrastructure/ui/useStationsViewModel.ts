import type BottomSheet from '@gorhom/bottom-sheet';
import {useCallback, useEffect, useRef, useState} from 'react';
import useServiceStationsQuery from '../api/useServiceStationsQuery';
import {useNavigation} from '@react-navigation/native';
import {useStationFilter} from './hooks/useStationsFilter';
import type {ServiceStation} from '@feature/stations/domain/ServiceStationModel';
import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import {useStore} from '@core/store';
import type {MarkerPressEvent} from 'react-native-maps';
import type RNMap from 'react-native-maps';
import {openExternalMaps} from './utils/openExternalMaps';
import {useLocation} from '@core/geolocation/GeoLocationProvider';

const animateMapToPosition = (
  mapRef: React.RefObject<RNMap>,
  type: 'poi' | 'region',
  latitude: number,
  longitude: number,
) => {
  const deltas: Record<
    string,
    {latitudeDelta: number; longitudeDelta: number}
  > = {
    poi: {
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    region: {
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    },
  } as const;

  mapRef.current?.animateToRegion({
    latitude,
    longitude,
    ...deltas[type],
  });
};

export const useStationsViewModel = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const horizontalViewRef = useRef<ScrollView>(null);
  const mapRef = useRef<RNMap>(null);
  const initialGPSMapPositionDone = useRef(false);

  const permuteUserFavorite = useStore(state => state.permuteFavorite);
  const userCurrentLocation = useStore(state => state.currentLocation);
  const userVehicleFuel = useStore(state => state.fuel);
  const mapStyle = useStore(state => state.mapStyle);

  const {navigate} = useNavigation();
  const deviceLocation = useLocation();
  const {
    data: serviceStationsList,
    isLoading: isServiceStationsLoading,
    refetch: refetchServiceStations,
    isRefetching: isServiceStationsRefetching,
  } = useServiceStationsQuery();

  const {
    filter,
    filteredStationList,
    handlePressFilter,
    mapPois,
    priceRanges,
    userFavoriteStationsIds,
  } = useStationFilter({
    stations: serviceStationsList ?? [],
    location: deviceLocation,
    userVehicleFuel,
  });

  const [selectedStation, setSelectedStation] = useState<ServiceStation | null>(
    null,
  );

  useEffect(() => {
    if (selectedStation) {
      // Workaround to scroll to the end
      setTimeout(() => {
        horizontalViewRef.current?.scrollToEnd({animated: true});
      }, 10);
    }
  }, [selectedStation]);

  // Animate map to device location when it's available
  useEffect(() => {
    if (
      !initialGPSMapPositionDone.current &&
      deviceLocation &&
      !isServiceStationsLoading
    ) {
      animateMapToPosition(
        mapRef,
        'region',
        deviceLocation.latitude,
        deviceLocation.longitude,
      );

      initialGPSMapPositionDone.current = true;
    }
  }, [deviceLocation, isServiceStationsLoading, selectedStation]);

  const handlePressSettings = useCallback(() => {
    navigate('Settings');
  }, [navigate]);

  const handlePressCard = useCallback(
    (id: string) => {
      const station = serviceStationsList?.find(s => s.id === id);

      if (!station) {
        return;
      }

      animateMapToPosition(
        mapRef,
        'poi',
        station.position.latitude,
        station.position.longitude,
      );

      setSelectedStation(station ?? null);
    },
    [serviceStationsList],
  );

  const handlePressBack = useCallback(() => {
    horizontalViewRef.current?.scrollTo({x: 0, animated: true});

    setTimeout(() => {
      setSelectedStation(null);
    }, 300);
  }, []);

  const handlePressFavorite = useCallback(
    (id: string) => {
      permuteUserFavorite(id);
    },
    [permuteUserFavorite],
  );

  const handleHorizontalOnMomentunScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const position = event.nativeEvent.contentOffset.x;

      if (position === 0) {
        setSelectedStation(null);
      }
    },
    [],
  );

  const handlePressMarker = useCallback(
    (event: MarkerPressEvent) => {
      if (serviceStationsList === undefined) {
        return;
      }

      const match = serviceStationsList.find(
        item => item.id === event.nativeEvent.id,
      );

      setSelectedStation(match ?? null);
    },
    [serviceStationsList],
  );

  const handlePressOpenInMaps = useCallback(() => {
    if (selectedStation === null) {
      return;
    }

    const {latitude, longitude} = selectedStation.position;

    openExternalMaps(latitude, longitude);
  }, [selectedStation]);

  return {
    bottomSheetRef,
    filter,
    filteredStationList,
    handleHorizontalOnMomentunScrollEnd,
    handlePressBack,
    handlePressCard,
    handlePressFavorite,
    handlePressFilter,
    handlePressMarker,
    handlePressOpenInMaps,
    handlePressSettings,
    horizontalViewRef,
    isServiceStationsLoading,
    isServiceStationsRefetching,
    mapPois,
    mapRef,
    mapStyle,
    priceRanges,
    refetchServiceStations,
    selectedStation,
    userCurrentLocation,
    userFavoriteStationsIds,
    userVehicleFuel,
  };
};
