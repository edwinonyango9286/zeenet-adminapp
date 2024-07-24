import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getEnquiries = async () => {
  const response = await axios.get(`${base_url}enquiry/getall`);
  return response.data;
};

const createEnquiry = async (enquiry) => {
  const response = await axios.post(
    `${base_url}enquiry/create`,
    enquiry,
    config
  );
  return response.data;
};

const updateEnquiry = async (enq) => {
  const response = await axios.put(
    `${base_url}enquiry/update/${enq.id}`,
    { status: enq.enquiryData },
    config
  );
  return response.data;
};

const getEnquiry = async (id) => {
  const response = await axios.get(`${base_url}enquiry/get/${id}`);
  return response.data;
};

const deleteEnquiry = async (id) => {
  const response = await axios.delete(
    `${base_url}enquiry/delete/${id}`,
    config
  );
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
