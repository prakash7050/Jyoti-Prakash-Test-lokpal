import { apiClient } from "./axiosClient";
import { LoginPayload, NotificationPage, RegisterPayload, UserProfile } from "@/types";

export const authApi = {
  register: (payload: RegisterPayload) => apiClient.post<{ message: string }>("/register", payload),
  login: (payload: LoginPayload) => apiClient.post<{ message: string }>("/login", payload),
  logout: () => apiClient.post<{ message: string }>("/logout"),
  profile: () => apiClient.get<UserProfile>("/user/profile"),
};

export const notificationsApi = {
  list: (cursor?: string | null) =>
    apiClient.get<NotificationPage>("/notifications", { params: cursor ? { cursor } : {} }),
  seedDemo: (count = 40) => apiClient.post<{ message: string }>(`/notifications/seed-demo?count=${count}`),
};
