import { MESSAGE_API } from '@/constants/api-endpoints';
import { REQUEST_METHOD } from '@/constants/common';
import { apiInstance } from '@/helpers/axios';
import { serializeObject } from '@/helpers/common';
import { IGetAllMessagesResponse, INewMessageBody } from './types';

export const getAllMessages = async (): Promise<IGetAllMessagesResponse> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.GET,
    url: MESSAGE_API.getAllMessages.api,
  });

  return result.data;
};

export const getChannelDetailsByQuoteId = async (
  quoteId: number,
): Promise<IGetAllMessagesResponse> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.GET,
    url: MESSAGE_API.getChannelDetailsByQuoteId.api(quoteId),
  });

  return result.data;
};

export const newMessage = async (data: INewMessageBody): Promise<IGetAllMessagesResponse> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.POST,
    data: serializeObject(data),
    url: MESSAGE_API.newMessage.api,
  });

  return result.data;
};
