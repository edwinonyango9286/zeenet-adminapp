import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";


  const getBlogCategory = async()=>{
    const response = await axios.get(`${base_url}blogcategory/getall`)
    return response.data;
}

const createBlogCategory = async (blogCat) => {
  const response = await axios.post(
    `${base_url}blogcategory/create`,
    blogCat,
    config
  );
  return response.data;
};


const updateBLogCat = async (blogCat) => {
  const response = await axios.put(
    `${base_url}blogcategory/update/${blogCat.id}`,
    { title: blogCat.blogCatData.title },
    config
  );  
  return response.data;
};

const getBlogCat = async (id) => {
  const response = await axios.get(
    `${base_url}blogcategory/get/${id}`,
    config
  );
  return response.data;
};
const deleteBLogCat = async (id) => {
  const response = await axios.delete(
    `${base_url}blogcategory/delete/${id}`,
    config
  );
  return response.data;
};


const bCategoryService ={
    getBlogCategory,
    createBlogCategory,
    deleteBLogCat,
    getBlogCat,
    updateBLogCat,
};


export default bCategoryService;