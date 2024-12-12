import React from 'react';
import HomeView from '@feature/home/HomeView';

const InnerApp = () => {
  return <HomeView />;
};

const App = () => {
  return <InnerApp />;
};

export default App;
