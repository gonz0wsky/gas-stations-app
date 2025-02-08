import type RNMap from 'react-native-maps';

export const animateMapToPosition = (
  mapRef: React.RefObject<RNMap>,
  type: 'poi' | 'region',
  latitude: number,
  longitude: number,
) => {
  const deltas: Record<
    string,
    {latitudeDelta: number; longitudeDelta: number}
  > = {
    poi: {
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    region: {
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    },
  } as const;

  mapRef.current?.animateToRegion({
    latitude,
    longitude,
    ...deltas[type],
  });
};
