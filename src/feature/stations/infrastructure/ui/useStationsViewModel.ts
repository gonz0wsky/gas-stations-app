import {useTheme, useWindow} from '@core/layout';
import BottomSheet from '@gorhom/bottom-sheet';
import {useLingui} from '@lingui/react';
import {useRef} from 'react';
import useServiceStationsQuery from '../hooks/useServiceStationsQuery';
import {useNavigation} from '@react-navigation/native';

const useStationsViewModel = () => {
  const {navigate} = useNavigation();
  const {i18n} = useLingui();
  const t = useTheme();
  const w = useWindow();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const {data: serviceStationsList} = useServiceStationsQuery();

  const handlePressSettings = () => {
    navigate('Settings');
  };

  return {
    bottomSheetRef,
    handlePressSettings,
    i18n,
    serviceStationsList,
    t,
    w,
  };
};

export default useStationsViewModel;
