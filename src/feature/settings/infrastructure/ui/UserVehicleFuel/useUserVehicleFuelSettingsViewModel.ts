import {useStore} from '@core/store';
import ServiceStationProducts from '@feature/stations/domain/ServiceStationProductsModel';
import {useNavigation} from '@react-navigation/native';

export const useUserVehicleFuelSettingsViewModel = () => {
  const {canGoBack, goBack} = useNavigation();

  const fuel = useStore(state => state.fuel);
  const setFuel = useStore(state => state.setFuel);

  const handlePressBack = () => {
    canGoBack() && goBack();
  };

  const handlePressOption = (id: string) => {
    setFuel(id as keyof ServiceStationProducts);

    canGoBack() && goBack();
  };

  return {
    fuel,
    handlePressBack,
    handlePressOption,
  };
};
