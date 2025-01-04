import React from 'react';
import {ScreenComponent} from '@core/navigation/routes/params';
import StationsView from './infrastructure/ui/HomeView';
import useStationsViewModel from './infrastructure/ui/useStationsViewModel';

const Stations: ScreenComponent<'Stations'> = () => (
  <StationsView {...useStationsViewModel()} />
);

export default Stations;
