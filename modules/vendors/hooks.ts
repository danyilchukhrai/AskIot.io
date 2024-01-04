import { VENDOR_API } from '@/constants/api-endpoints';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  chatVendorQuery,
  claimVendor,
  createEditDevice,
  createEditProduct,
  createVendor,
  deleteProduct,
  getProductById,
  getProductsByVendor,
  getVendorDetails,
  searchVendors,
  updateVendor,
} from './services';
import { ISearchVendorsQueryParams } from './type';

export const useGetVendorDetails = (id: string | number) => {
  return useQuery({
    queryKey: [VENDOR_API.getVendorDetails.api(id), id],
    queryFn: () => getVendorDetails(id),
    enabled: !!id,
  });
};

export const useSearchVendors = () => {
  const [queryParams, setQueryParams] = useState<ISearchVendorsQueryParams>({
    page: 1,
    limit: 10,
  });

  const query = useQuery({
    queryKey: [VENDOR_API.searchVendors.api, queryParams],
    queryFn: () => searchVendors(queryParams),
    placeholderData: keepPreviousData,
    enabled: typeof queryParams?.search === 'string',
  });

  const setParams = (newParams: ISearchVendorsQueryParams) => {
    const mergedParams = { ...queryParams, ...newParams };
    setQueryParams(mergedParams);
  };

  return {
    ...query,
    params: queryParams,
    setParams,
  };
};

export const useClaimVendor = () => {
  return useMutation({
    mutationFn: claimVendor,
  });
};

export const useCreateVendor = () => {
  return useMutation({
    mutationFn: createVendor,
  });
};

export const useGetProductsByVendor = (id: string | number) => {
  return useQuery({
    queryKey: [VENDOR_API.getProductsByVendor.api(id), id],
    queryFn: () => getProductsByVendor(id),
    enabled: !!id,
  });
};

export const useChatVendorQuery = () => {
  return useMutation({
    mutationFn: chatVendorQuery,
  });
};

export const useCreateEditDevice = () => {
  return useMutation({
    mutationFn: createEditDevice,
  });
};

export const useCreateEditProduct = () => {
  return useMutation({
    mutationFn: createEditProduct,
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const fn = async ({ id, vendorId }: { id: number; vendorId: number }) => {
    await deleteProduct(id);
    queryClient.invalidateQueries({
      queryKey: [VENDOR_API.getProductsByVendor.api(vendorId), vendorId],
    });
  };
  return useMutation({
    mutationFn: fn,
  });
};

export const useUpdateVendor = () => {
  return useMutation({
    mutationFn: updateVendor,
  });
};

export const useGetProductById = (id: number, isDevice: boolean) => {
  return useQuery({
    queryKey: [VENDOR_API.getProductById.api(id, isDevice), id],
    queryFn: () => getProductById(id, isDevice),
    enabled: !!id,
  });
};
