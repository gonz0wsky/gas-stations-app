import type {ServiceStationsDTO} from '@shared/infrastructure/ServiceStationsAPI/ServiceStationsDTO';

interface IGetServiceStationsRepository {
  run(): Promise<ServiceStationsDTO>;
}

export default IGetServiceStationsRepository;
