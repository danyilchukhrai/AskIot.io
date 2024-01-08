import { SUBSCRIPTION_API } from '@/constants/api-endpoints';
import { REQUEST_METHOD } from '@/constants/common';
import { ICreateCheckoutSessionBody } from './types';

export const createCheckoutSection = async (
  data: ICreateCheckoutSessionBody,
): Promise<{ url: string }> => {
  const response = await fetch(SUBSCRIPTION_API.createCheckoutSession.api, {
    method: REQUEST_METHOD.POST,
    body: JSON.stringify(data),
  });
  const jsonData = await response.json();

  return jsonData;
};
