import axios from "axios";

export const newRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});
