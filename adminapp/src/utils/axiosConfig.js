const adminUser = localStorage.getItem("adminUser")
  ? JSON.parse(localStorage.getItem("adminUser"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${adminUser !== null ? adminUser.token : ""}`,
    Accept: "application/json",
  },
};
