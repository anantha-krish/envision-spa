import api from "../../api/axiosInstance";
import { Designation, Role, UserProfile } from "../../types/models";

export const fetchManagersApi = async () => {
  const res = await api.get("http://localhost:8080/users?roleCode=MANAGER");
  return res.data as UserProfile[];
};
export const fetchDesignationsApi = async () => {
  const res = await api.get("http://localhost:8080/users/designations");
  return res.data as Designation[];
};
export const fetchRolesApi = async () => {
  const res = await api.get("http://localhost:8080/users/roles");
  return res.data as Role[];
};
