import type {MapPoi} from './MapPoiModel';
import type {ServiceStation} from './ServiceStationModel';

export const mapServiceStationToMapPoi = (
  station: ServiceStation,
  isFavorite: boolean,
  priceLevel: 'low' | 'medium' | 'high',
): MapPoi => {
  return {
    id: station.id,
    location: station.position,
    name: station.name,
    isFavorite,
    priceLevel,
  };
};
