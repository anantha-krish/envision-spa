import axios from "axios";

export const loginAPI = async (data: { email: string; password: string }) => {
  const res = await axios.post("http://localhost:8080/users/login", data);
  return res.data;
};

export const registerAPI = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  await axios.post("/api/register", data);
};
