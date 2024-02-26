import { PRODUCT_API } from '@/constants/api-endpoints';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getVerifiedAlternateProducts, queryDevice } from './services';

export const useQueryDevice = () => {
  return useMutation({
    mutationFn: queryDevice,
  });
};

export const useGetVerifiedAlternateProducts = (productId: number) => {
  return useQuery({
    queryKey: [PRODUCT_API.getVerifiedAlternateProducts.api(productId), productId],
    queryFn: () => getVerifiedAlternateProducts(productId),
    enabled: !!productId,
  });
};
