import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getCoupons = async () => {
  const response = await axios.get(`${base_url}coupon/getall`, config);
  return response.data;
};

const createCoupon = async (coupon) => {
  const response = await axios.post(`${base_url}coupon/create`, coupon, config);
  return response.data;
};
const updateCoupon = async (coupon) => {
  const response = await axios.put(
    `${base_url}coupon/update/${coupon.id}`,
    {
      name: coupon.couponData.name,
      expiry: coupon.couponData.expiry,
      discount: coupon.couponData.discount,
    },
    config
  );
  return response.data;
};

const getCoupon = async (id) => {
  const response = await axios.get(`${base_url}coupon/get/${id}`, config);
  return response.data;
};

const deleteCoupon = async (id) => {
  const response = await axios.delete(`${base_url}coupon/delete/${id}`, config);
  return response.data;
};

const couponService = {
  getCoupons,
  createCoupon,
  updateCoupon,
  getCoupon,
  deleteCoupon,
};

export default couponService;
