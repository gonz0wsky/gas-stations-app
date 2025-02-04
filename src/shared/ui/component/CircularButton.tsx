import {atoms as a, useTheme} from '@core/layout/index';
import Icon from './Icon';
import type {IconName} from './Icon/types';
import type {FC} from 'react';
import {View} from 'react-native';
import type {BorderlessButtonProps} from 'react-native-gesture-handler';
import {BorderlessButton} from 'react-native-gesture-handler';

type Props = {
  icon: IconName;
  size?: number;
  variant?: 'primary' | 'secondary' | 'tertiary';
} & BorderlessButtonProps;

const CircularButton: FC<Props> = ({
  icon,
  variant = 'primary',
  size = 36,
  style,
  ...rest
}) => {
  const t = useTheme();

  return (
    <View
      style={[
        style,
        t.atoms.components.circular_button.background[variant],
        a.rounded_full,
        a.overflow_hidden,
      ]}>
      <BorderlessButton
        style={[{height: size, width: size}, a.align_center, a.justify_center]}
        {...rest}>
        <Icon
          name={icon}
          color={t.atoms.components.circular_button.icon[variant].color}
        />
      </BorderlessButton>
    </View>
  );
};

export default CircularButton;
