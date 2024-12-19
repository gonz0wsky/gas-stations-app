import {useTheme, useWindow} from '@core/layout';
import BottomSheet from '@gorhom/bottom-sheet';
import {useLingui} from '@lingui/react';
import {useRef} from 'react';

const useHomeViewModel = () => {
  const {i18n} = useLingui();
  const t = useTheme();
  const w = useWindow();

  const bottomSheetRef = useRef<BottomSheet>(null);

  return {
    bottomSheetRef,
    i18n,
    t,
    w,
  };
};

export default useHomeViewModel;
