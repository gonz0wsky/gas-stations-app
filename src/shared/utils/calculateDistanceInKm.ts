type Location = {
  latitude: number;
  longitude: number;
};

export const calculateDistanceInKm = (
  loc1: Location,
  loc2: Location,
): number => {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const R = 6371;
  const lat1 = toRadians(loc1.latitude);
  const lat2 = toRadians(loc2.latitude);
  const deltaLat = toRadians(loc2.latitude - loc1.latitude);
  const deltaLon = toRadians(loc2.longitude - loc1.longitude);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const result = R * c;

  const withTwhoDecimals = Math.floor(result * 100) / 100;

  return withTwhoDecimals;
};
