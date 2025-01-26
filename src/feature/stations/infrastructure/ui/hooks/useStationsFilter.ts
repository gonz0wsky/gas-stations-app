import {ServiceStation} from '@feature/stations/domain/ServiceStationModel';
import {useMemo, useState} from 'react';
import {useStore} from '@core/store';
import {calculateDistanceInKm} from '@shared/utils/calculateDistanceInKm';
import {FilterOption} from '../constants/filter-constants';
import ServiceStationProducts from '@feature/stations/domain/ServiceStationProductsModel';
import {MapPoi, PriceLevelValue} from '@feature/stations/domain/MapPoiModel';
import {mapServiceStationToMapPoi} from '@feature/stations/domain/ServiceStationModel+MapPoiModel';

const nearAvailableStations = (
  stations: Array<ServiceStation>,
  product: keyof ServiceStationProducts,
  location: {latitude: number; longitude: number},
  locationRadiusInKm: number,
): ServiceStation[] => {
  const matches = stations
    .filter(station => station.products[product])
    .filter(
      station =>
        calculateDistanceInKm(station.position, location) <= locationRadiusInKm,
    );
  return matches;
};

const sortStationsByPrice = (
  stations: Array<ServiceStation>,
  product: keyof ServiceStationProducts,
): Array<ServiceStation> => {
  const matches = [...stations].sort(
    (a, b) => a.products[product]! - b.products[product]!,
  );

  return matches;
};

const sortStationsByDistance = (
  stations: Array<ServiceStation>,
  location: {latitude: number; longitude: number},
): Array<ServiceStation> => {
  const matches = [...stations].sort(
    (a, b) =>
      calculateDistanceInKm(a.position, location) -
      calculateDistanceInKm(b.position, location),
  );

  return matches;
};

const favoriteStations = (
  stations: Array<ServiceStation>,
  favoriteIds: string[],
): Array<ServiceStation> => {
  const matches = stations.filter(station => favoriteIds.includes(station.id));

  return matches;
};

const serviceStationsToMapPois = (
  stationsList: Array<ServiceStation>,
  favoriteStationsList: Array<ServiceStation>,
  product: keyof ServiceStationProducts,
  priceRanges: {lowEnd: number; midEnd: number},
): Array<MapPoi> => {
  const favoriteIdsKeyValue = favoriteStationsList.reduce(
    (acc, station) => ({...acc, [station.id]: true}),
    {} as Record<string, boolean>,
  );

  const stationsListKeyValue = [
    ...stationsList,
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
};

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

export const useStationFilter = ({
  stations,
  location,
  userVehicleFuel,
}: {
  stations: ServiceStation[];
  location: {latitude: number; longitude: number} | null;
  userVehicleFuel: keyof ServiceStationProducts;
}) => {
  const kmToDisplay = useStore(state => state.kmToDisplay);
  const userFavoriteStationsIds = useStore(state => state.favorites);

  const [filter, setFilter] = useState<FilterOption>('price');

  const handlePressFilter = (id: FilterOption) => {
    setFilter(id);
  };

  const nearStationsList = useMemo(
    () =>
      location
        ? nearAvailableStations(
            stations,
            userVehicleFuel,
            location,
            kmToDisplay,
          )
        : [],
    [kmToDisplay, location, stations, userVehicleFuel],
  );

  const nearStationsListSortedByPrice = useMemo(
    () => sortStationsByPrice(nearStationsList, userVehicleFuel),
    [nearStationsList, userVehicleFuel],
  );

  const nearStationsListSortedByDistance = useMemo(
    () => (location ? sortStationsByDistance(nearStationsList, location) : []),
    [location, nearStationsList],
  );

  const favoriteStationsList = useMemo(
    () => favoriteStations(stations, userFavoriteStationsIds),
    [stations, userFavoriteStationsIds],
  );

  const priceRanges = useMemo(
    () =>
      calculatePriceRanges(
        nearStationsListSortedByPrice[0],
        nearStationsListSortedByPrice[nearStationsListSortedByPrice.length - 1],
        userVehicleFuel,
      ),
    [nearStationsListSortedByPrice, userVehicleFuel],
  );

  const mapPois = useMemo(
    () =>
      serviceStationsToMapPois(
        nearStationsListSortedByDistance,
        favoriteStationsList,
        userVehicleFuel,
        priceRanges,
      ),
    [
      favoriteStationsList,
      nearStationsListSortedByDistance,
      priceRanges,
      userVehicleFuel,
    ],
  );

  const filteredStationList = useMemo(
    () =>
      ({
        price: nearStationsListSortedByPrice,
        near: nearStationsListSortedByDistance,
        favorites: favoriteStationsList,
      }[filter]),
    [
      favoriteStationsList,
      filter,
      nearStationsListSortedByDistance,
      nearStationsListSortedByPrice,
    ],
  );

  return {
    filter,
    filteredStationList,
    handlePressFilter,
    mapPois,
    priceRanges,
    userFavoriteStationsIds,
  };
};
