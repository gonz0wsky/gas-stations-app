import {GetAllServiceStationsUseCase} from '@feature/stations/application/GetAllServiceStationsUseCase';
import {useQuery} from '@tanstack/react-query';
import {ServiceStationsRepositoryImpl} from './ServiceStationsRepositoryImpl';

function useServiceStationsQuery() {
  return useQuery({
    queryKey: ['service-stations'],
    queryFn: GetAllServiceStationsUseCase(ServiceStationsRepositoryImpl),
  });
}

export default useServiceStationsQuery;
