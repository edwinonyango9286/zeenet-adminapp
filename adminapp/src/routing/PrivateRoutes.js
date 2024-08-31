import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const adminUser = JSON.parse(localStorage.getItem("adminUser"));
  return adminUser?.token !== undefined ? (
    children
  ) : (
    <Navigate to={"/"} replace />
  );
};
