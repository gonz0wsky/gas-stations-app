import {CONFIG} from '@core/config';
import type {ServiceStationsDTO} from './ServiceStationsDTO';

export const getServiceStations = async (): Promise<ServiceStationsDTO> => {
  const response = await fetch(CONFIG.STATIONS_API_URL);

  if (!response.ok) {
    throw new Error('GetServiceStationsAPI network error');
  }

  const json = (await response.json()) as ServiceStationsDTO;

  return json;
};
