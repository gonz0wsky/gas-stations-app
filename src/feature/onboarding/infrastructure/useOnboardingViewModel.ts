import {useWindow} from '@core/layout';
import {useStore} from '@core/store';
import {useNavigation} from '@react-navigation/native';
import {useCallback, useRef} from 'react';
import type {ScrollView} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const useOnboardingViewModel = () => {
  const {navigate} = useNavigation();
  const w = useWindow();

  const currentScreen = useRef<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const userFuel = useStore(state => state.fuel);
  const setOnboardingCompleted = useStore(
    state => state.setOnboardingCompleted,
  );

  const handlePressProductChange = useCallback(() => {
    navigate('UserVehicleFuelSettings');
  }, [navigate]);

  const scrollToNextScreen = useCallback(
    (position: number) => {
      scrollViewRef.current?.scrollTo({x: w.width * position, animated: true});
    },
    [w.width],
  );

  const handlePressNext = useCallback(() => {
    const current = currentScreen.current;
    console.log(current);

    switch (current) {
      case 0:
        scrollToNextScreen(1);
        break;

      case 1:
        Geolocation.requestAuthorization(
          () => {
            scrollToNextScreen(2);
          },
          () => {
            scrollToNextScreen(2);
          },
        );
        break;

      default:
        setOnboardingCompleted(true);
        break;
    }

    currentScreen.current += 1;
  }, [scrollToNextScreen, setOnboardingCompleted]);

  return {
    userFuel,
    handlePressProductChange,
    scrollViewRef,
    handlePressNext,
  };
};
