import type {VersionControlStatus} from './VersionControlStatusModel';

export interface VersionControlRepository {
  getVersionControlStatus(
    version: string,
  ): Promise<VersionControlStatus | null>;
}
