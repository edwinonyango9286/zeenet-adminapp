import { config } from "../../utils/axiosConfig";
import { newRequest } from "../../utils/newRequest";

const getBlogCategory = async () => {
  const response = await newRequest.get(`blogcategory/getall`);
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

const updateBLogCat = async (blogCat) => {
  const response = await newRequest.put(
    `blogcategory/update/${blogCat.id}`,
    { title: blogCat.blogCatData.title },
    config
  );
   if (response.data) {
     return response.data;
   }
};

const getBlogCat = async (id) => {
  const response = await newRequest.get(`blogcategory/get/${id}`, config);
   if (response.data) {
     return response.data;
   }
};
const deleteBLogCat = async (id) => {
  const response = await newRequest.delete(`blogcategory/delete/${id}`, config);
   if (response.data) {
     return response.data;
   }
};

const bCategoryService = {
  getBlogCategory,
  createBlogCategory,
  deleteBLogCat,
  getBlogCat,
  updateBLogCat,
};

export default bCategoryService;
