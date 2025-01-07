import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const PrivateRoutes = ({ children }) => {
  const token = Cookies.get("token");
  return token !== undefined ? children : <Navigate to={"/"} replace />;
};
