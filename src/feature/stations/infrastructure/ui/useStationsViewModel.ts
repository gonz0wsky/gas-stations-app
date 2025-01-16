import BottomSheet from '@gorhom/bottom-sheet';
import {useEffect, useRef, useState} from 'react';
import useServiceStationsQuery from '../api/useServiceStationsQuery';
import {useNavigation} from '@react-navigation/native';
import useLocation from '../api/useLocation';
import useStationFilter from './hooks/useStationsFilter';
import ServiceStation from '@feature/stations/domain/ServiceStationModel';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import useStore from '@core/store';
import RNMap, {MarkerPressEvent} from 'react-native-maps';

const useStationsViewModel = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const horizontalViewRef = useRef<ScrollView>(null);
  const mapRef = useRef<RNMap>(null);

  const {navigate} = useNavigation();
  const {currentLocation} = useLocation();
  const {data: serviceStationsList} = useServiceStationsQuery();

  const {
    filter,
    filteredStations,
    handlePressFilter,
    mapStations,
    userFavoriteStations,
  } = useStationFilter(serviceStationsList ?? [], currentLocation);

  const permuteUserFavorite = useStore(state => state.permuteFavorite);
  const userCurrentLocation = useStore(state => state.currentLocation);
  const userVehicleFuel = useStore(state => state.fuel);

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
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
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
    const station = mapStations.find(s => s.id === event.nativeEvent.id);

    setSelectedStation(station ?? null);
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
    handlePressMarker,
    handlePressSettings,
    horizontalViewRef,
    mapRef,
    mapStations,
    selectedStation,
    userCurrentLocation,
    userFavoriteStations,
    userVehicleFuel,
  };
};

export default useStationsViewModel;
