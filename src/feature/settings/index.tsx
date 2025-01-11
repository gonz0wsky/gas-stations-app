import React from 'react';
import {ScreenComponent} from '@core/navigation/routes/params';
import SettingsView from './infrastructure/ui/SettingsView';
import useSettingsViewModel from './infrastructure/ui/useSettingsViewModel';

const Settings: ScreenComponent<'Settings'> = () => (
  <SettingsView {...useSettingsViewModel()} />
);

export {Settings as SettingsScreen};
