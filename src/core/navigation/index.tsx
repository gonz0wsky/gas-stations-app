import React from 'react';
import type {LinkingOptions} from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import type {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {StationsView} from '@feature/stations/infrastructure/ui/StationsView';
import {SettingsView} from '@feature/settings/infrastructure/ui/SettingsView';
import {MapSettingsView} from '@feature/settings/infrastructure/ui/Map/MapSettingsView';
import {StationDistanceSettingsView} from '@feature/settings/infrastructure/ui/StationsDistance/StationsDistanceSettingsView';
import {UserVehicleFuelSettingsView} from '@feature/settings/infrastructure/ui/UserVehicleFuel/UserVehicleFuelSettingsView';
import {ThemeSettingsView} from '@feature/settings/infrastructure/ui/Theme/ThemeSettingsView';
import {OnboardingView} from '@feature/onboarding/infrastructure/OnboardingView';

import type {
  AllNavigatorParamList,
  MainNavigatorParamList,
} from './routes/params';
import {useStore} from '@core/store';

const Main = createNativeStackNavigator<MainNavigatorParamList>();

const MainNavigatorScreens = () => (
  <>
    <Main.Screen name="Stations" component={StationsView} />
    <Main.Screen name="Settings" component={SettingsView} />
    <Main.Screen name="MapSettings" component={MapSettingsView} />
    <Main.Screen
      name="StationDistanceSettings"
      component={StationDistanceSettingsView}
    />
    <Main.Screen
      name="UserVehicleFuelSettings"
      component={UserVehicleFuelSettingsView}
    />
    <Main.Screen name="ThemeSettings" component={ThemeSettingsView} />
  </>
);

const MainNavigator = () => {
  const onboardingCompleted = useStore(state => state.onboardingCompleted);

  const initialRouteName = onboardingCompleted ? 'Stations' : 'Onboarding';

  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: 'ios_from_right',
  } as const;

  return (
    <Main.Navigator
      initialRouteName={initialRouteName}
      screenOptions={screenOptions}>
      {!onboardingCompleted && (
        <Main.Screen name="Onboarding" component={OnboardingView} />
      )}
      {MainNavigatorScreens()}
    </Main.Navigator>
  );
};

export const Navigator = () => {
  const linking: LinkingOptions<AllNavigatorParamList> = {
    prefixes: [],
  };

  return (
    <NavigationContainer linking={linking}>
      <MainNavigator />
    </NavigationContainer>
  );
};
