import { API_ENDPOINT } from '@/configs/appConfig';
import { askIOTApiFetch } from '@/helpers/fetchAPI';

export const trainBot = async (files: File[]) => {
  try {
    // const trainData = await askIOTApiFetch(`${API_ENDPOINT}/bot/train`, body);

    // Fake API
    const trainData: any[] = [];
    for (const file of files) {
      trainData.push({
        name: file.name,
        size: file.size,
        type: file.type,
        uploadTime: 21600,
        trainedTime: 21600,
        result: true
      });
    }
    // *********** //
    return { data: trainData };
  } catch (_error) {
    return null;
  }
};

export const createAskIotUser = async () => {
  try {
    const userData = await askIOTApiFetch(`${API_ENDPOINT}/private/users`, {}, 'POST');
    return userData;
  } catch (_error) {
    return null;
  }
};
