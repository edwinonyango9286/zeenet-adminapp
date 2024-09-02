import { config } from "../../utils/axiosConfig";
import { newRequest } from "../../utils/newRequest";

const login = async (userData) => {
  const response = await newRequest.post(`user/admin-login`, userData);
  if (response.data) {
    localStorage.setItem("adminUser", JSON.stringify(response.data));
  }
  return response.data;
};

const forgotPasswordToken = async (data) => {
  const response = await newRequest.post(
    `user/forgot-password-admin-token`,
    data
  );
  if (response.data) {
    return response.data;
  }
};

const resetAdminPassword = async (data) => {
  const response = await newRequest.put(`user/reset-password/${data.token}`, {
    password: data.password,
  });
  if (response.data) {
    return response.data;
  }
};

const getAllOrders = async () => {
  const response = await newRequest.get(`user/getallorders`, config);
  return response.data;
};

const getOrder = async (id) => {
  const response = await newRequest.get(`user/getasingleorder/${id}`, config);
  return response.data;
};

const updateOrderStatus = async (data) => {
  const response = await newRequest.put(
    `user/update-order-status/${data.id}`,
    { status: data.status },
    config
  );
  return response.data;
};

const getMonthlyOrders = async () => {
  const response = await newRequest.get(`user/getmonthwiseorderincome`, config);
  return response.data;
};
const getYearlyData = async () => {
  const response = await newRequest.get(`user/getyearlyorders`, config);
  return response.data;
};

const authService = {
  login,
  getAllOrders,
  getOrder,
  getMonthlyOrders,
  getYearlyData,
  updateOrderStatus,
  forgotPasswordToken,
  resetAdminPassword,
};

export default authService;
