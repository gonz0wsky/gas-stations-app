import {Linking, Platform} from 'react-native';

export const openExternalMaps = (latitude: number, longitude: number) => {
  const location = `${latitude},${longitude}`;

  const url = Platform.select({
    ios: `https://maps.apple.com/?q=${location}`,
    android: `geo:${location}?q=${location}`,
    default: `https://www.google.com/maps/search/?api=1&query=${location}`,
  });

  Linking.openURL(url).catch(err =>
    console.error('Error occurred opening external maps', err),
  );
};
