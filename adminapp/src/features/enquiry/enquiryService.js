import { config } from "../../utils/axiosConfig";
import { newRequest } from "../../utils/newRequest";

const getEnquiries = async () => {
  const response = await newRequest.get(`enquiry/getall`);
  return response.data;
};

const createEnquiry = async (enquiry) => {
  const response = await newRequest.post(`enquiry/create`, enquiry, config);
  return response.data;
};

const updateEnquiry = async (enq) => {
  const response = await newRequest.put(
    `enquiry/update/${enq.id}`,
    { status: enq.enquiryData },
    config
  );
  return response.data;
};

const getEnquiry = async (id) => {
  const response = await newRequest.get(`enquiry/get/${id}`);
  return response.data;
};

const deleteEnquiry = async (id) => {
  const response = await newRequest.delete(`enquiry/delete/${id}`, config);
  return response.data;
};

const enquiryService = {
  getEnquiries,
  createEnquiry,
  getEnquiry,
  deleteEnquiry,
  updateEnquiry,
};

export default enquiryService;
