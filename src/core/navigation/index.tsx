import React from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {StationsScreen} from '@feature/stations';
import {
  SettingsScreen,
  MapSettingsScreen,
  StationsRadiusSettingsScreen,
  FuelSettingsScreen,
  TankSettingsScreen,
  ConsumptionSettingsScreen,
  ThemeSettingsScreen,
} from '@feature/settings';

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
    <Main.Screen name="Stations" component={StationsScreen} />
    <Main.Screen name="Settings" component={SettingsScreen} />
    <Main.Screen name="MapSettings" component={MapSettingsScreen} />
    <Main.Screen
      name="StationRadiusSettings"
      component={StationsRadiusSettingsScreen}
    />
    <Main.Screen name="FuelSettings" component={FuelSettingsScreen} />
    <Main.Screen name="TankSettings" component={TankSettingsScreen} />
    <Main.Screen
      name="ConsumptionSettings"
      component={ConsumptionSettingsScreen}
    />
    <Main.Screen name="ThemeSettings" component={ThemeSettingsScreen} />
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
