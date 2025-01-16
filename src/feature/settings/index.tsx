import React from 'react';
import {ScreenComponent} from '@core/navigation/routes/params';

import SettingsView from './infrastructure/ui/SettingsView';
import useSettingsViewModel from './infrastructure/ui/useSettingsViewModel';
import MapSettingsView from './infrastructure/ui/MapSettingsView';
import useMapSettingsViewModel from './infrastructure/ui/useMapSettingsViewModel';

const SettingsScreen: ScreenComponent<'Settings'> = () => (
  <SettingsView {...useSettingsViewModel()} />
);

const MapSettingsScreen: ScreenComponent<'MapSettings'> = () => (
  <MapSettingsView {...useMapSettingsViewModel()} />
);

export {SettingsScreen, MapSettingsScreen};
