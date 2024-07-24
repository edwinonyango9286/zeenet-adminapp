import { Navigate,  } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const getUserFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  return getUserFromLocalStorage?.token !== undefined ? (
    children
  ) : (
    <Navigate to={"/"} replace />
  );
};


