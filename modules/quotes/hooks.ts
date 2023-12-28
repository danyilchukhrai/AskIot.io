import { useMutation } from '@tanstack/react-query';
import { ICreateQuotesBody } from './types';
import { createQuotes } from './services';

export const useCreateQuotes = () => {
  const fn = async (data: ICreateQuotesBody) => {
    return await createQuotes(data);
  };

  return useMutation({
    mutationFn: fn,
  });
};
