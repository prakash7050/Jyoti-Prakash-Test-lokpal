/// <reference types="vite/client" />
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^|;\\s*)${name}=([^;]*)`));

  return match ? decodeURIComponent(match[2]) : null;
}

// CSRF
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const method = (config.method || "get").toUpperCase();

  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    const csrfCookie = readCookie("csrf_token");

    if (csrfCookie) {
      const csrfToken = csrfCookie.split(".")[0];

      config.headers = config.headers ?? {};

      config.headers["X-CSRF-Token"] = csrfToken;
    }
  }

  return config;
});

// Refresh handling
let isRefreshing = false;

type QueueItem = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};

let pendingQueue: QueueItem[] = [];

function processQueue(error: unknown = null) {
  const queue = [...pendingQueue];

  pendingQueue = [];

  queue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
}

apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & {
          _retry?: boolean;
        })
      | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response?.status;

    const url = originalRequest.url || "";

    const isLogin = url.includes("/login") || url.includes("/register");

    const isRefresh = url.includes("/refresh");

    if (status !== 401 || originalRequest._retry || isLogin || isRefresh) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({
          resolve: async () => {
            try {
              resolve(await apiClient(originalRequest));
            } catch (err) {
              reject(err);
            }
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      await apiClient.post("/refresh");

      processQueue();

      return await apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      window.dispatchEvent(new CustomEvent("auth:logout"));

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
