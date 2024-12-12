import {atoms as a} from '@core/layout/atoms';
import {useTheme} from '@core/layout/index';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const GestureProvider = ({children}: {children: React.ReactNode}) => {
  const t = useTheme();

  return (
    <GestureHandlerRootView style={[a.flex_1, t.atoms.bg.primary]}>
      {children}
    </GestureHandlerRootView>
  );
};

export default GestureProvider;
