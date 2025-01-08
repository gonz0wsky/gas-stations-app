import ServiceStation from '@feature/stations/domain/ServiceStationModel';
import {useEffect, useState} from 'react';
import useStore from '@core/store';
import calculateDistanceInKm from '@shared/utils/calculateDistanteInKm';
import {FilterOption} from '../constants/filter-constants';

const useStationFilter = (
  stations: ServiceStation[],
  location: {latitude: number; longitude: number},
) => {
  const vehicleFuel = useStore(state => state.fuel);
  const kmToDisplay = useStore(state => state.kmToDisplay);
  const userFavoriteStations = useStore(state => state.favorites);

  const [filter, setFilter] = useState<FilterOption>('price');
  const [filteredStations, setFilteredStations] = useState<
    Record<FilterOption, ServiceStation[]>
  >({
    favorites: [],
    near: [],
    price: [],
  });

  const handlePressFilter = (id: FilterOption) => {
    setFilter(id);
  };

  useEffect(() => {
    (async () => {
      if (stations.length === 0) {
        return;
      }

      const nearProductsWithPrice = stations
        .filter(station => station.prices[vehicleFuel])
        .filter(
          station =>
            calculateDistanceInKm(station.position, location) <= kmToDisplay,
        );

      const price = [...nearProductsWithPrice].sort(
        (a, b) => a.prices[vehicleFuel]! - b.prices[vehicleFuel]!,
      );

      const near = [...nearProductsWithPrice].sort(
        (a, b) =>
          calculateDistanceInKm(a.position, location) -
          calculateDistanceInKm(b.position, location),
      );

      const favorites = stations.filter(station =>
        userFavoriteStations.includes(station.id),
      );

      setFilteredStations({price, near, favorites});
    })();
  }, [kmToDisplay, location, stations, userFavoriteStations, vehicleFuel]);

  return {
    filter,
    filteredStations: filteredStations[filter],
    handlePressFilter,
  };
};

export default useStationFilter;
