import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import categoryService from "./categoryService";
import { toast } from "react-toastify";

export const createCategory = createAsyncThunk(
  "pCategory/create-category",
  async (categoryData, thunkAPI) => {
    try {
      return await categoryService.createCategory(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProductCategories = createAsyncThunk(
  "pCategory/get-categories",
  async (thunkAPI) => {
    try {
      return await categoryService.getCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



export const getACategory = createAsyncThunk(
  "pCategory/get-category",
  async (id, thunkAPI) => {
    try {
      return await categoryService.getCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateACategory = createAsyncThunk(
  "pCategory/update-category",
  async (category, thunkAPI) => {
    try {
      return await categoryService.updateCategory(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteACategory = createAsyncThunk(
  "pCategory/delete-category",
  async (id, thunkAPI) => {
    try {
      return await categoryService.deleteCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  categories: [],
  isError: {
    getProductCategories:false,
    createCategory:false,
    getACategory:false,
    updateACategory:false,
    deleteACategory:false

  },
  isLoading: { 
    getProductCategories:false,
    createCategory:false,
    getACategory:false,
    updateACategory:false,
    deleteACategory:false},
  isSuccess: { getProductCategories:false,
    createCategory:false,
    getACategory:false,
    updateACategory:false,
    deleteACategory:false},
  message: "",
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategories.pending, (state) => {
        state.isLoading.getProductCategories = true;
      })
      .addCase(getProductCategories.fulfilled, (state, action) => {
        state.isLoading.getProductCategories = false;
        state.isError.getProductCategories = false;
        state.isSuccess.getProductCategories = true;
        state.categories = action?.payload;
      })

      .addCase(getProductCategories.rejected, (state, action) => {
        state.isLoading.getProductCategories = false;
        state.isError.getProductCategories = true;
        state.isSuccess.getProductCategories = false;
        state.message = action?.payload?.response?.data?.message;
           if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "An unexpected error occurred. Please try again in a moment."
          );
        }
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading.createCategory = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading.createCategory = false;
        state.isError.createCategory = false;
        state.isSuccess.createCategory = true;
        state.createdCategory = action?.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading.createCategory = false;
        state.isError.createCategory = true;
        state.isSuccess.createCategory = false;
        state.message = action?.payload?.response?.data?.message;
           if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "An unexpected error occurred. Please try again in a moment."
          );
        }
      })
      .addCase(getACategory.pending, (state) => {
        state.isLoading.getACategory = true;
      })
      .addCase(getACategory.fulfilled, (state, action) => {
        state.isLoading.getACategory = false;
        state.isError.getACategory = false;
        state.isSuccess.getACategory = true;
        state.categoryName = action?.payload?.title;
      })
      .addCase(getACategory.rejected, (state, action) => {
        state.isLoading.getACategory = false;
        state.isError.getACategory = true;
        state.isSuccess.getACategory = false;
        state.message = action?.payload?.response?.data?.message;
           if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "An unexpected error occurred. Please try again in a moment."
          );
        }
      })
      .addCase(updateACategory.pending, (state) => {
        state.isLoading.updateACategory = true;
      })
      .addCase(updateACategory.fulfilled, (state, action) => {
        state.isLoading.updateACategory = false;
        state.isError.updateACategory = false;
        state.isSuccess.updateACategory = true;
        state.updatedCategory = action?.payload;
      })
      .addCase(updateACategory.rejected, (state, action) => {
        state.isLoading.updateACategory = false;
        state.isError.updateACategory = true;
        state.isSuccess.updateACategory = false;
        state.message = action?.payload?.response?.data?.message;
           if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "An unexpected error occurred. Please try again in a moment."
          );
        }
      })
      .addCase(deleteACategory.pending, (state) => {
        state.isLoading.deleteACategory = true;
      })
      .addCase(deleteACategory.fulfilled, (state, action) => {
        state.isLoading.deleteACategory = false;
        state.isError.deleteACategory = false;
        state.isSuccess.deleteACategory = true;
        state.deletedCategory = action?.payload;
      })
      .addCase(deleteACategory.rejected, (state, action) => {
        state.isLoading.deleteACategory = false;
        state.isError.deleteACategory = true;
        state.isSuccess.deleteACategory = false;
        state.message.deleteACategory = action?.payload?.response?.data?.message;
           if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "An unexpected error occurred. Please try again in a moment."
          );
        }
      })
      .addCase(resetState, () => initialState);
  },
});

export default categorySlice.reducer;
