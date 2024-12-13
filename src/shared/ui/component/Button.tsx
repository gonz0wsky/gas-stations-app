import {atoms as a, useTheme} from '@core/layout/index';
import React, {FC} from 'react';
import {
  ActivityIndicator,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';

type Props = {
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => Promise<void> | void;
  size?: 'normal' | 'small';
  title: string;
  variant?: 'primary' | 'secondary' | 'error' | 'success';
} & Omit<RectButtonProps, 'onPress'>;

const Button: FC<Props> = ({
  disabled,
  loading,
  size = 'normal',
  style,
  title,
  variant = 'primary',
  ...rest
}) => {
  const t = useTheme();

  const buttonSize: Record<NonNullable<Props['size']>, ViewStyle[]> = {
    normal: [a.py_md],
    small: [a.py_xs],
  } as const;

  const buttonTextSize: Record<NonNullable<Props['size']>, TextStyle[]> = {
    normal: [a.font_body_one_medium],
    small: [a.font_caption],
  } as const;

  const handlePress = async () => {
    try {
      await rest?.onPress?.();
    } finally {
      // pass
    }
  };

  return (
    <View
      pointerEvents={loading || disabled ? 'none' : undefined}
      style={[
        style,
        t.atoms.btn.bg[variant],
        a.rounded_full,
        a.overflow_hidden,
        {opacity: disabled ? 0.4 : 1},
      ]}>
      <RectButton
        {...rest}
        style={[buttonSize[size], a.align_center, a.justify_center]}
        onPress={handlePress}>
        {loading ? (
          <ActivityIndicator color={t.atoms.btn.text[variant].color} />
        ) : (
          <Text style={[t.atoms.btn.text[variant], buttonTextSize[size]]}>
            {title}
          </Text>
        )}
      </RectButton>
    </View>
  );
};

export default Button;
