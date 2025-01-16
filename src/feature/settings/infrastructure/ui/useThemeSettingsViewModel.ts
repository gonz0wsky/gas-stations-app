import {SystemTheme} from '@core/layout/utils/useColorModeTheme';
import useStore from '@core/store';
import {useNavigation} from '@react-navigation/native';

const useThemeSettingsViewModel = () => {
  const {canGoBack, goBack} = useNavigation();

  const theme = useStore(state => state.theme);
  const setTheme = useStore(state => state.setTheme);

  const handlePressBack = () => {
    canGoBack() && goBack();
  };

  const handlePressOption = (id: string) => {
    setTheme(id as SystemTheme);

    canGoBack() && goBack();
  };

  return {
    handlePressBack,
    handlePressOption,
    theme,
  };
};

export default useThemeSettingsViewModel;
