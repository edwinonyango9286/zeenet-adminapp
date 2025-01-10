import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const OpenRoutes = ({ children }) => {
  const accessToken = Cookies.get("accessToken");
  return accessToken === undefined ? (
    children
  ) : (
    <Navigate to={"/admin"} replace={true} />
  );
};
