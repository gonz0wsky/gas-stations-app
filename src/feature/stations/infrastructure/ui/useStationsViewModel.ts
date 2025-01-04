import {useTheme, useWindow} from '@core/layout';
import BottomSheet from '@gorhom/bottom-sheet';
import {useLingui} from '@lingui/react';
import {useRef} from 'react';
import useServiceStationsQuery from '../hooks/useServiceStationsQuery';

const useStationsViewModel = () => {
  const {i18n} = useLingui();
  const t = useTheme();
  const w = useWindow();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const {data} = useServiceStationsQuery();

  console.log('data', data?.length);

  return {
    bottomSheetRef,
    i18n,
    t,
    w,
  };
};

export default useStationsViewModel;
