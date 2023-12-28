import { MESSAGE_API } from '@/constants/api-endpoints';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllMessages, getChannelDetailsByQuoteId, newMessage } from './services';

export const useGetAllMessages = () => {
  return useQuery({
    queryKey: [MESSAGE_API.getAllMessages.api],
    queryFn: getAllMessages,
  });
};

export const useGetChannelDetailByQuoteId = (quoteId: number, enabled: boolean) => {
  return useQuery({
    queryKey: [MESSAGE_API.getChannelDetailsByQuoteId.api(quoteId), quoteId],
    queryFn: () => getChannelDetailsByQuoteId(quoteId),
    enabled: Number.isInteger(quoteId) && enabled,
    refetchInterval: 5000,
  });
};

export const useNewMessage = () => {
  return useMutation({
    mutationFn: newMessage,
  });
};
