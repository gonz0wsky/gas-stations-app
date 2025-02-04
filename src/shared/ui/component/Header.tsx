import React from 'react';
import {atoms as a, useSafeArea, useTheme} from '@core/layout/index';
import type {IconName} from './Icon/types';
import type {FC, ReactNode} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';

import CircularButton from './CircularButton';

type Props = {
  customRightIcon?: ReactNode;
  isModal?: boolean;
  leftIcon?: IconName;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  position?: 'absolute' | 'relative';
  rightIcon?: IconName;
  style?: StyleProp<ViewStyle>;
  title?: string;
  transparent?: boolean;
};

const Header: FC<Props> = ({
  customRightIcon,
  isModal,
  leftIcon,
  onPressLeft,
  onPressRight,
  position = 'relative',
  rightIcon,
  style,
  title,
  transparent,
}) => {
  const t = useTheme();
  const safe = useSafeArea();

  return (
    <View
      pointerEvents="box-none"
      style={[
        transparent ? undefined : t.atoms.background.secondary,
        a.absolute,
        a.align_center,
        a.flex_row,
        a.justify_between,
        a.px_lg,
        a.pb_md,
        a.top_0,
        a.w_full,
        a.z_50,
        {position},
        isModal
          ? a.pt_md
          : {paddingTop: Math.max(safe.top, a.pt_md.paddingTop)},
        style,
      ]}>
      <View style={styles.buttonContainer}>
        {leftIcon ? (
          <CircularButton icon={leftIcon} onPress={onPressLeft} />
        ) : null}
      </View>
      {!!title && (
        <View>
          <Text style={[t.atoms.text.secondary, a.font_body_one]}>{title}</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        {rightIcon ? (
          <CircularButton icon={rightIcon} onPress={onPressRight} />
        ) : null}
        {customRightIcon}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {minWidth: 36, aspectRatio: 1},
});

export default Header;
