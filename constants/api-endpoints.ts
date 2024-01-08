import { RECOMMENDATION_TYPE } from './iot-gpt';

export const AUTH_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  SIGNUP: '/api/auth/sign-up',
  LOGOUT: '/api/auth/logout',
};

export const IOT_GPT_API = {
  chatQuery: {
    api: '/private/chats/process-query',
  },
  chatQueryDev: {
    api: '/private/chats/process-query-dev',
  },
  getUserThreads: {
    api: '/private/chats/get-user-threads',
  },
  getThreadDetails: {
    api: (threadId: string) => `/private/chats/get-thread-details/${threadId}`,
  },
  getRecommendationProductDetail: {
    api: (query?: string | number, recommendationType?: string) =>
      recommendationType === RECOMMENDATION_TYPE.DEVICES
        ? `/public/devices/${query}`
        : `/public/products/${query}`,
  },
};

export const VENDOR_API = {
  getVendorDetails: {
    api: (id: string | number) => `/private/vendors/${id}`,
  },
  searchVendors: {
    api: '/private/vendors/search-vendors',
  },
  claimVendor: {
    api: (id: string) => `/private/vendors/${id}/claim`,
  },
  applyProvider: {
    api: (userId: string) => `/private/users/${userId}/provider`,
  },
  createVendor: {
    api: '/private/vendors',
  },
  getProductsByVendor: {
    api: (vendorId: string | number) => `/private/vendors/productsByVendor/${vendorId}`,
  },
  chatVendorQuery: {
    api: '/private/chats/process-vendor-query',
  },
  createEditDevice: {
    api: (id?: number) => (id ? `/private/devices/device/${id}` : '/private/devices/device'),
  },
  createEditProduct: {
    api: (id?: number) => (id ? `/private/products/product/${id}` : '/private/products/product'),
  },
  deleteProduct: {
    api: (id: number, isDevice: boolean) =>
      isDevice ? `/private/devices/${id}` : `/private/products/product/${id}`,
  },
  updateVendor: {
    api: (id: number) => `/private/vendors/${id}`,
  },
  getProductById: {
    api: (id: number, isDevice: boolean) =>
      isDevice ? `/private/devices/${id}` : `/private/products/${id}`,
  },
};

export const QUOTES_API = {
  createQuotes: {
    api: '/private/quotes',
  },
};

export const USER_API = {
  getProviderStatus: {
    api: '/private/users/provider-status',
  },
  createUser: {
    api: '/private/users/',
  },
  getAskIotUserDetails: {
    api: '/private/users/api/',
  },
  createAskIotUser: {
    api: '/private/users/',
  },
};

export const PROJECTS_API = {
  getAllProjectsByUser: {
    api: '/private/projects/',
  },
  createNewProject: {
    api: '/private/projects/',
  },
  addProductToProject: {
    api: (projectId: string | number) => `/private/projects/${projectId}/products`,
  },
  checkProductSaved: {
    api: (productId: string | number) => `/private/projects/check-product/${productId}`,
  },
  getAllSavedProducts: {
    api: '/private/projects/user/saved-products',
  },
  removeProductFromProject: {
    api: (projectId: number, productId: number) =>
      `/private/projects/${projectId}/products/${productId}`,
  },
  getAllProjects: {
    api: '/private/projects/',
  },
};

export const MESSAGE_API = {
  getAllMessages: {
    api: '/private/messages/',
  },
  getChannelDetailsByQuoteId: {
    api: (quoteId: number) => `/private/messages/quotes/${quoteId}/details`,
  },
  newMessage: {
    api: '/private/messages/send',
  },
};

export const PRODUCT_API = {
  queryDevice: {
    api: '/public/chats/queryDevice',
  },
};

export const COMMON_API = {
  getSASToken: {
    api: '/private/azure-storage/get-sas-token',
  },
};

export const SUBSCRIPTION_API = {
  createCheckoutSession: {
    // api: '/public/stripe/create-checkout-session',
    api: '/api/checkout/create-checkout-session',
  },
  createPortalSession: {
    api: '/api/checkout/create-portal-session',
  },
};
