import Cookies from "js-cookie";

const accessToken = Cookies.get("adminAccessToken");

export const config = {
  headers: {
    Authorization: `Bearer ${accessToken ? accessToken : ""}`,
    Accept: "application/json",
  },
};
