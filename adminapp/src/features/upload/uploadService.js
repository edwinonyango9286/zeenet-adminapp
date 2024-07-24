import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const uploadImg = async (data) => {
  const response = await axios.post(`${base_url}upload/`,data,config);
  return response.data;
};
const deleteImg = async (id) => {
  const response = await axios.delete(`${base_url}upload/delete/${id}`, config);
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
