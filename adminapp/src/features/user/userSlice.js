import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import userService from "./userService";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const signInUser = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      return await userService.signIn(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// Block a user =>blocked users should not be able to make purchases.
export const blockAUser = createAsyncThunk(
  "auth/block-user",
  async (userId, thunkAPI) => {
    try {
      return await userService.blockUser(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// unblock a user => when a user is unblocked he/she should be able to make purchases.const
export const unblockAUser = createAsyncThunk(
  "auth/unblock-user",
  async (userId, thunkAPI) => {
    try {
      return await userService.unblockUser(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAUser = createAsyncThunk(
  "auth/delete-user",
  async (userId, thunkAPI) => {
    try {
      return await userService.deleteUser(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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

export const getAllOrders = createAsyncThunk(
  "order/get-all-orders",
  async (thunkAPI) => {
    try {
      return await userService.getOrders();
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

export const logoutAUser = createAsyncThunk("user/logout", async (thunkAPI) => {
  try {
    return await userService.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetUserState = createAction("Reset_all");

const initialState = {
  adminUser: null,
  orders: [],
  deletedUser: null,
  isError: {
    signInUser: false,
    resetPassword: false,
    resetPasswordToken: false,
    UpdateAnOrder: false,
    deleteAUser: false,
    getAllOrders: false,
    getAsingleOrder: false,
    getMonthWiseOrders: false,
    getYearlyStatistics: false,
    logoutAUser: false,
  },
  isLoading: {
    signInUser: false,
    resetPassword: false,
    resetPasswordToken: false,
    UpdateAnOrder: false,
    getAllOrders: false,
    deleteAUser: false,
    getAsingleOrder: false,
    getMonthWiseOrders: false,
    getYearlyStatistics: false,
    logoutAUser: false,
  },
  isSuccess: {
    signInUser: false,
    resetPassword: false,
    resetPasswordToken: false,
    UpdateAnOrder: false,
    deleteAUser: false,
    getAllOrders: false,
    getAsingleOrder: false,
    getMonthWiseOrders: false,
    getYearlyStatistics: false,
    logoutAUser: false,
  },
  message: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.isLoading.signInUser = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isError.signInUser = false;
        state.isLoading.signInUser = false;
        state.isSuccess.signInUser = true;
        state.adminUser = action?.payload;
        Cookies.set("adminFirstName", action?.payload?.firstName, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("adminLastName", action?.payload?.lastName);
        Cookies.set("adminEmail", action?.payload?.email, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("adminAvatar", action?.payload?.avatar, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("adminAccessToken", action?.payload?.accessToken, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isError.signInUser = true;
        state.isSuccess.signInUser = false;
        state.isLoading.signInUser = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(action?.payload?.response?.data?.message);
      })
      .addCase(resetPasswordToken.pending, (state) => {
        state.isLoading.resetPasswordToken = true;
      })
      .addCase(resetPasswordToken.fulfilled, (state, action) => {
        state.isError.resetPasswordToken = false;
        state.isLoading.resetPasswordToken = false;
        state.isSuccess.resetPasswordToken = true;
        state.message = action?.payload?.message;
        toast.success(action?.payload?.message);
      })
      .addCase(resetPasswordToken.rejected, (state, action) => {
        state.isError.resetPasswordToken = true;
        state.isSuccess.resetPasswordToken = false;
        state.isLoading.resetPasswordToken = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(action?.payload?.response?.data?.message);
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
        toast.error(action?.payload?.response?.data?.message);
      })
      .addCase(blockAUser.pending, (state) => {
        state.isLoading.blockAUser = true;
      })
      .addCase(blockAUser.fulfilled, (state, action) => {
        state.isLoading.blockAUser = false;
        state.isSuccess.blockAUser = true;
        state.isError.blockAUser = false;
        state.blockedUser = action?.payload;
        toast.success(action?.payload?.response?.data?.message);
      })
      .addCase(blockAUser.rejected, (state, action) => {
        state.isLoading.blockAUser = false;
        state.isSuccess.blockAUser = false;
        state.isError.blockAUser = true;
        state.message = action?.payload?.response?.data?.message;
        toast.error(action?.payload?.response?.data?.message);
      })

      .addCase(unblockAUser.pending, (state) => {
        state.isLoading.unblockAUser = true;
      })
      .addCase(unblockAUser.fulfilled, (state, action) => {
        state.isLoading.unblockAUser = false;
        state.isSuccess.unblockAUser = true;
        state.isError.unblockAUser = false;
        state.unblockedUser = action?.payload;
        toast.success(action?.payload?.response?.data?.message);
      })

      .addCase(unblockAUser.rejected, (state, action) => {
        state.isLoading.unblockAUser = false;
        state.isSuccess.unblockAUser = false;
        state.isError.unblockAUser = true;
        state.message = action?.payload?.response?.data?.message;
        toast.error(action?.payload?.response?.data?.message);
      })

      .addCase(deleteAUser.pending, (state) => {
        state.isLoading.deleteAUser = true;
      })
      .addCase(deleteAUser.fulfilled, (state, action) => {
        state.isLoading.deleteAUser = false;
        state.isSuccess.deleteAUser = true;
        state.isError.deleteAUser = false;
        state.deletedUser = action?.payload;
        toast.success(action?.payload?.response?.data?.message);
      })

      .addCase(deleteAUser.rejected, (state, action) => {
        state.isLoading.deleteAUser = false;
        state.isSuccess.deleteAUser = false;
        state.isError.deleteAUser = true;
        state.message = action?.payload?.response?.data?.message;
        toast.error(action?.payload?.response?.data?.message);
      })

      .addCase(getAllOrders.pending, (state) => {
        state.isLoading.getAllOrders = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading.getAllOrders = false;
        state.isError.getAllOrders = false;
        state.isSuccess.getAllOrders = true;
        state.orders = action?.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isError.getAllOrders = true;
        state.isLoading.getAllOrders = false;
        state.isSuccess.getAllOrders = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(action?.payload?.response?.data?.message);
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
        toast.error(action?.payload?.response?.data?.message);
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
        toast.error(action?.payload?.response?.data?.message);
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
        toast.error(action?.payload?.response?.data?.message);
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
        toast.error(action?.payload?.response?.data?.message);
      })
      .addCase(logoutAUser.pending, (state) => {
        state.isLoading.logoutAUser = true;
      })
      .addCase(logoutAUser.fulfilled, (state, action) => {
        state.isLoading.logoutAUser = false;
        state.isError.logoutAUser = false;
        state.isSuccess.logoutAUser = true;
        Cookies.remove("adminFirstName");
        Cookies.remove("adminLastName");
        Cookies.remove("adminEmail");
        Cookies.remove("adminAvatar");
        Cookies.remove("adminAccessToken");
        state.message = action?.payload?.response?.data?.message;
      })
      .addCase(logoutAUser.rejected, (state, action) => {
        state.isError.logoutAUser = true;
        state.isLoading.logoutAUser = false;
        state.isSuccess.logoutAUser = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(action?.payload?.response?.data?.message);
      })
      .addCase(resetUserState, () => initialState);
  },
});

export default userSlice.reducer;
