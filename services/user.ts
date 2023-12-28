import { API_ENDPOINT } from '@/configs/appConfig';
import { askIOTApiFetch } from '@/helpers/fetchAPI';

export const getAskIotUserDetails = async () => {
  try {
    const userData = await askIOTApiFetch(`${API_ENDPOINT}/private/users/api/`);
    return userData;
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
