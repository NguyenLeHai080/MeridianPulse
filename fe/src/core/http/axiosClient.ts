import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ENV_CONFIG } from '@/config/env.config';

const axiosClient = axios.create({
  baseURL: ENV_CONFIG.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor: Attach JWT Token automatically
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(`${ENV_CONFIG.STORAGE_PREFIX}access_token`);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Expiration & Error Formatting
axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError<{ error?: { message?: string } }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // If 401 Unauthorized and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(`${ENV_CONFIG.STORAGE_PREFIX}refresh_token`);

      if (refreshToken) {
        try {
          const res = await axios.post(`${ENV_CONFIG.API_BASE_URL}/auth/refresh`, {
            refresh_token: refreshToken,
          });
          const newAccessToken = res.data.access_token;
          localStorage.setItem(`${ENV_CONFIG.STORAGE_PREFIX}access_token`, newAccessToken);
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          return axiosClient(originalRequest);
        } catch {
          // Token refresh failed, purge session
          localStorage.removeItem(`${ENV_CONFIG.STORAGE_PREFIX}access_token`);
          localStorage.removeItem(`${ENV_CONFIG.STORAGE_PREFIX}refresh_token`);
          localStorage.removeItem(`${ENV_CONFIG.STORAGE_PREFIX}user`);
          window.location.href = '/login';
        }
      }
    }

    const errorMessage = error.response?.data?.error?.message || error.message || 'Lỗi kết nối máy chủ';
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosClient;
