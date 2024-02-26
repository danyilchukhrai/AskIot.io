import { useMutation } from '@tanstack/react-query';
import { createCheckoutSession, generatePaymentUrl } from './services';

export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: createCheckoutSession,
  });
};

export const useGeneratePaymentUrl = () => {
  return useMutation({
    mutationFn: generatePaymentUrl,
  });
};
