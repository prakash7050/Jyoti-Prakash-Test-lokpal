import { apiClient, setCsrfToken, clearCsrfToken } from "./axiosClient";

import {
  LoginPayload,
  NotificationPage,
  RegisterPayload,
  UserProfile,
} from "@/types";

type LoginResponse = {
  message: string;
  csrf_token: string;
};

// type RefreshResponse = {
//   message: string;
//   csrf_token: string;
// };

export const authApi = {
  register: (payload: RegisterPayload) =>
    apiClient.post<{ message: string }>("/register", payload),

  login: async (payload: LoginPayload) => {
    const response = await apiClient.post<LoginResponse>("/login", payload);

    // Store CSRF token returned by backend.
    if (response.data?.csrf_token) {
      setCsrfToken(response.data.csrf_token);
    }

    return response;
  },

  logout: async () => {
    const response = await apiClient.post<{ message: string }>("/logout");

    clearCsrfToken();

    return response;
  },

  profile: () => apiClient.get<UserProfile>("/user/profile"),
};

export const notificationsApi = {
  list: (cursor?: string | null) =>
    apiClient.get<NotificationPage>("/notifications", {
      params: cursor ? { cursor } : {},
    }),

  seedDemo: (count = 40) =>
    apiClient.post<{ message: string }>(
      `/notifications/seed-demo?count=${count}`,
    ),
};
