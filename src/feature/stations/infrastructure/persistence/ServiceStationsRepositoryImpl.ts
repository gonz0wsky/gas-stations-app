import {CONFIG} from '@core/config';
import type {ServiceStationsRepository} from '@feature/stations/domain/ServiceStationsRepository';
import type {ServiceStationsDTO} from './ServiceStationsDTO';
import {mapDtoToServiceStation} from './ServiceStationDtoConverter';

const fetchAll: ServiceStationsRepository['fetchAll'] = async () => {
  const response = await fetch(CONFIG.SERVICE_STATIONS_API);

  if (!response.ok) {
    throw new Error('GetServiceStationsAPI network error');
  }

  const json = (await response.json()) as ServiceStationsDTO;

  return json.ListaEESSPrecio.map(mapDtoToServiceStation);
};

export const ServiceStationsRepositoryImpl: ServiceStationsRepository = {
  fetchAll,
};
