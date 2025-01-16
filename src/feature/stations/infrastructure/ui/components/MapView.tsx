import {atoms as a} from '@core/layout';
import ServiceStation from '@feature/stations/domain/ServiceStationModel';
import React, {FC, useMemo} from 'react';
import RNMap, {Marker, MarkerPressEvent} from 'react-native-maps';

const IBERIA = {
  latitude: 40.0,
  longitude: -4.5,
  latitudeDelta: 10.0,
  longitudeDelta: 10.0,
} as const;

type Props = {
  mapRef: React.RefObject<RNMap>;
  stations: ServiceStation[];
  onPressMarker: (id: MarkerPressEvent) => void;
};
const MapView: FC<Props> = ({mapRef, stations, onPressMarker}) => {
  const Markers = useMemo(
    () =>
      stations.map(station => (
        <Marker
          id={station.id}
          identifier={station.id}
          onPress={onPressMarker}
          key={station.id}
          title={station.name}
          coordinate={{
            latitude: station.position.latitude,
            longitude: station.position.longitude,
          }}
        />
      )),
    [onPressMarker, stations],
  );

  return (
    <RNMap ref={mapRef} style={[a.absolute, a.inset_0]} initialRegion={IBERIA}>
      {Markers}
    </RNMap>
  );
};

export default MapView;
