import {atoms as a} from '@core/layout';
import React, {FC, useRef} from 'react';
import RNMap from 'react-native-maps';

const IBERIA = {
  latitude: 40.0,
  longitude: -4.5,
  latitudeDelta: 10.0,
  longitudeDelta: 10.0,
} as const;

type Props = {};
const MapView: FC<Props> = () => {
  const mapRef = useRef<RNMap>(null);

  return (
    <RNMap
      ref={mapRef}
      style={[a.absolute, a.inset_0]}
      initialRegion={IBERIA}
    />
  );
};

export default MapView;
