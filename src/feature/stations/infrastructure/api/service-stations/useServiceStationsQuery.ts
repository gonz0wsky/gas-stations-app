import GetServiceStationsUseCase from '@feature/stations/application/GetServiceStationsUseCase';
import {useQuery} from '@tanstack/react-query';
import GetServiceStationsAPI from './GetServiceStations';

function useServiceStationsQuery() {
  return useQuery({
    queryKey: ['service-stations'],
    queryFn: GetServiceStationsUseCase(GetServiceStationsAPI).run,
  });
}

export default useServiceStationsQuery;
