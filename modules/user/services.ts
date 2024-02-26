import { USER_API, VENDOR_API } from '@/constants/api-endpoints';
import { REQUEST_METHOD } from '@/constants/common';
import { apiInstance } from '@/helpers/axios';
import { IProviderStatusResponse , IInviteUserBody} from './types';

export const getProviderStatus = async (fakeParam: string): Promise<IProviderStatusResponse> => {
  const result = await apiInstance({
    method: REQUEST_METHOD.GET,
    url: USER_API.getProviderStatus.api,
  });

  return result.data;
};

export const createUser = async (accessToken: string) => {
  const result = await apiInstance({
    method: REQUEST_METHOD.POST,
    url: USER_API.createUser.api,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return result.data;
};

// The function to invite a user
export const inviteUser = async (data: IInviteUserBody) => {
  const result = await apiInstance({
    method: REQUEST_METHOD.POST,
    data,
    url: USER_API.inviteUser.api,
  });

  return result.data;
};

//complicated table
export const listAssociatedVendorUsers = async () => {
  const result = await apiInstance({
    method: REQUEST_METHOD.GET,
    url: USER_API.getAssociatedVendorUsers.api,
  });

  return result.data;
};