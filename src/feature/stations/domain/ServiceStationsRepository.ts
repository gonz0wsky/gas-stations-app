import type {ServiceStation} from './ServiceStationModel';

export interface ServiceStationsRepository {
  fetchAll(): Promise<Array<ServiceStation>>;
}
