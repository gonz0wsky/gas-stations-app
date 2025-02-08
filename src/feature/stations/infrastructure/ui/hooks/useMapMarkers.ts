import {useStore} from '@core/store';
import type {MapPoi} from '@feature/stations/domain/MapPoiModel';
import {PriceLevelValue} from '@feature/stations/domain/MapPoiModel';
import type {ServiceStation} from '@feature/stations/domain/ServiceStationModel';
import {mapServiceStationToMapPoi} from '@feature/stations/domain/ServiceStationModel+MapPoiModel';
import type {PriceRanges} from '@shared/domain/PriceRanges';
import {useMemo} from 'react';

export const useMapMarkers = (
  favoriteStationsList: Array<ServiceStation> = [],
  nearestStationsList: Array<ServiceStation> = [],
  priceRanges: PriceRanges,
) => {
  const product = useStore(state => state.fuel);

  return useMemo(() => {
    const favoriteIdsKeyValue = favoriteStationsList.reduce(
      (acc, station) => ({...acc, [station.id]: true}),
      {} as Record<string, boolean>,
    );

    const stationsListKeyValue = [
      ...nearestStationsList,
      ...favoriteStationsList,
    ].reduce(
      (acc, station) => ({
        ...acc,
        [station.id]: station,
      }),
      {} as Record<string, ServiceStation>,
    );

    const matches = Object.values(stationsListKeyValue).map<MapPoi>(station =>
      mapServiceStationToMapPoi(
        station,
        favoriteIdsKeyValue[station.id] ?? false,
        PriceLevelValue(station.products[product] ?? 0, priceRanges),
      ),
    );

    return matches;
  }, [favoriteStationsList, nearestStationsList, product, priceRanges]);
};
