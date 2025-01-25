import BottomSheet from '@gorhom/bottom-sheet';
import {useEffect, useRef, useState} from 'react';
import useServiceStationsQuery from '../api/useServiceStationsQuery';
import {useNavigation} from '@react-navigation/native';
import useLocation from '../api/useLocation';
import useStationFilter from './hooks/useStationsFilter';
import {ServiceStation} from '@feature/stations/domain/ServiceStationModel';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import useStore from '@core/store';
import RNMap, {MarkerPressEvent} from 'react-native-maps';

export const useStationsViewModel = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const horizontalViewRef = useRef<ScrollView>(null);
  const mapRef = useRef<RNMap>(null);

  const {navigate} = useNavigation();
  const {currentLocation} = useLocation();
  const {data: serviceStationsList, isLoading: isServiceStationsLoading} =
    useServiceStationsQuery();

  const {
    filter,
    filteredStationList,
    handlePressFilter,
    mapPois,
    priceRanges,
    userFavoriteStations,
  } = useStationFilter(serviceStationsList ?? [], currentLocation);

  const permuteUserFavorite = useStore(state => state.permuteFavorite);
  const userCurrentLocation = useStore(state => state.currentLocation);
  const userVehicleFuel = useStore(state => state.fuel);
  const mapStyle = useStore(state => state.mapStyle);

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

  const handlePressSettings = () => {
    navigate('Settings');
  };

  const handlePressCard = (id: string) => {
    const station = serviceStationsList?.find(s => s.id === id);

    if (!station) {
      return;
    }

    mapRef.current?.animateToRegion({
      latitude: station.position.latitude,
      longitude: station.position.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });

    setSelectedStation(station ?? null);
  };

  const handlePressBack = () => {
    horizontalViewRef.current?.scrollTo({x: 0, animated: true});

    setTimeout(() => {
      setSelectedStation(null);
    }, 300);
  };

  const handlePressFavorite = (id: string) => {
    permuteUserFavorite(id);
  };

  const handleHorizontalOnMomentunScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const position = event.nativeEvent.contentOffset.x;

    if (position === 0) {
      setSelectedStation(null);
    }
  };

  const handlePressMarker = (event: MarkerPressEvent) => {
    if (serviceStationsList === undefined) {
      return;
    }

    const match = serviceStationsList.find(
      item => item.id === event.nativeEvent.id,
    );

    setSelectedStation(match ?? null);
  };

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
    handlePressSettings,
    horizontalViewRef,
    isServiceStationsLoading,
    mapPois,
    mapRef,
    mapStyle,
    priceRanges,
    selectedStation,
    userCurrentLocation,
    userFavoriteStations,
    userVehicleFuel,
  };
};
