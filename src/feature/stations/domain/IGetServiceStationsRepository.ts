import type {ServiceStationsDTO} from '../infrastructure/api/ServiceStationsDTO';

interface IGetServiceStationsRepository {
  run(): Promise<ServiceStationsDTO>;
}

export default IGetServiceStationsRepository;
