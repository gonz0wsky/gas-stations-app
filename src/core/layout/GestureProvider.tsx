import {atoms as a} from '@core/layout/atoms';
import {useTheme} from '@core/layout/index';
import type {ReactNode} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const GestureProvider = ({children}: {children: ReactNode}) => {
  const t = useTheme();

  return (
    <GestureHandlerRootView style={[a.flex_1, t.atoms.background.primary]}>
      {children}
    </GestureHandlerRootView>
  );
};
