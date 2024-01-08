import { IOT_GPT_API } from '@/constants/api-endpoints';
import { REQUEST_METHOD } from '@/constants/common';
import { apiInstance } from '@/helpers/axios';
import {
  IChatQueryBody,
  IChatQueryResponse,
  IRecommendationProductDetail,
  IThread,
  IThreadDetails,
} from './type';

export const chatQuery = async (data: IChatQueryBody): Promise<IChatQueryResponse> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.POST,
    data,
    url: IOT_GPT_API.chatQuery.api,
  });

  return result.data;
};

export const chatQueryDev = async (data: IChatQueryBody): Promise<IChatQueryResponse> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.POST,
    data,
    url: IOT_GPT_API.chatQueryDev.api,
  });

  return result.data;
};

export const getUserThreads = async (): Promise<{ threads: IThread[] }> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.GET,
    url: IOT_GPT_API.getUserThreads.api,
  });

  return result.data;
};

export const getThreadDetails = async (threadId: string): Promise<{ details: IThreadDetails }> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.GET,
    url: IOT_GPT_API.getThreadDetails.api(threadId),
  });

  return result.data;
};

export const getRecommendationProductDetail = async (
  query?: string | number,
  recommendationType?: string,
): Promise<IRecommendationProductDetail> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.GET,
    url: IOT_GPT_API.getRecommendationProductDetail.api(query, recommendationType),
  });

  return result.data;
};
