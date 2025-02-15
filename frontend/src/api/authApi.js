import apiClient from "./apiClient";

const loginApi = async (email, password) => {
  return await apiClient.post("/user/login", { email, password });
};

const forgotPassword = async (email) => {
  return await apiClient.post("/user/forgot-password", { email });
};

const resetPassword = async (token, newPassword) => {
  return await apiClient.patch(
    "/user/reset-password",
    {
      password: newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

const logoutApi = async (token) => {
  return await apiClient.post(
    "/user/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export { loginApi, forgotPassword, resetPassword, logoutApi };
