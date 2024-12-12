import React from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import Home from '@feature/home';

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
    <Main.Screen name="Home" component={Home} />
  </>
);

const MainNavigator = () => {
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    animation: 'ios_from_left',
  } as const;

  return (
    <Main.Navigator initialRouteName="Home" screenOptions={screenOptions}>
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
