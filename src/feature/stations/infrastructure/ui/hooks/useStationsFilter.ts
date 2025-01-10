import ServiceStation from '@feature/stations/domain/ServiceStationModel';
import {useMemo, useState} from 'react';
import useStore from '@core/store';
import calculateDistanceInKm from '@shared/utils/calculateDistanteInKm';
import {FilterOption} from '../constants/filter-constants';

const useStationFilter = (
  stations: ServiceStation[],
  location: {latitude: number; longitude: number},
) => {
  const userVehicleFuel = useStore(state => state.fuel);
  const kmToDisplay = useStore(state => state.kmToDisplay);
  const userFavoriteStations = useStore(state => state.favorites);

  const [filter, setFilter] = useState<FilterOption>('price');

  const handlePressFilter = (id: FilterOption) => {
    setFilter(id);
  };

  const nearProductsWithPrice = useMemo(
    () =>
      stations
        .filter(station => station.products[userVehicleFuel])
        .filter(
          station =>
            calculateDistanceInKm(station.position, location) <= kmToDisplay,
        ),
    [kmToDisplay, location, stations, userVehicleFuel],
  );

  const price = useMemo(
    () =>
      [...nearProductsWithPrice].sort(
        (a, b) => a.products[userVehicleFuel]! - b.products[userVehicleFuel]!,
      ),
    [nearProductsWithPrice, userVehicleFuel],
  );

  const near = useMemo(
    () =>
      [...nearProductsWithPrice].sort(
        (a, b) =>
          calculateDistanceInKm(a.position, location) -
          calculateDistanceInKm(b.position, location),
      ),
    [location, nearProductsWithPrice],
  );

  const favorites = useMemo(
    () => stations.filter(station => userFavoriteStations.includes(station.id)),
    [stations, userFavoriteStations],
  );

  const filteredStations = useMemo(
    () => ({
      price,
      near,
      favorites,
    }),
    [favorites, near, price],
  );

  return {
    filter,
    filteredStations: filteredStations[filter],
    handlePressFilter,
    userFavoriteStations,
  };
};

export default useStationFilter;
