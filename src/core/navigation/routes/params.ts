import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FC} from 'react';

export type MainNavigatorParamList = {
  ConsumptionSettings: undefined;
  FuelSettings: undefined;
  MapSettings: undefined;
  Settings: undefined;
  StationRadiusSettings: undefined;
  Stations: undefined;
  TankSettings: undefined;
  ThemeSettings: undefined;
};

export type ModalNavigatorParamList = {};

export type AllNavigatorParamList = ModalNavigatorParamList &
  MainNavigatorParamList;

export type ScreenName = keyof AllNavigatorParamList;

export type ScreenComponent<S extends ScreenName> = FC<
  NativeStackScreenProps<AllNavigatorParamList, S>
>;
