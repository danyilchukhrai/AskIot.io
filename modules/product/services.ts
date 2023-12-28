import { PRODUCT_API } from '@/constants/api-endpoints';
import { REQUEST_METHOD } from '@/constants/common';
import { apiInstance } from '@/helpers/axios';
import { IQueryDeviceBody } from './types';

export const queryDevice = async (data: IQueryDeviceBody): Promise<{ aiResponse: string }> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.POST,
    data,
    url: PRODUCT_API.queryDevice.api,
  });

  return result.data;
};
