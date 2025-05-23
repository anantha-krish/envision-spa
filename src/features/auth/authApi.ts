import api from "../../api/axiosInstance";

export const loginAPI = async (data: { email: string; password: string }) => {
  const res = await api.post("/users/login", data);
  return res.data;
};

export const registerAPI = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  await api.post("/users/register", data);
};

export const refreshAccessTokenApi = async () => {
  const res = await api.post("/users/refresh");
  return res.data as { accessToken: string };
};
