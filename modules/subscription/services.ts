import { SUBSCRIPTION_API } from '@/constants/api-endpoints';
import { REQUEST_METHOD } from '@/constants/common';
import { apiInstance } from '@/helpers/axios';
import { ICreateCheckoutSessionBody } from './types';

export const generatePaymentUrl = async (sessionId: string): Promise<{ url: string }> => {
  const response = await fetch(SUBSCRIPTION_API.generatePaymentUrl.api, {
    method: REQUEST_METHOD.POST,
    body: JSON.stringify({
      sessionId,
    }),
  });
  const jsonData = await response.json();

  if (response?.ok) {
    return jsonData;
  } else {
    throw 'Server error';
  }
};

export const createCheckoutSession = async (
  data: ICreateCheckoutSessionBody,
): Promise<{ sessionId: string }> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.POST,
    data,
    url: SUBSCRIPTION_API.createCheckoutSession.api,
  });

  return result.data;
};
