import {useNavigation} from '@react-navigation/native';

const useSettingsViewModel = () => {
  const {canGoBack, goBack} = useNavigation();

  const onPressBack = () => {
    canGoBack() && goBack();
  };

  return {
    onPressBack,
  };
};

export default useSettingsViewModel;
