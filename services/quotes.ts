import { API_ENDPOINT } from '@/configs/appConfig';
import { USER_TYPE } from '@/configs/routeConfig';

export const getQuotesURL = (userType: string) => {
  let url = `${API_ENDPOINT}/private/quotes/user/quotes`;
  if (userType === USER_TYPE.PROVIDER) {
    url = `${API_ENDPOINT}/private/quotes/vendor/`;
  }
  return url;
};
