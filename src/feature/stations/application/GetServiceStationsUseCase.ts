import type {
  ServiceStation} from '../domain/ServiceStationModel';
import {
  mapDtoToServiceStation,
} from '../domain/ServiceStationModel';
import type {ServiceStationsRepository} from '../domain/ServiceStationsRepository';

const GetServiceStationsUseCase =
  (request: ServiceStationsRepository['fetch']) =>
  async (): Promise<ServiceStation[]> => {
    const data = await request();
    const stations = data.ListaEESSPrecio.map(mapDtoToServiceStation);

    return stations;
  };

export default GetServiceStationsUseCase;
