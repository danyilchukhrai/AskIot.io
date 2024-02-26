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
  getProductsByVendorSlug,
  getVendorDetails,
  getVendorDetailsBySlug,
  getVendorSettings,
  publicChatVendorQuery,
  searchVendors,
  updateLeadEmails,
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

export const useGetVendorDetailsBySlug = (slug: string, enabled: boolean) => {
  return useQuery({
    queryKey: [VENDOR_API.getVendorDetailsBySlug.api(slug), slug],
    queryFn: () => getVendorDetailsBySlug(slug),
    enabled: !!slug && enabled,
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

export const useGetProductsByVendorSlug = (slug: string) => {
  return useQuery({
    queryKey: [VENDOR_API.getProductsByVendorSlug.api(slug), slug],
    queryFn: () => getProductsByVendorSlug(slug),
    enabled: !!slug,
  });
};

export const useChatVendorQuery = () => {
  return useMutation({
    mutationFn: chatVendorQuery,
  });
};

export const usePublicChatVendorQuery = () => {
  return useMutation({
    mutationFn: publicChatVendorQuery,
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
  const fn = async ({
    id,
    vendorId,
    isDevice,
  }: {
    id: number;
    vendorId: number;
    isDevice: boolean;
  }) => {
    const resp = await deleteProduct(id, isDevice);
    await queryClient.invalidateQueries({
      queryKey: [VENDOR_API.getProductsByVendor.api(vendorId), vendorId],
    });
    return resp;
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

export const useUpdateLeadEmails = () => {
  return useMutation({
    mutationFn: updateLeadEmails,
  });
};

export const useGetVendorSettings = () => {
  return useQuery({
    queryKey: [VENDOR_API.getVendorSettings.api],
    queryFn: getVendorSettings,
  });
};


