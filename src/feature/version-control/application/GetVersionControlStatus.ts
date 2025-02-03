import type {VersionControlStatus} from '../domain/VersionControlStatusModel';
import type {VersionControlRepository} from '../domain/VersionControlRepository';

export const GetVersionControlStatus = async (
  repository: VersionControlRepository,
  version: string,
): Promise<VersionControlStatus | null> => {
  const data = await repository.getVersionControlStatus(version);

  return data;
};
