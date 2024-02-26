import { PRODUCT_API } from '@/constants/api-endpoints';
import { REQUEST_METHOD } from '@/constants/common';
import { apiInstance } from '@/helpers/axios';
import { IRecommendationInfo } from '../iot-gpt/type';
import { IQueryDeviceBody } from './types';

export const queryDevice = async (data: IQueryDeviceBody): Promise<{ aiResponse: string }> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.POST,
    data,
    url: PRODUCT_API.queryDevice.api,
  });

  return result.data;
};

export const getVerifiedAlternateProducts = async (
  productId: number,
): Promise<{ alternate_products_verified: IRecommendationInfo[] }> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.GET,
    url: PRODUCT_API.getVerifiedAlternateProducts.api(productId),
  });

  return result.data;
};
