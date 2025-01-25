import React from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {StationsView} from '@feature/stations/infrastructure/ui/StationsView';
import {SettingsView} from '@feature/settings/infrastructure/ui/SettingsView';
import {MapSettingsView} from '@feature/settings/infrastructure/ui/Map/MapSettingsView';
import {StationDistanceSettingsView} from '@feature/settings/infrastructure/ui/StationsDistance/StationsDistanceSettingsView';
import {UserVehicleFuelSettingsView} from '@feature/settings/infrastructure/ui/UserVehicleFuel/UserVehicleFuelSettingsView';
import {ThemeSettingsView} from '@feature/settings/infrastructure/ui/Theme/ThemeSettingsView';

import {
  AllNavigatorParamList,
  MainNavigatorParamList,
  ModalNavigatorParamList,
} from './routes/params';

const Main = createNativeStackNavigator<MainNavigatorParamList>();
const Modal = createNativeStackNavigator<ModalNavigatorParamList>();

const ModalNavigator = () => {
  const screenOptions: NativeStackNavigationOptions = {
    animation: 'slide_from_bottom',
    presentation: 'modal',
  } as const;

  return (
    <Modal.Group screenOptions={screenOptions}>
      <></>
    </Modal.Group>
  );
};

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
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: 'ios_from_right',
  } as const;

  return (
    <Main.Navigator initialRouteName="Stations" screenOptions={screenOptions}>
      {MainNavigatorScreens()}
      {ModalNavigator()}
    </Main.Navigator>
  );
};

const Navigator = () => {
  const linking: LinkingOptions<AllNavigatorParamList> = {
    prefixes: [],
  };

  return (
    <NavigationContainer linking={linking}>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default Navigator;
