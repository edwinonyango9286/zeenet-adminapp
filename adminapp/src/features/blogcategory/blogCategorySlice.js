import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogCategoryService from "./blogCategoryService";
import { toast } from "react-toastify";

export const getAllBlogCategories = createAsyncThunk(
  "bCategory/get-blog-categories",
  async (thunkAPI) => {
    try {
      return await blogCategoryService.getBlogCategories();
    } catch (error) {
      return thunkAPI.rejectwithValue(error);
    }
  }
);

export const createBlogCategory = createAsyncThunk(
  "bCategory/create-blog-cat",
  async (blogCatData, thunkAPI) => {
    try {
      return await blogCategoryService.createBlogCategory(blogCatData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getABlogCat = createAsyncThunk(
  "bCategory/get-blog-cat",
  async (id, thunkAPI) => {
    try {
      return await blogCategoryService.getBlogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateABLogCat = createAsyncThunk(
  "bCategory/update-blog-cat",
  async (blog, thunkAPI) => {
    try {
      return await blogCategoryService.updateBLogCategory(blog);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteABlogCategory = createAsyncThunk(
  "bCategory/delete-blog-cat",
  async (id, thunkAPI) => {
    try {
      return await blogCategoryService.deleteBLogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  blogCategories: [],
  isError: {
    getAllBlogCategories: false,
    createBlogCategory: false,
    getABlogCat: false,
    updateABLogCat: false,
    deleteABlogCategory: false,
  },

  isLoading: {
    getAllBlogCategories: false,
    createBlogCategory: false,
    getABlogCat: false,
    updateABLogCat: false,
    deleteABlogCategory: false,
  },

  isSuccess: {
    getAllBlogCategories: false,
    createBlogCategory: false,
    getABlogCat: false,
    updateABLogCat: false,
    deleteABlogCategory: false,
  },
  message: "",
};

export const blogCategorySlice = createSlice({
  name: "blogCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogCategories.pending, (state) => {
        state.isLoading.getAllBlogCategories = true;
      })
      .addCase(getAllBlogCategories.fulfilled, (state, action) => {
        state.isLoading.getAllBlogCategories = false;
        state.isError.getAllBlogCategories = false;
        state.isSuccess.getAllBlogCategories = true;
        state.blogCategories = action.payload;
      })
      .addCase(getAllBlogCategories.rejected, (state, action) => {
        state.isLoading.getAllBlogCategories = false;
        state.isError.getAllBlogCategories = true;
        state.isSuccess.getAllBlogCategories = false;
        state.message = action?.payload?.response?.data?.message;
         if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "An unexpected error occurred. Please try again in a moment."
          );
        }
      })
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading.createBlogCategory = true;
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isLoading.createBlogCategory = false;
        state.isError.createBlogCategory = false;
        state.isSuccess.createBlogCategory = true;
        state.createdBlogCategory = action.payload;
        toast.success("Blog category create successfully.")
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isLoading.createBlogCategory = false;
        state.isError.createBlogCategory = true;
        state.isSuccess.createBlogCategory = false;
        state.message = action?.payload?.response?.data?.message;
          if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "An unexpected error occurred. Please try again in a moment."
          );
        }
      })
      .addCase(getABlogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlogCat.fulfilled, (state, action) => {
        state.isLoading.getABlogCat = false;
        state.isError.getABlogCat = false;
        state.isSuccess.getABlogCat = true;
        state.blogCatName = action.payload.title;

      })
      .addCase(getABlogCat.rejected, (state, action) => {
        state.isLoading.getABlogCat = false;
        state.isError.getABlogCat = true;
        state.isSuccess.getABlogCat = false;
        state.message = action?.payload?.response?.data?.message;
          if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "An unexpected error occurred. Please try again in a moment."
          );
        }
      })
      .addCase(updateABLogCat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateABLogCat.fulfilled, (state, action) => {
        state.isLoading.updateABLogCat = false;
        state.isError.updateABLogCat = false;
        state.isSuccess.updateABLogCat = true;
        state.updatedBlogCat = action.payload;
        toast.success("Blog updated successfully.")
      })
      .addCase(updateABLogCat.rejected, (state, action) => {
        state.isLoading.updateABLogCat = false;
        state.isError.updateABLogCat = true;
        state.isSuccess.updateABLogCat = false;
        state.message = action?.payload?.response?.data?.message;
          if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "An unexpected error occurred. Please try again in a moment."
          );
        }
        
      })
      .addCase(deleteABlogCategory.pending, (state) => {
        state.isLoading.deleteABlogCategory = true;
      })
      .addCase(deleteABlogCategory.fulfilled, (state, action) => {
        state.isLoading.deleteABlogCategory = false;
        state.isError.deleteABlogCategory = false;
        state.isSuccess.deleteABlogCategory = true;
        state.deletedBlogCat = action.payload;
        toast.success("Blog deleted successfully.")
      })
      .addCase(deleteABlogCategory.rejected, (state, action) => {
        state.isLoading.deleteABlogCategory = false;
        state.isError.deleteABlogCategory = true;
        state.isSuccess.deleteABlogCategory = false;
        state.message = action?.payload?.response?.data?.message;
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

export default blogCategorySlice.reducer;
