import { REQUEST_METHOD } from '@/constants/common';
import { apiInstance } from '@/helpers/axios';
import { USER_API } from '@/constants/api-endpoints';
import { IProviderStatusResponse } from './types';

export const getProviderStatus = async (fakeParam: string): Promise<IProviderStatusResponse> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.GET,
    url: USER_API.getProviderStatus.api,
  });

  return result.data;
};

export const createUser = async (accessToken: string) => {
  const result = await apiInstance({
    method: REQUEST_METHOD.POST,
    url: USER_API.createUser.api,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return result.data;
};
