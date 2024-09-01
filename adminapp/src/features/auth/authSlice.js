import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetPasswordToken = createAsyncThunk(
  "user/reset-password-token",
  async (data, thunkAPI) => {
    try {
      return await authService.forgotPasswordToken(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/reset-password",
  async (data, thunkAPI) => {
    try {
      return await authService.resetAdminPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/get-orders",
  async (thunkAPI) => {
    try {
      return await authService.getAllOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const UpdateAnOrder = createAsyncThunk(
  "order/update-order-status",
  async (data, thunkAPI) => {
    try {
      return await authService.updateOrderStatus(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAsingleOrder = createAsyncThunk(
  "order/get-order",
  async (id, thunkAPI) => {
    try {
      return await authService.getOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMonthWiseOrders = createAsyncThunk(
  "order/get-monthwise-orders",
  async (thunkAPI) => {
    try {
      return await authService.getMonthlyOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getYearlyStatistics = createAsyncThunk(
  "order/get-year-statics",
  async (thunkAPI) => {
    try {
      return await authService.getYearlyData();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const adminUser = localStorage.getItem("adminUser")
  ? JSON.parse(localStorage.getItem("adminUser"))
  : null;

const initialState = {
  adminUser: adminUser,
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.adminUser = action.payload;
        localStorage.setItem("adminToken", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload.response.data.message;
      })
      .addCase(resetPasswordToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPasswordToken.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload;
        toast.success("A password reset token has been sent to your email.");
      })
      .addCase(resetPasswordToken.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
        toast.error(action.payload.response.data.message);
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.newPassword = action.payload;
        toast.success("Your password has been updated. Proceed to login.");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })

      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload.response.data.message;
      })
      .addCase(getAsingleOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAsingleOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleOrder = action.payload;
      })
      .addCase(getAsingleOrder.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload.response.data.message;
      })
      .addCase(getMonthWiseOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthWiseOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.monthlyData = action.payload;
      })
      .addCase(getMonthWiseOrders.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getYearlyStatistics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getYearlyStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.yearlyData = action.payload;
      })
      .addCase(getYearlyStatistics.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload.response.data.message;
      })
      .addCase(UpdateAnOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateAnOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedOrder = action.payload;
      })
      .addCase(UpdateAnOrder.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload.response.data.message;
      })
      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
