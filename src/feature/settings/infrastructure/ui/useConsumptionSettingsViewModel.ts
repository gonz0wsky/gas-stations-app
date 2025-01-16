import useStore from '@core/store';
import {useNavigation} from '@react-navigation/native';

const useConsumptionSettingsViewModel = () => {
  const {canGoBack, goBack} = useNavigation();

  const litresPer100Km = useStore(state => state.litresPer100Km);
  const setLitresPer100Km = useStore(state => state.setLitresPer100Km);

  const handlePressBack = () => {
    canGoBack() && goBack();
  };

  const handlePressOption = (id: string) => {
    setLitresPer100Km(parseInt(id, 10));

    canGoBack() && goBack();
  };

  return {
    litresPer100Km,
    handlePressBack,
    handlePressOption,
  };
};

export default useConsumptionSettingsViewModel;
