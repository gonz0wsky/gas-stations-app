import {useTheme} from '@core/layout';
import {useLingui} from '@lingui/react';
import {useNavigation} from '@react-navigation/native';

const useSettingsViewModel = () => {
  const {canGoBack, goBack} = useNavigation();
  const {i18n} = useLingui();
  const t = useTheme();

  const onPressBack = () => {
    canGoBack() && goBack();
  };

  return {
    i18n,
    onPressBack,
    t,
  };
};

export default useSettingsViewModel;
