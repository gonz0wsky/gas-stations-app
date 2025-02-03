import {CONFIG} from '@core/config';
// We need to use web version of appwrite because RN version only supports Expo
import {Client, Databases} from 'appwrite';

const {
  APPWRITE_COLLECTION_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
} = CONFIG;

const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

const databases = new Databases(client);

export const getVersionDocument = async (version: string) => {
  try {
    const document = await databases.getDocument(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID,
      version,
    );

    const documentVersion = document?.$id as string;
    const documentStatus = document?.status as string;

    if (documentVersion && documentStatus) {
      return {
        version: documentVersion,
        status: documentStatus,
      };
    }

    return null;
  } catch (error) {
    return null;
  }
};
