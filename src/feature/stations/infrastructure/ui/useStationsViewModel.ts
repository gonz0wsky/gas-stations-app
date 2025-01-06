import BottomSheet from '@gorhom/bottom-sheet';
import {useLingui} from '@lingui/react';
import {useRef} from 'react';
import useServiceStationsQuery from '../api/useServiceStationsQuery';
import {useNavigation} from '@react-navigation/native';
import useLocation from '../api/useLocation';
import {emitEvent} from '@core/events';
import useStationFilter from './hooks/useStationsFilter';

export type FilterOptions = 'price' | 'near' | 'favorites';

const useStationsViewModel = () => {
  const {navigate} = useNavigation();
  const {i18n} = useLingui();

  const {currentLocation} = useLocation();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const {data: serviceStationsList} = useServiceStationsQuery();

  const {filter, filteredStations, handlePressFilter} = useStationFilter(
    serviceStationsList ?? [],
    currentLocation,
  );

  const handlePressSettings = () => {
    navigate('Settings');
  };

  const handlePressCard = (id: string) => {
    const station = serviceStationsList?.find(station => station.id === id);

    emitEvent('map-change-location', station?.position);
  };

  return {
    bottomSheetRef,
    filter,
    filteredStations,
    handlePressCard,
    handlePressFilter,
    handlePressSettings,
    i18n,
  };
};

export default useStationsViewModel;
