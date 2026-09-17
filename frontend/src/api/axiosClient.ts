/// <reference types="vite/client" />

import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


// ============================================================
// CSRF
// ============================================================

function readCookie(name: string): string | null {
  const match = document.cookie.match(
    new RegExp(`(^|;\\s*)${name}=([^;]*)`)
  );

  return match
    ? decodeURIComponent(match[2])
    : null;
}

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const method = (
      config.method || "get"
    ).toUpperCase();

    if (
      ["POST", "PUT", "PATCH", "DELETE"].includes(method)
    ) {
      const signedCsrf =
        readCookie("csrf_token");

      if (signedCsrf) {
        const rawToken =
          signedCsrf.split(".")[0];

        config.headers =
          config.headers ?? {};

        config.headers["X-CSRF-Token"] =
          rawToken;
      }
    }

    return config;
  }
);


// ============================================================
// Token Refresh
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

  queue.forEach(
    ({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    }
  );
}


apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest =
      error.config as
        | (InternalAxiosRequestConfig & {
            _retry?: boolean;
          })
        | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status =
      error.response?.status;

    const url =
      originalRequest.url || "";

    const isLogin =
      url.includes("/login");

    const isRegister =
      url.includes("/register");

    const isRefresh =
      url.includes("/refresh");

    // Never try refresh for authentication endpoints.
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

    // Another request is already refreshing.
    if (isRefreshing) {
      return new Promise(
        (resolve, reject) => {
          pendingQueue.push({
            resolve: async () => {
              try {
                const response =
                  await apiClient(
                    originalRequest
                  );

                resolve(response);
              } catch (err) {
                reject(err);
              }
            },

            reject,
          });
        }
      );
    }

    isRefreshing = true;

    try {
      // Browser automatically sends refresh_token
      // because withCredentials=true.
      await apiClient.post(
        "/refresh"
      );

      processQueue();

      return await apiClient(
        originalRequest
      );
    } catch (refreshError) {
      processQueue(refreshError);

      window.dispatchEvent(
        new CustomEvent("auth:logout")
      );

      return Promise.reject(
        refreshError
      );
    } finally {
      isRefreshing = false;
    }
  }
);