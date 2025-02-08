import {useLocation} from '@core/geolocation/GeoLocationProvider';
import {useStore} from '@core/store';
import type {
  ServiceStation,
  ServiceStationProducts,
} from '@feature/stations/domain/ServiceStationModel';
import {calculateDistanceInKm} from '@shared/utils/calculateDistanceInKm';
import {useMemo} from 'react';

const calculatePriceRanges = (
  cheaperStation: ServiceStation,
  expensiveStation: ServiceStation,
  product: keyof ServiceStationProducts,
): {lowEnd: number; midEnd: number} => {
  const minValue = cheaperStation?.products[product] ?? 0;
  const maxValue = expensiveStation?.products[product] ?? 0;

  const range = maxValue - minValue;
  const lowEnd = minValue + range / 3;
  const midEnd = minValue + (2 * range) / 3;

  return {lowEnd, midEnd};
};

export const usePriceRanges = (stationsList: Array<ServiceStation> = []) => {
  const deviceLocation = useLocation();

  const favoriteProduct = useStore(state => state.fuel);
  const kmToDisplay = useStore(state => state.kmToDisplay);

  return useMemo(() => {
    if (!deviceLocation) {
      return {lowEnd: 0, midEnd: 0};
    }

    const sortedByPrice = [...stationsList]
      .filter(station => station.products[favoriteProduct] !== null)
      .filter(
        station =>
          calculateDistanceInKm(deviceLocation, station.position) <=
          kmToDisplay,
      )
      .sort(
        (a, b) => a.products[favoriteProduct]! - b.products[favoriteProduct]!,
      );

    const result = calculatePriceRanges(
      sortedByPrice[0],
      sortedByPrice[sortedByPrice.length - 1],
      favoriteProduct,
    );

    return result;
  }, [deviceLocation, stationsList, favoriteProduct, kmToDisplay]);
};
