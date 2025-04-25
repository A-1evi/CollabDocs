import axios from "axios";
import { BASE_URL } from "../../constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        userData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({
          message: error.response.data?.message || "Failed to fetch user data.",
          status: error.response.status,
          data: error.response.data,
        });
      } else {
        return rejectWithValue(error.message || "An unexpected error occurred");
      }
    }
  }
);

export const register = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/signup`,
        userData
      );
      return response.data;
    } catch (error) {
      console.log("API Error:", error.response?.data || error.message);
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({
          message: error.response.data?.message || "Failed to Signup correctly",
          status: error.response.status,
          data: error.response.data,
        });
      } else {
        return rejectWithValue(error.message || "An unexpected error occurred");
      }
    }
  }
);

export const googleAuth = createAsyncThunk(
  "auth/google",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/google`,
        userData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Google Auth Error:",
        error.response?.data || error.message
      );
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({
          message:
            error.response.data?.message ||
            "Failed to authenticate with Google",
          status: error.response.status,
          data: error.response.data,
        });
      } else {
        return rejectWithValue(
          error.message ||
            "An unexpected error occurred during Google authentication"
        );
      }
    }
  }
);

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: "",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login Failed";
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration Failed";
      })
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Google Authentication Failed";
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
