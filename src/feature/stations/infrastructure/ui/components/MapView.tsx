import {atoms as a} from '@core/layout';
import ServiceStation from '@feature/stations/domain/ServiceStationModel';
import React, {FC, useMemo} from 'react';
import RNMap, {
  Marker,
  MarkerPressEvent,
  Animated as AnimatedMap,
  AnimatedRegion,
  MapViewProps,
} from 'react-native-maps';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const IBERIA = {
  latitude: 40.0,
  longitude: -4.5,
  latitudeDelta: 10.0,
  longitudeDelta: 10.0,
} as const;

type Props = {
  mapStyle: MapViewProps['userInterfaceStyle'];
  bsSharedValue: SharedValue<number>;
  mapRef: React.RefObject<RNMap>;
  stations: ServiceStation[];
  onPressMarker: (id: MarkerPressEvent) => void;
};
const MapView: FC<Props> = ({
  bsSharedValue,
  mapRef,
  mapStyle,
  onPressMarker,
  stations,
}) => {
  const animatedRegion = new AnimatedRegion(IBERIA);

  const animatedStyle = useAnimatedStyle(() => ({
    height: `${interpolate(
      bsSharedValue.value,
      [0, 1, 2],
      [60.5, 40.5, 20.5],
    )}%`,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }));

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
    <Animated.View style={[animatedStyle, a.absolute, a.inset_0]}>
      <AnimatedMap
        ref={mapRef}
        region={animatedRegion}
        showsPointsOfInterest={false}
        style={[a.absolute, a.inset_0]}
        userInterfaceStyle={mapStyle}>
        {Markers}
      </AnimatedMap>
    </Animated.View>
  );
};

export default MapView;
