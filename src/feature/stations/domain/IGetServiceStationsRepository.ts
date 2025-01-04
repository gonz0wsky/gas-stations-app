import type {ServiceStationsDTO} from '../infrastructure/api/service-stations/ServiceStationsDTO';

interface IGetServiceStationsRepository {
  run(): Promise<ServiceStationsDTO>;
}

export default IGetServiceStationsRepository;
