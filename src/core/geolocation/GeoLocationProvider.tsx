import type {ReactNode} from 'react';
import {useState} from 'react';
import {createContext, useContext} from 'react';
import Geolocation from '@react-native-community/geolocation';

Geolocation.setRNConfiguration({
  authorizationLevel: 'whenInUse',
  enableBackgroundLocationUpdates: false,
  locationProvider: 'auto',
  skipPermissionRequests: false,
});

export type Location = {
  latitude: number;
  longitude: number;
};

const Context = createContext<{
  location: Location | null;
}>({
  location: null,
});

export const GeoLocationProvider = ({children}: {children: ReactNode}) => {
  const [location, setLocation] = useState<Location | null>(null);

  Geolocation.watchPosition(
    position => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    undefined,
    {
      distanceFilter: 1000, // 1 km
      enableHighAccuracy: true,
      maximumAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      timeout: 1000 * 60 * 10, // 10 minutes
      useSignificantChanges: true,
    },
  );

  return <Context.Provider value={{location}}>{children}</Context.Provider>;
};

export function useLocation() {
  return useContext(Context).location;
}
