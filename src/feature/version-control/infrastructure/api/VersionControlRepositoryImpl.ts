import type {VersionControlRepository} from '@feature/version-control/domain/VersionControlRepository';
import {getVersionDocument} from './AppwriteDatabase';

const getVersionControlStatus: VersionControlRepository['getVersionControlStatus'] =
  async (version: string) => {
    const document = await getVersionDocument(version);

    if (!document) {
      return null;
    }

    const status = document.status as string | undefined;
    if (status === 'deprecated' || status === 'update_available') {
      return {
        version: document.version,
        status,
      };
    }

    return null;
  };

export const VersionStatusRepositoryImpl: VersionControlRepository = {
  getVersionControlStatus,
};
