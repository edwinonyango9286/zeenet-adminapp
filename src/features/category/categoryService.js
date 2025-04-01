import { config } from "../../utils/axiosConfig";
import { newRequest } from "../../utils/newRequest";

const getCategories = async () => {
  const response = await newRequest.get(
    `productcategory/getallproductcategories`
  );
  if (response.data) {
    return response.data;
  }
};
const createCategory = async (category) => {
  const response = await newRequest.post(
    `productcategory/createproductcategory`,
    category,
    config
  );
   if (response.data) {
     return response.data;
   }
};

const updateCategory = async (category) => {
  const response = await newRequest.put(
    `productcategory/updateproductcategory/${category.id}`,
    { title: category.categoryData.title },
    config
  );
   if (response.data) {
     return response.data;
   }
};

const getCategory = async (id) => {
  const response = await newRequest.get(
    `productcategory/singleproductcategory/${id}`,
    config
  );
   if (response.data) {
     return response.data;
   }
};

const deleteCategory = async (id) => {
  const response = await newRequest.delete(
    `productcategory/deleteproductcategory/${id}`,
    config
  );
   if (response.data) {
     return response.data;
   }
};

const categoryService = {
  getCategories,
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory,
};

export default categoryService;
