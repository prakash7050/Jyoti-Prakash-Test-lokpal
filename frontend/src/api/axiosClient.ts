/// <reference types="vite/client" />

import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================================
// CSRF TOKEN
// ============================================================

let csrfToken: string | null = null;

export function setCsrfToken(token: string | null) {
  csrfToken = token;
}

export function clearCsrfToken() {
  csrfToken = null;
}

export function getCsrfToken() {
  return csrfToken;
}

// ============================================================
// CSRF REQUEST INTERCEPTOR
// ============================================================

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const method = (
      config.method || "get"
    ).toUpperCase();

    if (
      ["POST", "PUT", "PATCH", "DELETE"].includes(method) &&
      csrfToken
    ) {
      config.headers = config.headers ?? {};

      config.headers["X-CSRF-Token"] =
        csrfToken.includes(".")
          ? csrfToken.split(".")[0]
          : csrfToken;
    }

    return config;
  },
);

// ============================================================
// TOKEN REFRESH
// ============================================================

let isRefreshing = false;

type QueueItem = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};

let pendingQueue: QueueItem[] = [];

function processQueue(error?: unknown) {
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

// ============================================================
// RESPONSE INTERCEPTOR
// ============================================================

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

    const isLogin = url.includes("/login");
    const isRegister = url.includes("/register");
    const isRefresh = url.includes("/refresh");

    if (
      status !== 401 ||
      originalRequest._retry ||
      isLogin ||
      isRegister ||
      isRefresh
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({
          resolve: async () => {
            try {
              const response =
                await apiClient(originalRequest);

              resolve(response);
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
      const refreshResponse =
        await apiClient.post("/refresh");

      // If refresh endpoint returns a new CSRF token,
      // update the in-memory token.
      if (refreshResponse.data?.csrf_token) {
        setCsrfToken(
          refreshResponse.data.csrf_token,
        );
      }

      processQueue();

      return await apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      clearCsrfToken();

      window.dispatchEvent(
        new CustomEvent("auth:logout"),
      );

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);