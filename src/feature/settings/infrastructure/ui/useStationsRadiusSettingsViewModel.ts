import useStore from '@core/store';
import {useNavigation} from '@react-navigation/native';

const useStationRadiusViewModel = () => {
  const {canGoBack, goBack} = useNavigation();

  const kmToDisplay = useStore(state => state.kmToDisplay);
  const setKmToDisplay = useStore(state => state.setKmToDisplay);

  const handlePressBack = () => {
    canGoBack() && goBack();
  };

  const handlePressOption = (id: string) => {
    setKmToDisplay(parseInt(id, 10));

    canGoBack() && goBack();
  };

  return {
    handlePressBack,
    handlePressOption,
    kmToDisplay,
  };
};

export default useStationRadiusViewModel;
