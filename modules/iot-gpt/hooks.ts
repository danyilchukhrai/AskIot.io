import { IOT_GPT_API } from '@/constants/api-endpoints';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  chatQuery,
  chatQueryDev,
  deleteThread,
  getRecommendationProductDetail,
  getThreadDetails,
  getUserThreads,
  greetingsFeedback,
} from './services';
import { IChatQueryBody } from './type';

export const useChatQuery = () => {
  const fn = async (data: IChatQueryBody) => {
    return await chatQuery(data);
  };

  return useMutation({
    mutationFn: fn,
  });
};

export const useChatQueryDev = () => {
  const fn = async (data: IChatQueryBody) => {
    return await chatQueryDev(data);
  };

  return useMutation({
    mutationFn: fn,
  });
};

export const useGetUserThreads = () => {
  return useQuery({
    queryKey: [IOT_GPT_API.getUserThreads.api],
    queryFn: getUserThreads,
  });
};

export const useGetThreadDetails = (threadId: string) => {
  return useQuery({
    queryKey: [IOT_GPT_API.getThreadDetails.api, threadId],
    queryFn: () => getThreadDetails(threadId),
    enabled: !!threadId,
  });
};

export const useGetRecommendationProductDetail = (
  query?: string | number,
  recommendationType?: string,
) => {
  return useQuery({
    queryKey: [
      IOT_GPT_API.getRecommendationProductDetail.api(query, recommendationType),
      query,
      recommendationType,
    ],
    queryFn: () => getRecommendationProductDetail(query, recommendationType),
    enabled: !!query && !!recommendationType,
  });
};

export const useDeleteThread = () => {
  return useMutation({
    mutationFn: deleteThread,
  });
};

export const useGreetingsFeedback = () => {
  return useMutation({
    mutationFn: greetingsFeedback,
  });
};
