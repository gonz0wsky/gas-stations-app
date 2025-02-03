import {useQuery} from '@tanstack/react-query';
import {GetVersionControlStatus} from '@feature/version-control/application/GetVersionControlStatus';
import {VersionStatusRepositoryImpl} from './VersionControlRepositoryImpl';

function useVersionControlStatusQuery(version: string) {
  return useQuery({
    queryKey: ['version-control'],
    queryFn: () =>
      GetVersionControlStatus(VersionStatusRepositoryImpl, version),
  });
}

export default useVersionControlStatusQuery;
