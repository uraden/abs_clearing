import api from "../../api";
import { httpClient } from "../../httpClient";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export const useMakeOrder = () => {
  const navigate = useNavigate();

  const unauthorizedAccess = () => {
    message.error("Unauthorized access. Please login!");
  };

  const makeOrder = async (body: unknown) => {
    try {
      const request = await httpClient.post(api.newOrder(), body);
      console.log("req: ", request);
    } catch (error) {
      console.log("err: ", error);
      setTimeout(() => {
        unauthorizedAccess();
        navigate("/login");
      }, 500);
    }
  };

  return { makeOrder };
};

interface MyError {
  response?: {
    data?: unknown;
  };
}

export const createOrder = async (body: unknown) => {
  try {
    const request = await httpClient.post(api.newOrder(), body);
    console.log("req: ", request);
    return request.data;
  } catch (error: unknown) {
    const myError = error as MyError;
    if (myError.response) {
      console.log("requesttt: ", myError.response.data);
      return myError.response.data;
    }
  }
};

export const changeStatus = async (body: unknown) => {
  try {
    const request = await httpClient.post(api.statusOrder(), body);
    console.log("req: ", request);
    return request.data;
  } catch (error: unknown) {
    const myError = error as MyError;
    if (myError.response) {
      console.log("requesttt: ", myError.response.data);
      return myError.response.data;
    }
  }
}

export const getPaymentPurposes = async () => {
  try {
    const request = await httpClient.get(api.paymentPurposeList());
    console.log("req: ", request);
    return request.data;
  } catch (error: unknown) {
    const myError = error as MyError;
    if (myError.response) {
      console.log("requesttt: ", myError.response.data);
      return myError.response.data;
    }
  }
}