import { config } from "../../utils/axiosConfig";
import { newRequest } from "../../utils/newRequest";

const getUsers = async () => {
  const response = await newRequest.get(`user/getallusers`, config);
   if (response.data) {
     return response.data;
   }
};

const customerService = {
  getUsers,
};

export default customerService;
