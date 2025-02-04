import {atoms as a, useTheme} from '@core/layout/index';
import type {FC} from 'react';
import React from 'react';
import type {TextStyle, ViewStyle} from 'react-native';
import {ActivityIndicator, Text, View} from 'react-native';
import type {RectButtonProps} from 'react-native-gesture-handler';
import {RectButton} from 'react-native-gesture-handler';

type Props = {
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => Promise<void> | void;
  size?: 'normal' | 'small';
  title: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
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

  const buttonStyles = {opacity: disabled ? 0.4 : 1};

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
        t.atoms.components.button.background[variant],
        a.rounded_full,
        a.overflow_hidden,
        buttonStyles,
      ]}>
      <RectButton
        {...rest}
        style={[buttonSize[size], a.align_center, a.justify_center]}
        onPress={handlePress}>
        {loading ? (
          <ActivityIndicator
            color={t.atoms.components.button.text[variant].color}
          />
        ) : (
          <Text
            style={[
              t.atoms.components.button.text[variant],
              buttonTextSize[size],
              a.mx_xl,
            ]}>
            {title}
          </Text>
        )}
      </RectButton>
    </View>
  );
};

export default Button;
