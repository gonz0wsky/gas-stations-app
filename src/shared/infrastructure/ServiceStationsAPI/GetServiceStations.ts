import type {ServiceStationsDTO} from './ServiceStationsDTO';

const API_URL =
  'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/';

const GetServiceStationsAPI = {
  run: async (): Promise<ServiceStationsDTO> => {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('ServiceStationsAPI network error');
    }

    const json = (await response.json()) as ServiceStationsDTO;

    return json;
  },
};

export default GetServiceStationsAPI;
