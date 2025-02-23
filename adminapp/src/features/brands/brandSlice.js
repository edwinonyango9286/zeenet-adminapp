import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandService from "./brandService";
import { toast } from "react-toastify";

export const getBrands = createAsyncThunk(
  "brand/get-brands",
  async (thunkAPI) => {
    try {
      return await brandService.getBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createABrand = createAsyncThunk(
  "brand/create-brand",
  async (brandData, thunkAPI) => {
    try {
      return await brandService.createBrand(brandData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getABrand = createAsyncThunk(
  "brand/get-brand",
  async (id, thunkAPI) => {
    try {
      return await brandService.getBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateABrand = createAsyncThunk(
  "brand/update-brand",
  async (brand, thunkAPI) => {
    try {
      return await brandService.updateBrand(brand);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteABrand = createAsyncThunk(
  "brand/delete-brand",
  async (id, thunkAPI) => {
    try {
      return await brandService.deleteBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  brands: [],
  updatedBrand: null,
  isError: {
    getBrands: false,
    createABrand: false,
    getABrand: false,
    updateABrand: false,
    deleteABrand: false,
  },
  isLoading: {
    getBrands: false,
    createABrand: false,
    getABrand: false,
    updateABrand: false,
    deleteABrand: false,
  },
  isSuccess: {
    getBrands: false,
    createABrand: false,
    getABrand: false,
    updateABrand: false,
    deleteABrand: false,
  },
  message: "",
};

export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading.getBrands = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading.getBrands = false;
        state.isError.getBrands = false;
        state.isSuccess.getBrands = true;
        state.brands = action?.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading.getBrands = false;
        state.isError.getBrands = true;
        state.isSuccess.getBrands = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(action?.payload?.response?.data?.message);
      })
      .addCase(createABrand.pending, (state) => {
        state.isLoading.createABrand = true;
      })
      .addCase(createABrand.fulfilled, (state, action) => {
        state.isLoading.createABrand = false;
        state.isError.createABrand = false;
        state.isSuccess.createABrand = true;
        state.createdBrand = action?.payload;
        toast.success("Brand created successfully.");
      })
      .addCase(createABrand.rejected, (state, action) => {
        state.isLoading.createABrand = false;
        state.isError.createABrand = true;
        state.isSuccess.createABrand = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(action?.payload?.response?.data?.message);
      })
      .addCase(getABrand.pending, (state) => {
        state.isLoading.getABrand = true;
      })
      .addCase(getABrand.fulfilled, (state, action) => {
        state.isLoading.getABrand = false;
        state.isError.getABrand = false;
        state.isSuccess.getABrand = true;
        state.brandName = action?.payload?.title;
      })
      .addCase(getABrand.rejected, (state, action) => {
        state.isLoading.getABrand = false;
        state.isError.getABrand = true;
        state.isSuccess.getABrand = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(action?.payload?.response?.data?.message);
      })
      .addCase(updateABrand.pending, (state) => {
        state.isLoading.updateABrand = true;
      })
      .addCase(updateABrand.fulfilled, (state, action) => {
        state.isLoading.updateABrand = false;
        state.isError.updateABrand = false;
        state.isSuccess.updateABrand = true;
        state.updatedBrand = action?.payload;
        toast.success("Brand updated successfully.");
      })
      .addCase(updateABrand.rejected, (state, action) => {
        state.isLoading.updateABrand = false;
        state.isError.updateABrand = true;
        state.isSuccess.updateABrand = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(action?.payload?.response?.data?.message);
      })
      .addCase(deleteABrand.pending, (state) => {
        state.isLoading.deleteABrand = true;
      })
      .addCase(deleteABrand.fulfilled, (state, action) => {
        state.isLoading.deleteABrand = false;
        state.isError.deleteABrand = false;
        state.isSuccess.deleteABrand = true;
        state.deletedBrand = action?.payload;
        toast.success("Brand deleted successfully.");
      })
      .addCase(deleteABrand.rejected, (state, action) => {
        state.isLoading.deleteABrand = false;
        state.isError.deleteABrand = true;
        state.isSuccess.deleteABrand = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(action.payload.response.data.message);
      })
      .addCase(resetState, () => initialState);
  },
});

export default brandSlice.reducer;
