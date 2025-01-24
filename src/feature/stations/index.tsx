import React from 'react';
import {ScreenComponent} from '@core/navigation/routes/params';
import StationsView from './infrastructure/ui/StationsView';

const StationsScreen: ScreenComponent<'Stations'> = () => <StationsView />;

export {StationsScreen};
