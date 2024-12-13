import GetServiceStationsUseCase from '@feature/database/application/GetServiceStationsUseCase';
import {useLingui} from '@lingui/react';
import GetServiceStationsAPI from '@shared/infrastructure/ServiceStationsAPI/GetServiceStations';

const getServiceStationsUseCase = GetServiceStationsUseCase(
  GetServiceStationsAPI,
);

const useDatabaseViewModel = () => {
  const {i18n} = useLingui();

  const callGasApi = async () => {
    console.log('callGasApi');
    const data = await getServiceStationsUseCase.run();

    console.log(data);
  };

  return {
    callGasApi,
    i18n,
  };
};

export default useDatabaseViewModel;
