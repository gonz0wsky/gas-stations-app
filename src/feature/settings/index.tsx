import React from 'react';
import {ScreenComponent} from '@core/navigation/routes/params';

import SettingsView from './infrastructure/ui/SettingsView';
import useSettingsViewModel from './infrastructure/ui/useSettingsViewModel';
import MapSettingsView from './infrastructure/ui/MapSettingsView';
import useMapSettingsViewModel from './infrastructure/ui/useMapSettingsViewModel';
import StationsRadiusSettingsView from './infrastructure/ui/StationsRadiusSettingsView';
import useStationsRadiusSettingsViewModel from './infrastructure/ui/useStationsRadiusSettingsViewModel';
import FuelSettingsView from './infrastructure/ui/FuelSettingsView';
import useFuelSettingsViewModel from './infrastructure/ui/useFuelSettingsViewModel';
import TankSettingsView from './infrastructure/ui/TankSettingsView';
import useTanSettingsViewModel from './infrastructure/ui/useTankSettingsViewModel';
import ConsumptionSettingsView from './infrastructure/ui/ConsumptionSettingsView';
import useConsumptionSettingsViewModel from './infrastructure/ui/useConsumptionSettingsViewModel';
import ThemeSettingsView from './infrastructure/ui/ThemeSettingsView';
import useThemeSettingsViewModel from './infrastructure/ui/useThemeSettingsViewModel';

const SettingsScreen: ScreenComponent<'Settings'> = () => (
  <SettingsView {...useSettingsViewModel()} />
);

const MapSettingsScreen: ScreenComponent<'MapSettings'> = () => (
  <MapSettingsView {...useMapSettingsViewModel()} />
);

const StationsRadiusSettingsScreen: ScreenComponent<
  'StationRadiusSettings'
> = () => (
  <StationsRadiusSettingsView {...useStationsRadiusSettingsViewModel()} />
);

const FuelSettingsScreen: ScreenComponent<'FuelSettings'> = () => (
  <FuelSettingsView {...useFuelSettingsViewModel()} />
);

const TankSettingsScreen: ScreenComponent<'TankSettings'> = () => (
  <TankSettingsView {...useTanSettingsViewModel()} />
);

const ConsumptionSettingsScreen: ScreenComponent<
  'ConsumptionSettings'
> = () => <ConsumptionSettingsView {...useConsumptionSettingsViewModel()} />;

const ThemeSettingsScreen: ScreenComponent<'ThemeSettings'> = () => (
  <ThemeSettingsView {...useThemeSettingsViewModel()} />
);

export {
  SettingsScreen,
  MapSettingsScreen,
  StationsRadiusSettingsScreen,
  FuelSettingsScreen,
  TankSettingsScreen,
  ConsumptionSettingsScreen,
  ThemeSettingsScreen,
};
