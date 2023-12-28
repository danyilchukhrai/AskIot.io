import { getLocalStorageWithoutParsing } from '@/services/local-storage';

const access_token = getLocalStorageWithoutParsing('accessToken');

export const askIOTApiFetch = (url: string, body?: {}, method?: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url, {
        method: method ? method : body ? 'POST' : 'GET',
        ...(body ? { body: JSON.stringify(body) } : {}),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.status !== 200 && response?.status !== 201) {
        throw response;
      }
      const responseData = await response.json();
      resolve(responseData);
    } catch (error) {
      reject(error);
    }
  });
};
