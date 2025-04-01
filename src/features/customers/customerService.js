import { config } from "../../utils/axiosConfig";
import { newRequest } from "../../utils/newRequest";

const getCustomer = async () => {
  const response = await newRequest.get(`user/getallusers`, config);
   if (response.data) {
     return response.data;
   }
};

const customerService = {
  getCustomer,
};

export default customerService;
