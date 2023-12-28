import { REQUEST_METHOD } from '@/constants/common';
import { apiInstance } from '@/helpers/axios';
import { QUOTES_API } from '@/constants/api-endpoints';
import { ICreateQuotesBody, ICreateQuotesSuccess } from './types';

export const createQuotes = async (data: ICreateQuotesBody): Promise<ICreateQuotesSuccess> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.POST,
    data,
    url: QUOTES_API.createQuotes.api,
  });

  return result.data;
};
