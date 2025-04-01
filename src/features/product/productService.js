import { config } from "../../utils/axiosConfig";
import { newRequest } from "../../utils/newRequest";

const getProducts = async () => {
  const response = await newRequest.get(`products/allproducts`);
 if (response.data) {
   return response.data;
 }};

const createProduct = async (product) => {
  const response = await newRequest.post(`products/create`, product, config);
 if (response.data) {
   return response.data;
 }};

const updateProduct = async (product) => {
  const response = await newRequest.put(
    `products/update/${product.id}`,
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
 if (response.data) {
   return response.data;
 }};

const getProduct = async (id) => {
  const response = await newRequest.get(`products/getaproduct/${id}`, config);
 if (response.data) {
   return response.data;
 }};

const deleteProduct = async (id) => {
  const response = await newRequest.delete(`products/delete/${id}`, config);
 if (response.data) {
   return response.data;
 }};

const productService = {
  getProducts,
  createProduct,
  updateProduct,
  getProduct,
  deleteProduct,
};

export default productService;
