import {useStore} from '@core/store';
import type {ServiceStation} from '@feature/stations/domain/ServiceStationModel';
import {useMemo} from 'react';

export const useFavoritesServiceStations = (
  stationsList: Array<ServiceStation> = [],
) => {
  const favoriteStationsIds = useStore(state => state.favorites);

  return useMemo(() => {
    return [...stationsList].filter(station =>
      favoriteStationsIds.includes(station.id),
    );
  }, [stationsList, favoriteStationsIds]);
};
