import GetServiceStationsUseCase from '@feature/stations/application/GetServiceStationsUseCase';
import {useQuery} from '@tanstack/react-query';
import {getServiceStations} from './GetServiceStations';

function useServiceStationsQuery() {
  return useQuery({
    queryKey: ['service-stations'],
    queryFn: GetServiceStationsUseCase(getServiceStations),
  });
}

export default useServiceStationsQuery;
