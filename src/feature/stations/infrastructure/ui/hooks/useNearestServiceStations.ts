import {useLocation} from '@core/geolocation/GeoLocationProvider';
import {useStore} from '@core/store';
import type {ServiceStation} from '@feature/stations/domain/ServiceStationModel';
import {calculateDistanceInKm} from '@shared/utils/calculateDistanceInKm';
import {useMemo} from 'react';

export const useNearestServiceStations = (
  stationsList: Array<ServiceStation> = [],
) => {
  const deviceLocation = useLocation();

  const favoriteProduct = useStore(state => state.fuel);
  const kmToDisplay = useStore(state => state.kmToDisplay);

  return useMemo(() => {
    if (!deviceLocation) {
      return [];
    }

    return [...stationsList]
      .filter(station => station.products[favoriteProduct] !== null)
      .filter(
        station =>
          calculateDistanceInKm(deviceLocation, station.position) <=
          kmToDisplay,
      )
      .sort(
        (a, b) =>
          calculateDistanceInKm(deviceLocation, a.position) -
          calculateDistanceInKm(deviceLocation, b.position),
      );
  }, [deviceLocation, stationsList, favoriteProduct, kmToDisplay]);
};
