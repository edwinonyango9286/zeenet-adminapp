import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import uploadService from "./uploadService";
import { toast } from "react-toastify";

export const uploadImg = createAsyncThunk(
  "upload/images",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadService.uploadImg(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const delImg = createAsyncThunk(
  "delete/images",
  async (id, thunkAPI) => {
    try {
      return await uploadService.deleteImg(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  images: [],
  isError: {uploadImg:false, delImg:false},
  isLoading: {uploadImg:false, delImg:false},
  isSuccess: {uploadImg:false, delImg:false},
  message: "",
};

export const uploadSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImg.pending, (state) => {
        state.isLoading.uploadImg = true;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isLoading.uploadImg = false;
        state.isError.uploadImg = false;
        state.isSuccess.uploadImg = true;
        state.images = action.payload;
        toast.success("Product Image uploaded.");
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading.uploadImg = false;
        state.isError.uploadImg = true;
        state.isSuccess.uploadImg = false;
        state.message = action?.payload?.response?.data?.message;
         if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "An unexpected error occurred. Please try again in a moment."
          );
        }
      })
      .addCase(delImg.pending, (state) => {
        state.isLoading.delImg = true;
      })
      .addCase(delImg.fulfilled, (state, action) => {
        state.isLoading.delImg = false;
        state.isError.delImg = false;
        state.isSuccess.delImg = true;
        state.images = [];
        toast.success("Product image deleted.");
      })
      .addCase(delImg.rejected, (state, action) => {
        state.isLoading.delImg = false;
        state.isError.delImg = true;
        state.isSuccess.delImg = false;
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

export default uploadSlice.reducer;
