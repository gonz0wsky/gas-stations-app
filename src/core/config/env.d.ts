declare module '@env' {
  export const ENVIRONMENT: 'development' | 'staging' | 'production';

  export const APP_STORE_ANDROID_ID: string;
  export const APP_STORE_IOS_ID: string;

  export const SERVICE_STATIONS_API: string;

  export const APPWRITE_ENDPOINT: string;
  export const APPWRITE_PROJECT_ID: string;
  export const APPWRITE_DATABASE_ID: string;
  export const APPWRITE_COLLECTION_ID: string;
}
