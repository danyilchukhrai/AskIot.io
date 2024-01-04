import { VENDOR_API } from '@/constants/api-endpoints';
import { REQUEST_METHOD } from '@/constants/common';
import { apiInstance } from '@/helpers/axios';
import {
  IChatVendorQueryBody,
  IClaimVendorBody,
  ICreateVendorBody,
  IProductsByVendorResponse,
  ISearchVendorsQueryParams,
  ISearchVendorsResponse,
  IVendorDetails,
} from './type';

export const getVendorDetails = async (id: string | number): Promise<IVendorDetails> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.GET,
    url: VENDOR_API.getVendorDetails.api(id),
  });

  return result.data;
};

export const searchVendors = async (
  queryParams: ISearchVendorsQueryParams,
): Promise<ISearchVendorsResponse> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.GET,
    params: queryParams,
    url: VENDOR_API.searchVendors.api,
  });

  return result.data;
};

export const claimVendor = async ({ id, data }: { id: string; data: IClaimVendorBody }) => {
  const result = await apiInstance({
    method: REQUEST_METHOD.POST,
    data,
    url: VENDOR_API.claimVendor.api(id),
  });

  return result.data;
};

export const createVendor = async (data: ICreateVendorBody) => {
  const result = await apiInstance({
    method: REQUEST_METHOD.POST,
    data,
    url: VENDOR_API.createVendor.api,
  });

  return result.data;
};

export const getProductsByVendor = async (
  vendorId: string | number,
): Promise<IProductsByVendorResponse> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.GET,
    url: VENDOR_API.getProductsByVendor.api(vendorId),
  });

  return result.data;
};

export const chatVendorQuery = async (
  data: IChatVendorQueryBody,
): Promise<{ response: string }> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.POST,
    data,
    url: VENDOR_API.chatVendorQuery.api,
  });

  return result.data;
};

export const createEditDevice = async ({ data, id }: { data: any; id?: number }) => {
  const result = await apiInstance({
    method: id ? REQUEST_METHOD.PUT : REQUEST_METHOD.POST,
    data,
    url: VENDOR_API.createEditDevice.api(id),
  });

  return result.data;
};

export const createEditProduct = async ({ data, id }: { data: any; id?: number }) => {
  const result = await apiInstance({
    method: id ? REQUEST_METHOD.PUT : REQUEST_METHOD.POST,
    data,
    url: VENDOR_API.createEditProduct.api(id),
  });

  return result.data;
};

export const deleteProduct = async (id: number) => {
  const result = await apiInstance({
    method: REQUEST_METHOD.DELETE,
    url: VENDOR_API.deleteProduct.api(id),
  });

  return result.data;
};

export const updateVendor = async ({ data, id }: { data: any; id: number }) => {
  const result = await apiInstance({
    method: REQUEST_METHOD.PUT,
    data,
    url: VENDOR_API.updateVendor.api(id),
  });

  return result.data;
};

export const getProductById = async (id: number, isDevice: boolean) => {
  const result = await apiInstance({
    method: REQUEST_METHOD.GET,
    url: VENDOR_API.getProductById.api(id, isDevice),
  });

  return result.data;
};
