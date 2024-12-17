import {useTheme} from '@core/layout';
import {useLingui} from '@lingui/react';

const useHomeViewModel = () => {
  const {i18n} = useLingui();
  const t = useTheme();

  return {
    i18n,
    t,
  };
};

export default useHomeViewModel;
