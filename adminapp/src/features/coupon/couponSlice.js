import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";
import { toast } from "react-toastify";

export const createCoupon = createAsyncThunk(
  "coupon/create-coupon",
  async (couponData, thunkAPI) => {
    try {
      return await couponService.createCoupon(couponData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCoupons = createAsyncThunk(
  "coupon/get-coupons",
  async (thunkAPI) => {
    try {
      return await couponService.getCoupons();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateACoupon = createAsyncThunk(
  "coupon/update-coupon",
  async (coupon, thunkAPI) => {
    try {
      return await couponService.updateCoupon(coupon);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getACoupon = createAsyncThunk(
  "coupon/get-coupon",
  async (id, thunkAPI) => {
    try {
      return await couponService.getCoupon(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteACoupon = createAsyncThunk(
  "coupon/delete-coupon",
  async (id, thunkAPI) => {
    try {
      return await couponService.deleteCoupon(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  coupons: [],
  coupon: null,
  isError: {
    getCoupons: false,
    createCoupon: false,
    getACoupon: false,
    updateACoupon: false,
    deleteACoupon: false,
  },
  isLoading: {
    getCoupons: false,
    createCoupon: false,
    getACoupon: false,
    updateACoupon: false,
    deleteACoupon: false,
  },
  isSuccess: {
    getCoupons: false,
    createCoupon: false,
    getACoupon: false,
    updateACoupon: false,
    deleteACoupon: false,
  },
  message: "",
};

export const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoupons.pending, (state) => {
        state.isLoading.getCoupons = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isLoading.getCoupons = false;
        state.isError.getCoupons = false;
        state.isSuccess.getCoupons = true;
        state.coupons = action?.payload;
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.isLoading.getCoupons = false;
        state.isError.getCoupons = true;
        state.isSuccess.getCoupons = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(action?.payload?.response?.data?.message);
      })
      .addCase(createCoupon.pending, (state) => {
        state.isLoading.createCoupon = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading.createCoupon = false;
        state.isError.createCoupon = false;
        state.isSuccess.createCoupon = true;
        state.createdCoupon = action?.payload;
        toast.success("Coupon created successfully.");
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading.createCoupon = false;
        state.isError.createCoupon = true;
        state.isSuccess.createCoupon = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(action?.payload?.response?.data?.message);
      })
      .addCase(getACoupon.pending, (state) => {
        state.isLoading.getACoupon = true;
      })
      .addCase(getACoupon.fulfilled, (state, action) => {
        state.isLoading.getACoupon = false;
        state.isError.getACoupon = false;
        state.isSuccess.getACoupon = true;
        state.coupon = action?.payload;
        state.couponName = action?.payload.name;
        state.couponExpiry = action?.payload.expiry;
        state.couponDiscount = action?.payload?.discount;
      })
      .addCase(getACoupon.rejected, (state, action) => {
        state.isLoading.getACoupon = false;
        state.isError.getACoupon = true;
        state.isSuccess.getACoupon = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(action?.payload?.response?.data?.message);
      })
      .addCase(updateACoupon.pending, (state) => {
        state.isLoading.updateACoupon = true;
      })
      .addCase(updateACoupon.fulfilled, (state, action) => {
        state.isLoading.updateACoupon = false;
        state.isError.updateACoupon = false;
        state.isSuccess.updateACoupon = true;
        state.updatedCoupon = action?.payload;
        toast.success("Coupon updated successfully.");
      })
      .addCase(updateACoupon.rejected, (state, action) => {
        state.isLoading.updateACoupon = false;
        state.isError.updateACoupon = true;
        state.isSuccess.updateACoupon = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(action?.payload?.response?.data?.message);
      })
      .addCase(deleteACoupon.pending, (state) => {
        state.isLoading.deleteACoupon = true;
      })
      .addCase(deleteACoupon.fulfilled, (state, action) => {
        state.isLoading.deleteACoupon = false;
        state.isError.deleteACoupon = false;
        state.isSuccess.deleteACoupon = true;
        state.deletedCoupon = action?.payload;
        toast.success("Coupon deleted successfully.");
      })
      .addCase(deleteACoupon.rejected, (state, action) => {
        state.isLoading.deleteACoupon = false;
        state.isError.deleteACoupon = true;
        state.isSuccess.deleteACoupon = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(action?.payload?.response?.data?.message);
      })
      .addCase(resetState, () => initialState);
  },
});

export default couponSlice.reducer;
