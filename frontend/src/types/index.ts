export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  created_at: string;
  updated_at: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirm_password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface Notification {
  id: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface NotificationPage {
  items: Notification[];
  next_cursor: string | null;
}

export interface ApiFieldError {
  field: string;
  message: string;
}

export interface ApiErrorBody {
  detail: string | ApiFieldError[];
}
