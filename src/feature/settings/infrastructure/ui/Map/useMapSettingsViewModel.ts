import useStore from '@core/store';
import {useNavigation} from '@react-navigation/native';

export const useMapSettingsViewModel = () => {
  const {canGoBack, goBack} = useNavigation();

  const mapStyle = useStore(state => state.mapStyle);
  const setMapStyle = useStore(state => state.setMapStyle);

  const handlePressBack = () => {
    canGoBack() && goBack();
  };

  const handlePressOption = (id: string) => {
    setMapStyle(id as typeof mapStyle);

    canGoBack() && goBack();
  };

  return {
    handlePressBack,
    handlePressOption,
    mapStyle,
  };
};
