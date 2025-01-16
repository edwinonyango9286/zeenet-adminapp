import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const PrivateRoutes = ({ children }) => {
  const accessToken = Cookies.get("adminAccessToken");
  return accessToken !== undefined ? children : <Navigate to={"/"} replace />;
};
