import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getUsers = async () => {
  const response = await axios.get(`${base_url}user/getallusers`, config);
  return response.data;
};

const customerService = {
  getUsers,
};

export default customerService;
