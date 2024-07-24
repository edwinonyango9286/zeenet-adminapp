import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getProducts = async () => {
  const response = await axios.get(`${base_url}products/allproducts`);
  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(
    `${base_url}products/create`,
    product,
    config
  );
  return response.data;
};

const updateProduct = async (product) => {
  const response = await axios.put(
    `${base_url}products/update/${product.id}`,
    {
      title: product.productData.title,
      description: product.productData.description,
      price: product.productData.price,
      category: product.productData.category,
      brand: product.productData.brand,
      quantity: product.productData.quantity,
      sold: product.productData.sold,
      color: product.productData.color,
      ratings: product.productData.ratings,
      totalrating: product.productData.totalrating,
      images: product.productData.images,
    },
    config
  );
  return response.data;
};


const getProduct = async (id) => {
  const response = await axios.get(
    `${base_url}products/getaproduct/${id}`,
    config
  );
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(
    `${base_url}products/delete/${id}`,
    config
  );
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
};

export default productService;
