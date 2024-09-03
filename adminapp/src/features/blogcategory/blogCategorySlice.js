import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bCategoryService from "./blogCategoryService";
import { toast } from "react-toastify";

export const getBlogCategory = createAsyncThunk(
  "bCategory/get-blog-categories",
  async (thunkAPI) => {
    try {
      return await bCategoryService.getBlogCategory();
    } catch (error) {
      return thunkAPI.rejectwithValue(error);
    }
  }
);

export const createBlogCategory = createAsyncThunk(
  "bCategory/create-blog-cat",
  async (blogCatData, thunkAPI) => {
    try {
      return await bCategoryService.createBlogCategory(blogCatData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getABlogCat = createAsyncThunk(
  "bCategory/get-blog-cat",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.getBlogCat(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateABLogCat = createAsyncThunk(
  "bCategory/update-blog-cat",
  async (blog, thunkAPI) => {
    try {
      return await bCategoryService.updateBLogCat(blog);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteABlogCat = createAsyncThunk(
  "bCategory/delete-blog-cat",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.deleteBLogCat(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  blogCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const blogCategorySlice = createSlice({
  name: "blogCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCategories = action.payload;
      })
      .addCase(getBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response?.data?.message;
      })
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlogCategory = action.payload;
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response?.data?.message;
      })
      .addCase(getABlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCatName = action.payload.title;
      })
      .addCase(getABlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response?.data?.message;
      })
      .addCase(updateABLogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateABLogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlogCat = action.payload;
      })
      .addCase(updateABLogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response?.data?.message;
      })
      .addCase(deleteABlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteABlogCat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBlogCat = action.payload;
      })
      .addCase(deleteABlogCat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response?.data?.message;
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogCategorySlice.reducer;
