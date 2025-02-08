import type BottomSheet from '@gorhom/bottom-sheet';
import {useCallback, useEffect, useRef, useState} from 'react';
import useServiceStationsQuery from '../persistence/useServiceStationsQuery';
import {useNavigation} from '@react-navigation/native';
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
import {useCheapestServiceStations} from './hooks/useCheapestServiceStations';
import {useFavoritesServiceStations} from './hooks/useFavoritesServiceStations';
import {useNearestServiceStations} from './hooks/useNearestServiceStations';
import type {FilterOption} from './constants/filter-constants';
import {animateMapToPosition} from './utils/animateMapToPosition';
import {usePriceRanges} from './hooks/usePriceRanges';
import {useMapMarkers} from './hooks/useMapMarkers';

export const useStationsViewModel = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const horizontalViewRef = useRef<ScrollView>(null);
  const mapRef = useRef<RNMap>(null);
  const initialGPSMapPositionDone = useRef(false);

  const permuteUserFavorite = useStore(state => state.permuteFavorite);
  const userVehicleFuel = useStore(state => state.fuel);
  const userFavoriteStationsIds = useStore(state => state.favorites);
  const mapStyle = useStore(state => state.mapStyle);

  const {navigate} = useNavigation();
  const deviceLocation = useLocation();
  const {
    data: serviceStationsList,
    isLoading: isServiceStationsLoading,
    refetch: refetchServiceStations,
    isRefetching: isServiceStationsRefetching,
  } = useServiceStationsQuery();
  const cheapestStations = useCheapestServiceStations(serviceStationsList);
  const favoriteStations = useFavoritesServiceStations(serviceStationsList);
  const nearestStations = useNearestServiceStations(serviceStationsList);
  const priceRanges = usePriceRanges(nearestStations);
  const mapPois = useMapMarkers(favoriteStations, nearestStations, priceRanges);

  const [filter, setFilter] = useState<FilterOption>('price');
  const [selectedStation, setSelectedStation] = useState<ServiceStation | null>(
    null,
  );

  const filteredStationList = {
    price: cheapestStations,
    favorites: favoriteStations,
    near: nearestStations,
  }[filter];

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
    deviceLocation,
    filter,
    filteredStationList,
    handleHorizontalOnMomentunScrollEnd,
    handlePressBack,
    handlePressCard,
    handlePressFavorite,
    handlePressFilter: setFilter,
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
    userFavoriteStationsIds,
    userVehicleFuel,
  };
};
