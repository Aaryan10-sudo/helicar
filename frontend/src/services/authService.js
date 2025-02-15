import { toast } from "react-toastify";
import { loginApi, logoutApi } from "../api/authApi";

const login = async (email, password) => {
  try {
    const { data } = await loginApi(email, password);
    localStorage.setItem("token", data.token);
    localStorage.setItem("userRole", data.user?.role);
    localStorage.setItem("fullName", data.user?.fullname);
    return data;
  } catch (error) {
    toast.error("Login Error: " + error.message);
  }
};

const logout = async () => {
  await logoutApi(localStorage.getItem("token"));
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  localStorage.removeItem("fullName");
};

export { login, logout };
