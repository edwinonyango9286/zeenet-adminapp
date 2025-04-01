import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogsService from "./blogService";
import { toast } from "react-toastify";

export const getBlogs = createAsyncThunk("blog/get-blogs", async (thunkAPI) => {
  try {
    return await blogsService.getBlogs();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createBlog = createAsyncThunk(
  "blog/create-blog",
  async (blogData, thunkAPI) => {
    try {
      return await blogsService.createBlog(blogData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getABlog = createAsyncThunk(
  "blog/get-blog",
  async (id, thunkAPI) => {
    try {
      return await blogsService.getBlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateABlog = createAsyncThunk(
  "blog/update-blog",
  async (blog, thunkAPI) => {
    try {
      return await blogsService.updateBlog(blog);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteABlog = createAsyncThunk(
  "blog/delete-blog",
  async (id, thunkAPI) => {
    try {
      return await blogsService.deleteBlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  blogs: [],
  isError: {
    getBlogs: false,
    createBlog: false,
    getABlog: false,
    updateABlog: false,
    deleteABlog: false,
  },
  isLoading: {
    getBlogs: false,
    createBlog: false,
    getABlog: false,
    updateABlog: false,
    deleteABlog: false,
  },
  isSuccess: {
    getBlogs: false,
    createBlog: false,
    getABlog: false,
    updateABlog: false,
    deleteABlog: false,
  },
  message: "",
};

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading.getBlogs = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading.getBlogs = false;
        state.isError.getBlogs = false;
        state.isSuccess.getBlogs = true;
        state.blogs = action.payload;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading.getBlogs = false;
        state.isError.getBlogs = true;
        state.isSuccess.getBlogs = false;
        state.message = action?.payload?.response?.data?.message;
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading.createBlog = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading.createBlog = false;
        state.isError.createBlog = false;
        state.isSuccess.createBlog = true;
        state.createdBlog = action.payload;
        toast.success("Blog post has been created successfully created.");
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading.createBlog = false;
        state.isError.createBlog = true;
        state.isSuccess.createBlog = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(action?.payload?.response?.data?.message);
      })
      .addCase(getABlog.pending, (state) => {
        state.isLoading.getABlog = true;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isLoading.getABlog = false;
        state.isError.getABlog = false;
        state.isSuccess.getABlog = true;
        state.blogName = action.payload.title;
        state.blogDescription = action.payload.description;
        state.blogCategory = action.payload.category;
        state.blogImages = action.payload.images;
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isLoading.getABlog = false;
        state.isError.getABlog = true;
        state.isSuccess.getABlog = false;
        state.message = action?.payload?.response?.data?.message;
      })
      .addCase(updateABlog.pending, (state) => {
        state.isLoading.updateABlog = true;
      })
      .addCase(updateABlog.fulfilled, (state, action) => {
        state.isLoading.updateABlog = false;
        state.isError.updateABlog = false;
        state.isSuccess.updateABlog = true;
        state.updatedBlog = action.payload;
        toast.success("Blog post has been updated successfully created.");
      })
      .addCase(updateABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(action.payload.response.data.message);
      })
      .addCase(deleteABlog.pending, (state) => {
        state.isLoading.deleteABlog = true;
      })
      .addCase(deleteABlog.fulfilled, (state, action) => {
        state.isLoading.deleteABlog = false;
        state.isError.deleteABlog = false;
        state.isSuccess.deleteABlog = true;
        state.deletedBlog = action.payload;
      })
      .addCase(deleteABlog.rejected, (state, action) => {
        state.isLoading.deleteABlog = false;
        state.isError.deleteABlog = true;
        state.isSuccess.deleteABlog = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(action.payload.response.data.message);
      })

      .addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
