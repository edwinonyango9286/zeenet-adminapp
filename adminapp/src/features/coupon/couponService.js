import { config } from "../../utils/axiosConfig";
import { newRequest } from "../../utils/newRequest";

const getCoupons = async () => {
  const response = await newRequest.get(`coupon/getall`, config);
  return response.data;
};

const createCoupon = async (coupon) => {
  const response = await newRequest.post(`coupon/create`, coupon, config);
  return response.data;
};
const updateCoupon = async (coupon) => {
  const response = await newRequest.put(
    `coupon/update/${coupon.id}`,
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
  const response = await newRequest.get(`coupon/get/${id}`, config);
  return response.data;
};

const deleteCoupon = async (id) => {
  const response = await newRequest.delete(`coupon/delete/${id}`, config);
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
