import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    console.log('err before: ', error);
    // if (error.response.status === 401) {
    //   console.log('err after: ', error.response);
    //   // return window.location.href = '/login';
    //   localStorage.clear()
    // }
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      window.location.href = '/login';
    }
  });
