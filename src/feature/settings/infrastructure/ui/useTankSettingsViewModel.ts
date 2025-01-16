import useStore from '@core/store';
import {useNavigation} from '@react-navigation/native';

const useTankSettingsViewModel = () => {
  const {canGoBack, goBack} = useNavigation();

  const tankLitres = useStore(state => state.tankLitres);
  const setTankLitres = useStore(state => state.setTankLitres);

  const handlePressBack = () => {
    canGoBack() && goBack();
  };

  const handlePressOption = (id: string) => {
    setTankLitres(parseInt(id, 10));

    canGoBack() && goBack();
  };

  return {
    tankLitres,
    handlePressBack,
    handlePressOption,
  };
};

export default useTankSettingsViewModel;
