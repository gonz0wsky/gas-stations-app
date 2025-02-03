export type VersionControlStatus = {
  version: string;
  status: 'deprecated' | 'update_available' | null;
};
