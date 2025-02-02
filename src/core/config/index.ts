// @ts-ignore
import {ENVIRONMENT, SERVICE_STATIONS_API} from '@env';

type Config = {
  ENVIRONMENT: 'development' | 'staging' | 'production';
  SERVICE_STATIONS_API: string;
};

export const CONFIG: Config = {
  ENVIRONMENT,
  SERVICE_STATIONS_API,
} as const;
