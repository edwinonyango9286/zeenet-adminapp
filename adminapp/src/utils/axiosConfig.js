import Cookies from "js-cookie";

const token = Cookies.get("token");

export const config = {
  headers: {
    Authorization: `Bearer ${token ? token : ""}`,
    Accept: "application/json",
  },
};
