import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "@/api/authApi";
import { LoginPayload, RegisterPayload, UserProfile } from "@/types";

interface AuthState {
  user: UserProfile | null;
  status: "idle" | "loading" | "authenticated" | "error";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

function extractErrorMessage(err: unknown): string {
  const anyErr = err as { response?: { data?: { detail?: unknown } } };
  const detail = anyErr?.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail) && detail.length > 0) return detail[0].message ?? "Something went wrong";
  return "Something went wrong. Please try again.";
}

export const registerUser = createAsyncThunk("auth/register", async (payload: RegisterPayload, { rejectWithValue }) => {
  try {
    const res = await authApi.register(payload);
    return res.data.message;
  } catch (err) {
    return rejectWithValue(extractErrorMessage(err));
  }
});

export const loginUser = createAsyncThunk("auth/login", async (payload: LoginPayload, { rejectWithValue }) => {
  try {
    await authApi.login(payload);
    const profile = await authApi.profile();
    return profile.data;
  } catch (err) {
    return rejectWithValue(extractErrorMessage(err));
  }
});

export const fetchProfile = createAsyncThunk("auth/fetchProfile", async (_: void, { rejectWithValue }) => {
  try {
    const res = await authApi.profile();
    return res.data;
  } catch (err) {
    return rejectWithValue(extractErrorMessage(err));
  }
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await authApi.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    forceLogout(state) {
      state.user = null;
      state.status = "idle";
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<unknown>) => {
        state.status = "error";
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<unknown>) => {
        state.status = "error";
        state.error = action.payload as string;
        state.user = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.status = "idle";
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
      });
  },
});

export const { forceLogout, clearError } = authSlice.actions;
export default authSlice.reducer;
