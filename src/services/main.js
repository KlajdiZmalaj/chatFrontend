import axios from "axios";
import { endpoint, handleError } from "config";

export const instanceAxios = axios.create({
  baseURL: endpoint,
});

instanceAxios.interceptors.request.use(
  async (config) => {
    config.headers = {
      Accept: "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

instanceAxios.interceptors.response.use(
  (response) => {
    // console.log("response", response);
    return response;
  },
  (error) => handleError(error),
);

export const register = (username, password) => {
  return instanceAxios
    .post(`/register`, {
      username,
      password,
    })
    .catch((error) => ({ error }));
};

export const getRooms = () => {
  return instanceAxios.get("/getRooms").catch((error) => ({ error }));
};

export const getRoomData = (id) => {
  return instanceAxios.get(`/getRoomData/${id}`).catch((error) => ({ error }));
};

export const uploadFile = (file) => {
  let data = new FormData();
  data.append('image', file);
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };

  return instanceAxios
    .post(`/upload`,data , config)
    .catch((error) => ({ error }));
};
