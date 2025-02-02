import {atoms as a, useTheme} from '@core/layout';
import type {FC} from 'react';
import {View} from 'react-native';

const Spacer: FC = () => {
  const t = useTheme();
  return <View style={[t.atoms.spacer, a.h_2xs]} />;
};

export default Spacer;
