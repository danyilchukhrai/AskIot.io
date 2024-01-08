import { useMutation } from '@tanstack/react-query';
import { createCheckoutSection } from './services';

export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: createCheckoutSection,
  });
};
