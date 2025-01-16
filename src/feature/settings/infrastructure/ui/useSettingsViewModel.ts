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

  const handlePressStationRadius = () => {
    navigate('StationRadiusSettings');
  };

  const handlePressFuel = () => {
    navigate('FuelSettings');
  };
  const handlePressTankSize = () => {
    navigate('TankSettings');
  };

  const handlePressConsuption = () => {
    navigate('ConsumptionSettings');
  };
  const handlePressTheme = () => {
    navigate('ThemeSettings');
  };
  const handlePressPrivacy = () => {
    console.log('handle press privacy');
  };

  return {
    carFuel,
    carLitresPer100Km,
    carTankLitres,
    handlePressConsuption,
    handlePressFuel,
    handlePressMapSettings,
    handlePressPrivacy,
    handlePressStationRadius,
    handlePressTankSize,
    handlePressTheme,
    kmToDisplay,
    mapStyle,
    onPressBack,
    selectedTheme,
  };
};

export default useSettingsViewModel;
