import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/admin-login`, userData);
  if (response.data) {
    localStorage.setItem("adminUser", JSON.stringify(response.data));
  }
  return response.data;
};

const getAllOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);
  return response.data;
};

const getOrder = async (id) => {
  const response = await axios.get(
    `${base_url}user/getasingleorder/${id}`,
    config
  );
  return response.data;
};

const updateOrderStatus = async (data) => {
  const response = await axios.put(
    `${base_url}user/update-order-status/${data.id}`,
    { status: data.status },
    config
  );
  return response.data;
};

const getMonthlyOrders = async (data) => {
  const response = await axios.get(
    `${base_url}user/getmonthwiseorderincome`,
    config
  );
  return response.data;
};
const getYearlyData = async () => {
  const response = await axios.get(`${base_url}user/getyearlyorders`, config);
  return response.data;
};

const authService = {
  login,
  getAllOrders,
  getOrder,
  getMonthlyOrders,
  getYearlyData,
  updateOrderStatus,
};

export default authService;
