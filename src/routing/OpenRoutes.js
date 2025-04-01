import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const OpenRoutes = ({ children }) => {
  const accessToken = Cookies.get("adminAccessToken");
  return accessToken === undefined ? (
    children
  ) : (
    <Navigate to={"/admin"} replace={true} />
  );
};
