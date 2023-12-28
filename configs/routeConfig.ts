import { AUTH_ROUTES, RESTRICTED_APP_ROUTES } from '@/constants/routes';

export enum USER_TYPE {
  USER = 'user',
  PROVIDER = 'provider',
  PROVIDER_ONBOARDING = 'provider-onboarding',
}

export const routeConfig: { [key: string]: { [key: string]: string } } = {
  auth: {
    default: AUTH_ROUTES.LOGIN,
    [AUTH_ROUTES.SIGN_UP]: AUTH_ROUTES.SIGN_UP,
    [AUTH_ROUTES.LOGIN]: AUTH_ROUTES.LOGIN,
    [AUTH_ROUTES.FORGOT_PASSWORD]: AUTH_ROUTES.FORGOT_PASSWORD,
    [AUTH_ROUTES.PHONE_LOGIN]: AUTH_ROUTES.PHONE_LOGIN,
  },
  [USER_TYPE.USER]: {
    default: RESTRICTED_APP_ROUTES.IOTGPT,
    [RESTRICTED_APP_ROUTES.IOTGPT]: RESTRICTED_APP_ROUTES.IOTGPT,
    [RESTRICTED_APP_ROUTES.PROJECTS]: RESTRICTED_APP_ROUTES.PROJECTS,
    [RESTRICTED_APP_ROUTES.MESSAGES]: RESTRICTED_APP_ROUTES.MESSAGES,
    [RESTRICTED_APP_ROUTES.QUOTES]: RESTRICTED_APP_ROUTES.QUOTES,
  },
  [USER_TYPE.PROVIDER]: {
    default: RESTRICTED_APP_ROUTES.MY_COMPANY,
    [RESTRICTED_APP_ROUTES.MY_COMPANY]: RESTRICTED_APP_ROUTES.MY_COMPANY,
    [RESTRICTED_APP_ROUTES.MESSAGES]: RESTRICTED_APP_ROUTES.MESSAGES,
    [RESTRICTED_APP_ROUTES.QUOTES]: RESTRICTED_APP_ROUTES.QUOTES,
  },
  [USER_TYPE.PROVIDER_ONBOARDING]: {
    default: RESTRICTED_APP_ROUTES.VENDOR_ONBOARDING,
  },
};
