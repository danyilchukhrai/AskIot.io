import { useMutation } from '@tanstack/react-query';
import { queryDevice } from './services';

export const useQueryDevice = () => {
  return useMutation({
    mutationFn: queryDevice,
  });
};
