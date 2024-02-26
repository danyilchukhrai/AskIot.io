export const ENTER_KEY = 'Enter';
export const OTP_LENGTH = 6;
export const ERROR_CODE = {
  ERR_NETWORK: 'ERR_NETWORK',
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNPROCESSABLE_ENTITY: 422,
  NOT_FOUND: 404,
};
export const COOKIES_STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
};
export const REQUEST_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const DEFAULT_IMG = '/assets/logo/logo.svg';
export const DEFAULT_VENDOR_LOGO = '/assets/images/default-vendor.png';

export const DEFAULT_PAGINATION = {
  limit: 10,
  page: 0,
};

export const IMAGE_ACCEPT_INPUT = 'image/*';

export enum PAYMENT_STATUS {
  NO_PAYMENT = 'no_payment',
  PAID = 'active',
  TRIALING = 'trialing',
  IN_COMPLETE = 'incomplete',
  IN_COMPLETE_EXPIRED = 'incomplete_expired',
  PAST_DUE = 'past_due',
  CANCELED = 'canceled',
}
