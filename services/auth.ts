import { AUTH_ENDPOINTS } from '@/constants/api-endpoints';
import { COOKIES_STORAGE_KEYS } from '@/constants/common';
import { AUTH_ROUTES } from '@/constants/routes';
import { handleShowError } from '@/helpers/common';
import { destroy } from '@/helpers/storage';

export const logout = async () => {
  const response = await fetch(AUTH_ENDPOINTS.LOGOUT, {
    method: 'POST',
  });
  if (response.status === 200) {
    destroy(COOKIES_STORAGE_KEYS.ACCESS_TOKEN);
    window.location.href = AUTH_ROUTES.LOGIN;
  } else {
    handleShowError('');
  }
};
