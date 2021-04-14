import axios from "axios";
import { endpoint, handleError } from "config";

export const instanceAxios = axios.create({
  baseURL: endpoint,
});

instanceAxios.interceptors.request.use(
  async (config) => {
    // console.log("req config", config);
    config.headers = {
      Accept: "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instanceAxios.interceptors.response.use(
  (response) => {
    // console.log("response", response);
    return response;
  },
  (error) => handleError(error)
);

export const getRooms = () => {
  return instanceAxios.get("/getRooms").catch((error) => ({ error }));
};

export const getRoomData = (id) => {
  return instanceAxios.get(`/getRoomData/${id}`).catch((error) => ({ error }));
};
