import type {ServiceStation} from '../domain/ServiceStationModel';
import type {ServiceStationsRepository} from '../domain/ServiceStationsRepository';

export const GetAllServiceStationsUseCase =
  (repository: ServiceStationsRepository) =>
  async (): Promise<Array<ServiceStation>> => {
    const data = await repository.fetchAll();
    return data;
  };
