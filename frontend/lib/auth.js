import Cookies from "js-cookie";
import api from "./api";

export const login = async (email, password) => {
  const inputData = { email, password };
  const res = await api.post(`/auth/login`, inputData);

  const { token, user } = res.data;
  Cookies.set("access_token", token, { expires: 7 });
  Cookies.set("user", JSON.stringify(user), { expires: 7 });
  return res.data;
};

export const register = async (name, email, password) => {
  const inputData = { name, email, password };
  const res = await api.post(`/auth/register`, inputData);
  return res.data;
};

export const logout = () => {
  Cookies.remove("access_token");
  Cookies.remove("user");
  window.location.href = "/login";
};

export const getUser = () => {
  const user = Cookies.get("user");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => !!Cookies.get("access_token");
