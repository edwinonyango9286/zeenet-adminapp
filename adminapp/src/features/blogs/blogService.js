import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog/getall`);
  return response.data;
};

const createBlog = async (blog) => {
  const response = await axios.post(`${base_url}blog/create`, blog, config);
  return response.data;
};

const updateBlog = async (blog) => {
  const response = await axios.put(
    `${base_url}blog/update/${blog.id}`,
    {
      title: blog.blogData.title,
      description: blog.blogData.description,
      category: blog.blogData.category,
      images: blog.blogData.images,
    },
    config
  );
  return response.data;
};


const getBlog = async (id) => {
  const response = await axios.get(`${base_url}blog/get/${id}`, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${base_url}blog/delete/${id}`, config);
  return response.data;
};

const blogsService = {
  getBlogs,
  createBlog,
  updateBlog,
  getBlog,
  deleteBlog,
};

export default blogsService;
