import React from 'react';
import {ScreenComponent} from '@core/navigation/routes/params';
import HomeView from './infrastructure/ui/HomeView';
import useHomeViewModel from './infrastructure/ui/useHomeViewModel';

const Home: ScreenComponent<'Home'> = () => (
  <HomeView {...useHomeViewModel()} />
);

export default Home;
