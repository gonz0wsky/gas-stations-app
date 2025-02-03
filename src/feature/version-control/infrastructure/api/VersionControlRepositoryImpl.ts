import type {VersionControlRepository} from '@feature/version-control/domain/VersionControlRepository';

const getVersionControlStatus: VersionControlRepository['getVersionControlStatus'] =
  async () => {
    return null;
  };

export const VersionStatusRepositoryImpl: VersionControlRepository = {
  getVersionControlStatus,
};
