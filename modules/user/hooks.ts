import { useMutation } from '@tanstack/react-query';
import { createUser, getProviderStatus } from './services';

export const useGetProviderStatus = () => {
  return useMutation({
    mutationFn: getProviderStatus,
    retry: 3,
    retryDelay: 3000,
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
  });
};
