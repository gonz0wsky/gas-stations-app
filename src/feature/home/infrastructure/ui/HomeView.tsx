import React, {FC} from 'react';
import {Text, View} from 'react-native';
import type HomeViewModel from './useHomeViewModel';
import {atoms as a} from '@core/layout';
import Map from './ui/Map';
import Modal from './ui/Modal';

const HomeView: FC<ReturnType<typeof HomeViewModel>> = ({t}) => (
  <View style={[a.flex_1]}>
    <Map style={[a.absolute, a.inset_0]} />
    <Modal t={t} initialPosition={0} positions={[20, 40, 90]}>
      <Text>Modal</Text>
    </Modal>
  </View>
);

export default HomeView;
