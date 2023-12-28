import axios from "axios";

export const httpClient = axios.create();

httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // @ts-ignore
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
