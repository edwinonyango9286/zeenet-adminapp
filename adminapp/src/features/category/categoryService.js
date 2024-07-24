import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getCategories = async () => {
  const response = await axios.get(
    `${base_url}productcategory/getallproductcategories`
  );
  return response.data;
};
const createCategory = async (category) => {
  const response = await axios.post(
    `${base_url}productcategory/createproductcategory`,
    category,
    config
  );
  return response.data;
};

const updateCategory = async (category) => {
  const response = await axios.put(
    `${base_url}productcategory/updateproductcategory/${category.id}`,
    { title: category.categoryData.title },
    config
  );
  return response.data;
};

const getCategory = async (id) => {
  const response = await axios.get(
    `${base_url}productcategory/singleproductcategory/${id}`,
    config
  );
  return response.data;
};

const deleteCategory = async (id) => {
  const response = await axios.delete(
    `${base_url}productcategory/deleteproductcategory/${id}`,
    config
  );
  return response.data;
};

const categoryService = {
  getCategories,
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory,
};

export default categoryService;
