import { supabaseClient } from '@/configs/supabase';
import { COOKIES_STORAGE_KEYS, ERROR_CODE } from '@/constants/common';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { handleShowError } from './common';
import * as CookiesStorageService from './storage';

interface ApiConfig {
  baseURL: string | undefined;
}

const createApi = (config: ApiConfig): AxiosInstance => {
  const instance = axios.create({
    ...config,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add interceptors and other configuration here

  const setAuthorizationHeader = (request: AxiosRequestConfig | any, token: string) => {
    request.headers.Authorization = `Bearer ${token}`;
  };

  const onRequest = (config: AxiosRequestConfig | any) => {
    const token = CookiesStorageService.getValue(COOKIES_STORAGE_KEYS.ACCESS_TOKEN);
    token && setAuthorizationHeader(config, token);
    return config;
  };

  const onRequestError = (error: AxiosError) => {
    return Promise.reject(error);
  };

  const onResponse = (response: AxiosResponse) => {
    return response;
  };

  const handleRetrieveNewSession = async (error: AxiosError) => {
    const originalRequest = error.config as any;
    const { data } = await supabaseClient.auth.refreshSession();
    const { session } = data;
    const { access_token } = session || {};

    if (access_token) {
      CookiesStorageService.setValue(COOKIES_STORAGE_KEYS.ACCESS_TOKEN, access_token || '');
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      return instance(originalRequest);
    }
  };

  const onResponseError = (error: AxiosError | any) => {
    if (error.isAxiosError) {
      if (error.code === ERROR_CODE.ERR_NETWORK) {
        console.log('error', ERROR_CODE.ERR_NETWORK);
      }

      switch (error.response?.status) {
        case ERROR_CODE.UNAUTHORIZED:
          handleRetrieveNewSession(error);
          break;

        case ERROR_CODE.UNPROCESSABLE_ENTITY:
          handleShowError(error?.response);
          break;

        case ERROR_CODE.INTERNAL_SERVER_ERROR:
          if (error?.config?.method === 'get') {
            handleShowError(error?.response);
          }
          break;

        case ERROR_CODE.NOT_FOUND:
          handleShowError(error?.response);
          break;

        default:
          return Promise.reject(error.response);
      }
    }

    return Promise.reject(error.response);
  };

  instance.interceptors.request.use(onRequest, onRequestError);
  instance.interceptors.response.use(onResponse, onResponseError);

  return instance;
};

export const apiInstance = createApi({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});
