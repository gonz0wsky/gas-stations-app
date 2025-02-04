import {atoms as a, useTheme} from '@core/layout';
import type {MapPoi} from '@feature/stations/domain/MapPoiModel';
import type {FC} from 'react';
import React, {useMemo} from 'react';
import type {MarkerPressEvent, MapViewProps} from 'react-native-maps';
import type RNMap from 'react-native-maps';
import {
  Marker,
  Animated as AnimatedMap,
  AnimatedRegion,
} from 'react-native-maps';
import type {SharedValue} from 'react-native-reanimated';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

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
  poiList: MapPoi[];
  onPressMarker: (id: MarkerPressEvent) => void;
};

export const MapView: FC<Props> = ({
  bsSharedValue,
  mapRef,
  mapStyle,
  onPressMarker,
  poiList,
}) => {
  const t = useTheme();

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
      poiList.map(poi => {
        const pinColor = poi.isFavorite
          ? t.atoms.components.map.marker.favorite
          : t.atoms.components.map.marker.price[poi.priceLevel];

        return (
          <Marker
            pinColor={pinColor.color}
            id={poi.id}
            identifier={poi.id}
            onPress={onPressMarker}
            key={poi.id}
            title={poi.name}
            coordinate={poi.location}
          />
        );
      }),
    [
      onPressMarker,
      poiList,
      t.atoms.components.map.marker.favorite,
      t.atoms.components.map.marker.price,
    ],
  );

  return (
    <Animated.View style={[animatedStyle, a.absolute, a.inset_0]}>
      <AnimatedMap
        ref={mapRef}
        region={animatedRegion}
        showsBuildings={false}
        showsPointsOfInterest={false}
        showsUserLocation
        style={[a.absolute, a.inset_0]}
        userInterfaceStyle={mapStyle}>
        {Markers}
      </AnimatedMap>
    </Animated.View>
  );
};
