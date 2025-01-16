import useStore from '@core/store';
import {useNavigation} from '@react-navigation/native';

const useSettingsViewModel = () => {
  const {canGoBack, goBack, navigate} = useNavigation();

  const mapStyle = useStore(state => state.mapStyle);
  const selectedTheme = useStore(state => state.theme);
  const kmToDisplay = useStore(state => state.kmToDisplay);
  const carFuel = useStore(state => state.fuel);
  const carTankLitres = useStore(state => state.tankLitres);
  const carLitresPer100Km = useStore(state => state.litresPer100Km);

  const onPressBack = () => {
    canGoBack() && goBack();
  };

  const handlePressMapSettings = () => {
    navigate('MapSettings');
  };

  return {
    carFuel,
    carLitresPer100Km,
    carTankLitres,
    handlePressMapSettings,
    kmToDisplay,
    mapStyle,
    onPressBack,
    selectedTheme,
  };
};

export default useSettingsViewModel;
