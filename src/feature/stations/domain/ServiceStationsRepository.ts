import type {ServiceStationsDTO} from '../infrastructure/api/ServiceStationsDTO';

export interface ServiceStationsRepository {
  fetch(): Promise<ServiceStationsDTO>;
}
