import {useTheme} from '@core/layout';
import useStore from '@core/store';
import {useNavigation} from '@react-navigation/native';

const useSettingsViewModel = () => {
  const {canGoBack, goBack} = useNavigation();
  const t = useTheme();

  const selectedTheme = useStore(state => state.theme);

  const onPressBack = () => {
    canGoBack() && goBack();
  };

  return {
    onPressBack,
    selectedTheme,
    t,
  };
};

export default useSettingsViewModel;
