import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// The JWT itself lives in an httpOnly cookie the browser sends automatically
// (withCredentials) -- JS never touches it, which is the whole point of using
// httpOnly cookies instead of localStorage for the token.
export const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

// Double-submit CSRF: the csrf_token cookie is deliberately NOT httpOnly so this
// can read it and echo it back as a header; the backend checks cookie === header.
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const method = (config.method || "get").toUpperCase();
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    const signedCsrf = readCookie("csrf_token");
    if (signedCsrf) {
      const rawToken = signedCsrf.split(".")[0];
      config.headers = config.headers ?? {};
      config.headers["X-CSRF-Token"] = rawToken;
    }
  }
  return config;
});

let isRefreshing = false;
let pendingQueue: Array<() => void> = [];

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

    const isAuthEndpoint = originalRequest?.url?.includes("/login") || originalRequest?.url?.includes("/register");

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Queue this request until the in-flight refresh resolves, so we don't
        // fire N parallel refresh calls when several requests 401 at once.
        return new Promise((resolve) => {
          pendingQueue.push(() => resolve(apiClient(originalRequest)));
        });
      }

      isRefreshing = true;
      try {
        await apiClient.post("/refresh");
        pendingQueue.forEach((run) => run());
        pendingQueue = [];
        return apiClient(originalRequest);
      } catch (refreshError) {
        pendingQueue = [];
        window.dispatchEvent(new CustomEvent("auth:logout"));
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
