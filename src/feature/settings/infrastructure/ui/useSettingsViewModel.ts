import useStore from '@core/store';
import {useNavigation} from '@react-navigation/native';

const useSettingsViewModel = () => {
  const {canGoBack, goBack, navigate} = useNavigation();

  const mapStyle = useStore(state => state.mapStyle);
  const selectedTheme = useStore(state => state.theme);
  const kmToDisplay = useStore(state => state.kmToDisplay);
  const carFuel = useStore(state => state.fuel);
  const carTankLitres = useStore(state => state.tankLitres);
  const setCarTankLitres = useStore(state => state.setTankLitres);
  const carLitresPer100Km = useStore(state => state.litresPer100Km);
  const setLitresPer100Km = useStore(state => state.setLitresPer100Km);

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
  const handleOnChangeTankSize = (value: number) => {
    setCarTankLitres(value);
  };

  const handleOnChangeConsumption = (value: number) => {
    setLitresPer100Km(value);
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
    handleOnChangeConsumption,
    handleOnChangeTankSize,
    handlePressFuel,
    handlePressMapSettings,
    handlePressPrivacy,
    handlePressStationRadius,
    handlePressTheme,
    kmToDisplay,
    mapStyle,
    onPressBack,
    selectedTheme,
  };
};

export default useSettingsViewModel;
