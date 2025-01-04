import ServiceStation, {
  mapDtoToServiceStation,
} from '../domain/ServiceStationModel';
import IGetServiceStationsRepository from '../domain/IGetServiceStationsRepository';

const GetServiceStationsUseCase = (
  repository: IGetServiceStationsRepository,
) => ({
  run: async (): Promise<ServiceStation[]> => {
    const data = await repository.run();
    const stations = data.ListaEESSPrecio.map(mapDtoToServiceStation);

    return stations;
  },
});

export default GetServiceStationsUseCase;
