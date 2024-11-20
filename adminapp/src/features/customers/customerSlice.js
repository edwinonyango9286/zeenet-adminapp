import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import customerService from "./customerService";

export const getAllCustomers = createAsyncThunk(
  "customer/get-customers",
  async (thunkAPI) => {
    try {
      return await customerService.getCustomer();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  customers: [],
  isError: { getAllCustomers: false },
  isLoading: { getAllCustomers: false },
  isSuccess: { getAllCustomers: false },
  message: "",
};

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomers.pending, (state) => {
        state.isLoading.getAllCustomers = true;
      })
      .addCase(getAllCustomers.fulfilled, (state, action) => {
        state.isLoading.getAllCustomers = false;
        state.isError.getAllCustomers = false;
        state.isSuccess.getAllCustomers = true;
        state.customers = action.payload || [];
      })
      .addCase(getAllCustomers.rejected, (state, action) => {
        state.isLoading.getAllCustomers = false;
        state.isError.getAllCustomers = true;
        state.isSuccess.getAllCustomers = false;
        state.message = action?.payload?.response?.data?.message;
      })
      .addCase(resetState, () => initialState);
  },
});

export default customerSlice.reducer;
