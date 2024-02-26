import { useMutation } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { createUser, getProviderStatus, inviteUser, listAssociatedVendorUsers } from './services';

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

// Define the hook for inviting a user
export const useInviteUser = () => {
  return useMutation({
    mutationFn: inviteUser,
    // Optionally, you can define onSuccess and onError handlers
    // onSuccess: (data) => { /* Handle success */ },
    // onError: (error) => { /* Handle error */ },
  });
};


export const useListAssociatedVendorUsers = () => {
  // Ensure that `listAssociatedVendorUsers` is a function that returns a Promise
  // The queryFn needs to be a function that returns a Promise
  return useQuery({
    queryKey: ['listVendorUsers'], 
    queryFn: () => listAssociatedVendorUsers(),
    // Optionally, you can include other configurations here, like `staleTime`, `cacheTime`, etc.
  });
};