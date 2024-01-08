import { USER_API } from '@/constants/api-endpoints';
import { REQUEST_METHOD } from '@/constants/common';
import { apiInstance } from '@/helpers/axios';

export const getAskIotUserDetails = async () => {
  try {
    const resp = await apiInstance({
      method: REQUEST_METHOD.GET,
      url: USER_API.getAskIotUserDetails.api,
    });
    return resp.data;
  } catch (_error) {
    return null;
  }
};

export const createAskIotUser = async () => {
  try {
    const resp = await apiInstance({
      method: REQUEST_METHOD.POST,
      url: USER_API.createAskIotUser.api,
    });
    return resp.data;
  } catch (_error) {
    return null;
  }
};
