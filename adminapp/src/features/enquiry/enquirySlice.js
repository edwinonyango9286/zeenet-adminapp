import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";
import { toast } from "react-toastify";

export const getAllEnquiries = createAsyncThunk(
  "enquiry/get-enquries",
  async (thunkAPI) => {
    try {
      return await enquiryService.getEnquiries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAEnquiry = createAsyncThunk(
  "enquiry/create-enqury",
  async (enquiryData, thunkAPI) => {
    try {
      return await enquiryService.createEnquiry(enquiryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAEnquiry = createAsyncThunk(
  "enquiry/get-enquiry",
  async (id, thunkAPI) => {
    try {
      return await enquiryService.getEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAEnquiry = createAsyncThunk(
  "enquiry/update-enquiry",
  async (enq, thunkAPI) => {
    try {
      return await enquiryService.updateEnquiry(enq);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAEnquiry = createAsyncThunk(
  "enquiry/delete-enquiry",
  async (id, thunkAPI) => {
    try {
      return await enquiryService.deleteEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  enquiries: [],
  isError: {
    getAllEnquiries: false,
    createAEnquiry: false,
    updateAEnquiry: false,
    getAEnquiry: false,
    deleteAEnquiry: false,
  },
  isLoading: {
    getAllEnquiries: false,
    createAEnquiry: false,
    updateAEnquiry: false,
    getAEnquiry: false,
    deleteAEnquiry: false,
  },
  isSuccess: {
    getAllEnquiries: false,
    createAEnquiry: false,
    updateAEnquiry: false,
    getAEnquiry: false,
    deleteAEnquiry: false,
  },
  message: "",
};

export const enquirySlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEnquiries.pending, (state) => {
        state.isLoading.getAllEnquiries = true;
      })
      .addCase(getAllEnquiries.fulfilled, (state, action) => {
        state.isLoading.getAllEnquiries = false;
        state.isError.getAllEnquiries = false;
        state.isSuccess.getAllEnquiries = true;
        state.enquiries = action?.payload;
      })
      .addCase(getAllEnquiries.rejected, (state, action) => {
        state.isLoading.getAllEnquiries = false;
        state.isError.getAllEnquiries = true;
        state.isSuccess.getAllEnquiries = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "An unexpected error occurred. Please try again in a moment."
          );
        }
      })
      .addCase(createAEnquiry.pending, (state) => {
        state.isLoading.createAEnquiry = true;
      })
      .addCase(createAEnquiry.fulfilled, (state, action) => {
        state.isLoading.createAEnquiry = false;
        state.isError.createAEnquiry = false;
        state.isSuccess.createAEnquiry = true;
        state.createdEnquiry = action?.payload;
        toast.success("Enquiry created successfully.");
      })
      .addCase(createAEnquiry.rejected, (state, action) => {
        state.isLoading.createAEnquiry = false;
        state.isError.createAEnquiry = true;
        state.isSuccess.createAEnquiry = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "An unexpected error occurred. Please try again in a moment."
          );
        }
      })
      .addCase(updateAEnquiry.pending, (state) => {
        state.isLoading.updateAEnquiry = true;
      })
      .addCase(updateAEnquiry.fulfilled, (state, action) => {
        state.isLoading.updateAEnquiry = false;
        state.isError.updateAEnquiry = false;
        state.isSuccess.updateAEnquiry = true;
        state.updatedEnquiry = action?.payload;
        toast.success("Enquiry updated successfully.");
      })
      .addCase(updateAEnquiry.rejected, (state, action) => {
        state.isLoading.updateAEnquiry = false;
        state.isError.updateAEnquiry = true;
        state.isSuccess.updateAEnquiry = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "An unexpected error occurred. Please try again in a moment."
          );
        }
      })
      .addCase(getAEnquiry.pending, (state) => {
        state.isLoading.getAEnquiry = true;
      })
      .addCase(getAEnquiry.fulfilled, (state, action) => {
        state.isLoading.getAEnquiry = false;
        state.isError.getAEnquiry = false;
        state.isSuccess.getAEnquiry = true;
        state.enquiryName = action?.payload?.name;
        state.enquiryEmail = action?.payload?.email;
        state.enquiryPhone = action?.payload?.phoneNumber;
        state.enquiry = action?.payload?.enquiry;
        state.enquiryStatus = action?.payload?.status;
      })
      .addCase(getAEnquiry.rejected, (state, action) => {
        state.isLoading.getAEnquiry = false;
        state.isError.getAEnquiry = true;
        state.isSuccess.getAEnquiry = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "An unexpected error occurred. Please try again in a moment."
          );
        }
      })
      .addCase(deleteAEnquiry.pending, (state) => {
        state.isLoading.deleteAEnquiry = true;
      })
      .addCase(deleteAEnquiry.fulfilled, (state, action) => {
        state.isLoading.deleteAEnquiry = false;
        state.isError.deleteAEnquiry = false;
        state.isSuccess.deleteAEnquiry = true;
        state.deletedEnquiry = action?.payload;
        toast.success("Enquiry deleted successfully.");
      })
      .addCase(deleteAEnquiry.rejected, (state, action) => {
        state.isLoading.deleteAEnquiry = false;
        state.isError.deleteAEnquiry = true;
        state.isSuccess.deleteAEnquiry = false;
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

export default enquirySlice.reducer;
