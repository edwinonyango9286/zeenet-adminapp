import { config } from "../../utils/axiosConfig";
import { newRequest } from "../../utils/newRequest";

const uploadImg = async (data) => {
  const response = await newRequest.post(`upload/`, data, config);
  if (response.data) {
    return response.data;
  }
};
const deleteImg = async (id) => {
  const response = await newRequest.delete(`upload/delete/${id}`, config);
  if (response.data) {
    return response.data;
  }
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
