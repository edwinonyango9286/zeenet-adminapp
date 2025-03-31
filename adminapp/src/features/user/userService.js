import { config } from "../../utils/axiosConfig";
import { newRequest } from "../../utils/newRequest";

const signIn = async (userData) => {
  const response = await newRequest.post(`auth/manager-signin`, userData);
  if (response.data) {
  }
  return response.data;
};

const forgotPasswordToken = async (data) => {
  const response = await newRequest.post(
    `user/reset-password-admin-token`,
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
// Block a user =>blocked users should not be able to make purchases.
const blockUser = async (userId) => {
  const response = await newRequest.put(`user/block-user/${userId}`, config);
  if (response.data) {
    return response.data;
  }
};

// unblock a user => when a user is unblocked he/she should be able to make purchases.const
const unblockUser = async (userId) => {
  const response = await newRequest.put(`user/unblock-user/${userId}`, config);
  if (response.data) {
    return response.data;
  }
};

const deleteUser = async (userId) => {
  const response = await newRequest.delete(`user/delete/${userId}`, config);
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

const logout = async () => {
  const response = await newRequest.put(`auth/logout`);
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
  blockUser,
  unblockUser,
  deleteUser,
  logout,
};

export default userService;
