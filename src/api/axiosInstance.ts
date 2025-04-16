import axios from "axios";
import { store } from "../store";
import { requestEnd, requestStart } from "../features/app/appSlice";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.request.use(
  (config) => {
    store.dispatch(requestStart());
    return config;
  },
  (error) => {
    store.dispatch(requestEnd());
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    store.dispatch(requestEnd());
    return response;
  },
  (error) => {
    store.dispatch(requestEnd());
    return Promise.reject(error);
  }
);

export default api;
