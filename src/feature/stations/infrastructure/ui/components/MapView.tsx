import React, {FC} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import RNMap from 'react-native-maps';

type Props = {
  style?: StyleProp<ViewStyle>;
};
const MapView: FC<Props> = ({style}) => (
  <RNMap
    style={style}
    initialRegion={{
      latitude: 37.386052,
      longitude: -5.984458,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />
);

export default MapView;
