import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import AuthService from './auth';

let store: any;

export const injectStore = (_store: any) => {
  store = _store;
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const accessToken = store.getState().auth.accessToken;
  if (config.headers && accessToken)
    config.headers['Authorization'] = `Bearer ${accessToken}`;

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
}

const onResponseError = async (error: AxiosError) => {
  const originalConfig: any = error.config;
  if (error.response) {
    if (originalConfig.url !== '/auth/login' && error.response.data?.message !== 'Invalid refresh-token') {
      if (error.response.status === 401) {
        const refreshToken = store.getState().auth.refreshToken;
        try {
          await store.dispatch(AuthService.authenticateWithRefreshToken(refreshToken)).unwrap();
          return api(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    if (typeof error.response.data?.message !== 'undefined') {
      return Promise.reject(error.response.data.message.toString());
    }
  }
  return Promise.reject(error);
}

api.interceptors.request.use(onRequest, onRequestError);
api.interceptors.response.use(onResponse, onResponseError);

export default api;

