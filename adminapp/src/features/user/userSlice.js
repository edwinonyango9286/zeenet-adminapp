import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import userService from "./userService";
import { toast } from "react-toastify";

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await userService.login(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetPasswordToken = createAsyncThunk(
  "user/reset-password-token",
  async (data, thunkAPI) => {
    try {
      return await userService.forgotPasswordToken(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/reset-password",
  async (data, thunkAPI) => {
    try {
      return await userService.resetAdminPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/get-orders",
  async (thunkAPI) => {
    try {
      return await userService.getAllOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const UpdateAnOrder = createAsyncThunk(
  "order/update-order-status",
  async (data, thunkAPI) => {
    try {
      return await userService.updateOrderStatus(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAsingleOrder = createAsyncThunk(
  "order/get-order",
  async (id, thunkAPI) => {
    try {
      return await userService.getOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMonthWiseOrders = createAsyncThunk(
  "order/get-monthwise-orders",
  async (thunkAPI) => {
    try {
      return await userService.getMonthlyOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getYearlyStatistics = createAsyncThunk(
  "order/get-year-statics",
  async (thunkAPI) => {
    try {
      return await userService.getYearlyData();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetUserState = createAction("Reset_all");

const adminUser = localStorage.getItem("adminUser")
  ? JSON.parse(localStorage.getItem("adminUser"))
  : null;

const initialState = {
  adminUser: adminUser,
  orders: [],
  isError: {
    login: false,
    resetPassword: false,
    resetPasswordToken: false,
    UpdateAnOrder: false,
    getOrders: false,
    getAsingleOrder: false,
    getMonthWiseOrders: false,
    getYearlyStatistics: false,
  },
  isLoading: {
    login: false,
    resetPassword: false,
    resetPasswordToken: false,
    UpdateAnOrder: false,
    getOrders: false,
    getAsingleOrder: false,
    getMonthWiseOrders: false,
    getYearlyStatistics: false,
  },
  isSuccess: {
    login: false,
    resetPassword: false,
    resetPasswordToken: false,
    UpdateAnOrder: false,
    getOrders: false,
    getAsingleOrder: false,
    getMonthWiseOrders: false,
    getYearlyStatistics: false,
  },
  message: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading.login = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isError.login = false;
        state.isLoading.login = false;
        state.isSuccess.login = true;
        state.adminUser = action?.payload;
        localStorage.setItem("adminToken", action?.payload?.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isError.login = true;
        state.isSuccess.login = false;
        state.isLoading.login = false;
        state.message = action.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "We are having a problem logging you in. Please check your internet connection or try again in a moment."
          );
        }
      })
      .addCase(resetPasswordToken.pending, (state) => {
        state.isLoading.resetPasswordToken = true;
      })
      .addCase(resetPasswordToken.fulfilled, (state, action) => {
        state.isError.resetPasswordToken = false;
        state.isLoading.resetPasswordToken = false;
        state.isSuccess.resetPasswordToken = true;
        state.token = action?.payload;
        toast.success(
          "A password reset link has been sent to your email. Please check your email to proceed with reseting your password."
        );
      })
      .addCase(resetPasswordToken.rejected, (state, action) => {
        state.isError.resetPasswordToken = true;
        state.isSuccess.resetPasswordToken = false;
        state.isLoading.resetPasswordToken = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "We are having a problem sending you a password reset email. Please check your internet connection or try again in a moment."
          );
        }
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading.resetPassword = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isError.resetPassword = false;
        state.isLoading.resetPassword = false;
        state.isSuccess.resetPassword = true;
        state.newPassword = action?.payload;
        toast.success(
          "Your password has been reset. Please login with your new credentials."
        );
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isError.resetPassword = true;
        state.isSuccess.resetPassword = false;
        state.isLoading.resetPassword = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "We are having a problem updating your password. Please check your internet connection or try again in a moment."
          );
        }
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading.getOrders = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading.getOrders = false;
        state.isError.getOrders = false;
        state.isSuccess.getOrders = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError.getOrders = true;
        state.isLoading.getOrders = false;
        state.isSuccess.getOrders = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "We are having a problem fetching orders. Please check your internet connection or try again in a moment."
          );
        }
      })
      .addCase(getAsingleOrder.pending, (state) => {
        state.isLoading.getAsingleOrder = true;
      })
      .addCase(getAsingleOrder.fulfilled, (state, action) => {
        state.isLoading.getAsingleOrder = false;
        state.isError.getAsingleOrder = false;
        state.isSuccess.getAsingleOrder = true;
        state.singleOrder = action?.payload;
      })
      .addCase(getAsingleOrder.rejected, (state, action) => {
        state.isError.getAsingleOrder = true;
        state.isLoading.getAsingleOrder = false;
        state.isSuccess.getAsingleOrder = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "We are having a problem fetching the order. Please check your internet connection or try again in a moment."
          );
        }
      })
      .addCase(getMonthWiseOrders.pending, (state) => {
        state.isLoading.getMonthWiseOrders = true;
      })
      .addCase(getMonthWiseOrders.fulfilled, (state, action) => {
        state.isLoading.getMonthWiseOrders = false;
        state.isError.getMonthWiseOrders = false;
        state.isSuccess.getMonthWiseOrders = true;
        state.monthlyData = action?.payload;
      })
      .addCase(getMonthWiseOrders.rejected, (state, action) => {
        state.isError.getMonthWiseOrders = true;
        state.isLoading.getMonthWiseOrders = false;
        state.isSuccess.getMonthWiseOrders = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "We are having a problem fetching monthly orders. Please check your internet connection or try again in a moment."
          );
        }
      })
      .addCase(getYearlyStatistics.pending, (state) => {
        state.isLoading.getYearlyStatistics = true;
      })
      .addCase(getYearlyStatistics.fulfilled, (state, action) => {
        state.isLoading.getYearlyStatistics = false;
        state.isError.getYearlyStatistics = false;
        state.isSuccess.getYearlyStatistics = true;
        state.yearlyData = action?.payload;
      })
      .addCase(getYearlyStatistics.rejected, (state, action) => {
        state.isError.getYearlyStatistics = true;
        state.isLoading.getYearlyStatistics = false;
        state.isSuccess.getYearlyStatistics = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "We are having a problem fetching yearly orders. Please check your internet connection or try again in a moment."
          );
        }
      })
      .addCase(UpdateAnOrder.pending, (state) => {
        state.isLoading.UpdateAnOrder = true;
      })
      .addCase(UpdateAnOrder.fulfilled, (state, action) => {
        state.isLoading.UpdateAnOrder = false;
        state.isError.UpdateAnOrder = false;
        state.isSuccess.UpdateAnOrder = true;
        state.updatedOrder = action?.payload;
      })
      .addCase(UpdateAnOrder.rejected, (state, action) => {
        state.isError.UpdateAnOrder = true;
        state.isLoading.UpdateAnOrder = false;
        state.isSuccess.UpdateAnOrder = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "We are having a problem fetching updating the orders. Please check your internet connection or try again in a moment."
          );
        }
      })
      .addCase(resetUserState, () => initialState);
  },
});

export default userSlice.reducer;
