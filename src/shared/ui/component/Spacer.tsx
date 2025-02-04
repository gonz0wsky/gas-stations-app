import {atoms, useTheme} from '@core/layout';
import type {FC} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {View} from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
  variant?: 'primary' | 'secondary' | 'tertiary';
};

const Spacer: FC<Props> = ({variant = 'primary', style}) => {
  const t = useTheme();
  return (
    <View style={[t.atoms.components.spacer[variant], atoms.h_2xs, style]} />
  );
};

export default Spacer;
