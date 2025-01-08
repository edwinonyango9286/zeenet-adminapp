import { config } from "../../utils/axiosConfig";
import { newRequest } from "../../utils/newRequest";

const signIn = async (userData) => {
  const response = await newRequest.post(`user/admin-signin`, userData);
  if (response.data) {
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

const getOrders = async () => {
  const response = await newRequest.get(`user/getallorders`, config);
  if (response.data) {
    return response.data;
  }
};

const getOrder = async (id) => {
  const response = await newRequest.get(`user/getasingleorder/${id}`, config);
  if (response.data) {
    return response.data;
  }
};

const updateOrderStatus = async (data) => {
  const response = await newRequest.put(
    `user/update-order-status/${data.id}`,
    { status: data.status },
    config
  );
  if (response.data) {
    return response.data;
  }
};

const getMonthlyOrders = async () => {
  const response = await newRequest.get(`user/getmonthwiseorderincome`, config);
  if (response.data) {
    return response.data;
  }
};
const getYearlyData = async () => {
  const response = await newRequest.get(`user/getyearlyorders`, config);
  if (response.data) {
    return response.data;
  }
};

const userService = {
  signIn,
  getOrders,
  getOrder,
  getMonthlyOrders,
  getYearlyData,
  updateOrderStatus,
  forgotPasswordToken,
  resetAdminPassword,
};

export default userService;
