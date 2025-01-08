import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const OpenRoutes = ({ children }) => {
  const token = Cookies.get("token");
  return token === undefined ? (
    children
  ) : (
    <Navigate to={"/admin"} replace={true} />
  );
};
