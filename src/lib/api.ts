import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";
import { storage } from "./storage";

// Create axios instance
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "https://api.example.com",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getString("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized - Token refresh logic
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = storage.getString("refreshToken");
        if (refreshToken) {
          // Attempt to refresh the token
          const response = await axios.post(
            `${api.defaults.baseURL}/auth/refresh`,
            { refreshToken },
          );

          const { accessToken } = response.data;
          storage.set("accessToken", accessToken);

          // Retry the original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          return api(originalRequest);
        }
      } catch (_refreshError) {
        // Refresh failed, clear tokens and redirect to login
        storage.remove("accessToken");
        storage.remove("refreshToken");
        // You can emit an event here to trigger logout in the app
      }
    }

    return Promise.reject(error);
  },
);

// API helper functions
export const apiGet = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await api.get<T>(url, config);
  return response.data;
};

export const apiPost = async <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await api.post<T>(url, data, config);
  return response.data;
};

export const apiPut = async <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await api.put<T>(url, data, config);
  return response.data;
};

export const apiPatch = async <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await api.patch<T>(url, data, config);
  return response.data;
};

export const apiDelete = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await api.delete<T>(url, config);
  return response.data;
};
