import { config } from "../../utils/axiosConfig";
import { newRequest } from "../../utils/newRequest";

const getBlogs = async () => {
  const response = await newRequest.get(`blog/getall`);
  return response.data;
};

const createBlog = async (blog) => {
  const response = await newRequest.post(`blog/create`, blog, config);
   if (response.data) {
     return response.data;
   }
};

const updateBlog = async (blog) => {
  const response = await newRequest.put(
    `blog/update/${blog.id}`,
    {
      title: blog.blogData.title,
      description: blog.blogData.description,
      category: blog.blogData.category,
      images: blog.blogData.images,
    },
    config
  );
   if (response.data) {
     return response.data;
   }
};

const getBlog = async (id) => {
  const response = await newRequest.get(`blog/get/${id}`, config);
  if (response.data) {
    return response.data;
  }
};

const deleteBlog = async (id) => {
  const response = await newRequest.delete(`blog/delete/${id}`, config);
 if (response.data) {
   return response.data;
 }
};

const blogsService = {
  getBlogs,
  createBlog,
  updateBlog,
  getBlog,
  deleteBlog,
};

export default blogsService;
