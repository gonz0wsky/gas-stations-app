import {atoms as a, useWindow} from '@core/layout';
import {Theme} from '@core/layout/themes';
import React, {ComponentProps, FC} from 'react';
import {View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  clamp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type DragZoneProps = {
  t: Theme;
  gesture: ComponentProps<typeof GestureDetector>['gesture'];
};

const DragZone: FC<DragZoneProps> = ({t, gesture}) => (
  <GestureDetector gesture={gesture}>
    <View
      style={[a.justify_center, a.align_center, a.rounded_full, {height: 20}]}>
      <View
        style={[
          a.rounded_full,
          t.atoms.modal.drag.primary,
          {height: 5, width: 80},
        ]}
      />
    </View>
  </GestureDetector>
);

type Props = {
  children: React.ReactNode;
  initialPosition: number;
  positions: number[];
  t: Theme;
};

const Modal: FC<Props> = ({children, initialPosition, positions, t}) => {
  const {height} = useWindow();

  /**
   * Modal percentage respect to the top of the screen
   * 0 means the modal is full open
   * 100 means the modal is full closed
   */
  const percentage = useSharedValue(positions[initialPosition]);

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      const movementPercentage = Math.round((e.absoluteY / height) * 100);

      percentage.value = clamp(
        movementPercentage,
        positions[0],
        positions[positions.length - 1],
      );
    })
    .onFinalize(e => {
      const movementPercentage = Math.round((e.absoluteY / height) * 100);

      const closestPosition = positions.reduce((closest, num) =>
        Math.abs(num - movementPercentage) <
        Math.abs(closest - movementPercentage)
          ? num
          : closest,
      );

      percentage.value = withTiming(closestPosition, {duration: 250});
    });

  const animatedStyle = useAnimatedStyle(() => ({
    top: `${percentage.value}%`,
  }));

  return (
    <Animated.View
      style={[
        t.atoms.modal.bg.primary,
        a.absolute,
        a.inset_0,
        {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        animatedStyle,
      ]}>
      <DragZone t={t} gesture={panGesture} />
      {children}
    </Animated.View>
  );
};

export default Modal;
