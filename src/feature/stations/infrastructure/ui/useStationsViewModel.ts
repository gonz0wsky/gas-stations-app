import BottomSheet from '@gorhom/bottom-sheet';
import {useEffect, useRef, useState} from 'react';
import useServiceStationsQuery from '../api/useServiceStationsQuery';
import {useNavigation} from '@react-navigation/native';
import useLocation from '../api/useLocation';
import {emitEvent} from '@core/events';
import useStationFilter from './hooks/useStationsFilter';
import ServiceStation from '@feature/stations/domain/ServiceStationModel';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import useStore from '@core/store';

const useStationsViewModel = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const horizontalViewRef = useRef<ScrollView>(null);

  const {navigate} = useNavigation();
  const {currentLocation} = useLocation();
  const {data: serviceStationsList} = useServiceStationsQuery();

  const {filter, filteredStations, handlePressFilter, userFavoriteStations} =
    useStationFilter(serviceStationsList ?? [], currentLocation);

  const permuteUserFavorite = useStore(state => state.permuteFavorite);
  const userCurrentLocation = useStore(state => state.currentLocation);
  const userVehicleFuel = useStore(state => state.fuel);

  const [selectedStation, setSelectedStation] = useState<ServiceStation | null>(
    null,
  );

  useEffect(() => {
    if (selectedStation) {
      horizontalViewRef.current?.scrollToEnd({animated: true});
    }
  }, [selectedStation]);

  const handlePressSettings = () => {
    navigate('Settings');
  };

  const handlePressCard = (id: string) => {
    const station = serviceStationsList?.find(station => station.id === id);

    if (!station) {
      return;
    }

    setSelectedStation(station);

    emitEvent('map-change-location', station?.position);
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

  return {
    bottomSheetRef,
    filter,
    filteredStations,
    handleHorizontalOnMomentunScrollEnd,
    handlePressBack,
    handlePressCard,
    handlePressFavorite,
    handlePressFilter,
    handlePressSettings,
    horizontalViewRef,
    selectedStation,
    userCurrentLocation,
    userFavoriteStations,
    userVehicleFuel,
  };
};

export default useStationsViewModel;
