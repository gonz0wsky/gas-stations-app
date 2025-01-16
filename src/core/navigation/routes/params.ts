import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FC} from 'react';

export type MainNavigatorParamList = {
  FuelSettings: undefined;
  MapSettings: undefined;
  Settings: undefined;
  StationRadiusSettings: undefined;
  Stations: undefined;
  ThemeSettings: undefined;
};

export type ModalNavigatorParamList = {};

export type AllNavigatorParamList = ModalNavigatorParamList &
  MainNavigatorParamList;

export type ScreenName = keyof AllNavigatorParamList;

export type ScreenComponent<S extends ScreenName> = FC<
  NativeStackScreenProps<AllNavigatorParamList, S>
>;
