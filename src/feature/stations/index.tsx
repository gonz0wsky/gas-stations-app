import React from 'react';
import {ScreenComponent} from '@core/navigation/routes/params';
import StationsView from './infrastructure/ui/StationsView';
import useStationsViewModel from './infrastructure/ui/useStationsViewModel';

const Stations: ScreenComponent<'Stations'> = () => (
  <StationsView {...useStationsViewModel()} />
);

export {Stations as StationsScreen};
