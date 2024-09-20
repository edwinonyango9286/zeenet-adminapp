import { config } from "../../utils/axiosConfig";
import { newRequest } from "../../utils/newRequest";


const getBrands = async () => {
  const response = await newRequest.get(`productbrand/getallbrands`);
  if (response.data) {
    return response.data;
  }
};

const createBrand = async (brand) => {
  const response = await newRequest.post(`productbrand/create`, brand, config);
  return response.data;
};
const updateBrand = async (brand) => {
  const response = await newRequest.put(
    `productbrand/update/${brand.id}`,
    { title: brand.brandData.title },
    config
  );
   if (response.data) {
     return response.data;
   }
};

const getBrand = async (id) => {
  const response = await newRequest.get(`productbrand/getabrand/${id}`, config);
   if (response.data) {
     return response.data;
   }
};

const deleteBrand = async (id) => {
  const response = await newRequest.delete(`productbrand/delete/${id}`, config);
   if (response.data) {
     return response.data;
   }
};

const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
