import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

export const getProducts = createAsyncThunk(
  "product/get-products",
  async (thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/create-products",
  async (productData, thunkAPI) => {
    try {
      return await productService.createProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAProduct = createAsyncThunk(
  "product/get-product",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAProduct = createAsyncThunk(
  "product/update-product",
  async (product, thunkAPI) => {
    try {
      return await productService.updateProduct(product);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAProduct = createAsyncThunk(
  "product/delete-product",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  products: [],
  isError: {
    getProducts: false,
    createProduct: false,
    deleteAProduct: false,
    getAProduct: false,
    updateAProduct: false,
  },
  isLoading: {
    getProducts: false,
    createProduct: false,
    deleteAProduct: false,
    getAProduct: false,
    updateAProduct: false,
  },
  isSuccess: {
    getProducts: false,
    createProduct: false,
    deleteAProduct: false,
    getAProduct: false,
    updateAProduct: false,
  },
  message: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading.getProducts = true;
      })

      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading.getProducts = false;
        state.isError.getProducts = false;
        state.isSuccess.getProducts = true;
        state.products = action?.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading.getProducts = false;
        state.isError.getProducts = true;
        state.isSuccess.getProducts = false;
        state.message = action?.payload?.response?.data?.message;
           if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "An unexpected error occurred. Please try again in a moment."
          );
        }
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading.createProduct = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading.createProduct = false;
        state.isError.createProduct = false;
        state.isSuccess.createProduct = true;
        state.createdProduct = action?.payload;
        toast.success("Product created successfully.")
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading.createProduct = false;
        state.isError.createProduct = true;
        state.isSuccess.createProduct = false;
        state.message = action?.payload?.response?.data?.message;
           if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "An unexpected error occurred. Please try again in a moment."
          );
        }
      })
      .addCase(deleteAProduct.pending, (state) => {
        state.isLoading.deleteAProduct = true;
      })
      .addCase(deleteAProduct.fulfilled, (state, action) => {
        state.isLoading.deleteAProduct = false;
        state.isError.deleteAProduct = false;
        state.isSuccess.deleteAProduct = true;
        state.deletedProduct = action?.payload;
        toast.success("Product deleted successfully.")
      })
      .addCase(deleteAProduct.rejected, (state, action) => {
        state.isLoading.deleteAProduct = false;
        state.isError.deleteAProduct = true;
        state.isSuccess.deleteAProduct = false;
        state.message = action?.payload?.response?.data?.message;
           if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "An unexpected error occurred. Please try again in a moment."
          );
        }
      })
      .addCase(getAProduct.pending, (state) => {
        state.isLoading.getAProduct = true;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isLoading.getAProduct = false;
        state.isError.getAProduct = false;
        state.isSuccess.getAProduct = true;
        state.productName = action?.payload?.title;
        state.productDescription = action?.payload?.description;
        state.productPrice = action?.payload?.price;
        state.productCategory = action?.payload?.category;
        state.productBrand = action?.payload?.brand;
        state.productQuantity = action?.payload?.quantity;
        state.productImages = action?.payload?.images;
        state.productTag = action?.payload?.tags;
        state.productScreenSize = action?.payload?.screenSize;

      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.isLoading.getAProduct = false;
        state.isError.getAProduct = true;
        state.isSuccess.getAProduct = false;
        state.message = action?.payload?.response?.data?.message;
           if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "An unexpected error occurred. Please try again in a moment."
          );
        }
      })
      .addCase(updateAProduct.pending, (state) => {
        state.isLoading.updateAProduct = true;
      })
      .addCase(updateAProduct.fulfilled, (state, action) => {
        state.isLoading.updateAProduct = false;
        state.isError.updateAProduct = false;
        state.isSuccess.updateAProduct = true;
        state.updatedProduct = action?.payload;
        toast.success("Product updated successfully.")
      })
      .addCase(updateAProduct.rejected, (state, action) => {
        state.isLoading.updateAProduct = false;
        state.isError.updateAProduct = true;
        state.isSuccess.updateAProduct = false;
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

export default productSlice.reducer;
