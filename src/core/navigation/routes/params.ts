import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FC} from 'react';

export type MainNavigatorParamList = {
  Settings: undefined;
  Stations: undefined;
};

export type ModalNavigatorParamList = {};

export type AllNavigatorParamList = ModalNavigatorParamList &
  MainNavigatorParamList;

export type ScreenName = keyof AllNavigatorParamList;

export type ScreenComponent<S extends ScreenName> = FC<
  NativeStackScreenProps<AllNavigatorParamList, S>
>;
