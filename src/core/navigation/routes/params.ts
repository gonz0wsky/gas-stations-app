import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {FC} from 'react';

export type MainNavigatorParamList = {
  MapSettings: undefined;
  Onboarding: undefined;
  Settings: undefined;
  StationDistanceSettings: undefined;
  Stations: undefined;
  ThemeSettings: undefined;
  UserVehicleFuelSettings: undefined;
};

export type ModalNavigatorParamList = {
  UpdateApp: undefined;
};

export type AllNavigatorParamList = ModalNavigatorParamList &
  MainNavigatorParamList;

export type ScreenName = keyof AllNavigatorParamList;

export type ScreenComponent<S extends ScreenName> = FC<
  NativeStackScreenProps<AllNavigatorParamList, S>
>;
