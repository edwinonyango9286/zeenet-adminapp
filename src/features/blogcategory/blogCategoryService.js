import { config } from "../../utils/axiosConfig";
import { newRequest } from "../../utils/newRequest";

const getBlogCategories = async () => {
  const response = await newRequest.get(`blogcategory/getblogcategories`);
  if (response.data) {
    return response.data;
  }
};

const createBlogCategory = async (blogCat) => {
  const response = await newRequest.post(
    `blogcategory/create`,
    blogCat,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const updateBLogCategory = async (blogCat) => {
  const response = await newRequest.put(
    `blogcategory/update/${blogCat.id}`,
    { title: blogCat.blogCatData.title },
    config
  );
  if (response.data) {
    return response.data;
  }
};

const getBlogCategory = async (id) => {
  const response = await newRequest.get(`blogcategory/get/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
const deleteBLogCategory = async (id) => {
  const response = await newRequest.delete(`blogcategory/delete/${id}`, config);
  if (response.data) {
    return response.data;
  }
};

const blogCategoryService = {
  getBlogCategories,
  createBlogCategory,
  updateBLogCategory,
  getBlogCategory,
  deleteBLogCategory,
};

export default blogCategoryService;
