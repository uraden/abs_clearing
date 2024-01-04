import axios from "axios";
import api from "../../api";
import { httpClient } from "../../httpClient";

interface MyError {
  response?: {
    data?: unknown;
  };
}

export const editFormData = async (body: unknown) => {
  try {
    const request = await httpClient.put(api.orderChange(), body);
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

export const getActiveList = async () => {
  try {
    const request = await httpClient.get(api.accountActives());
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

export const getActiveInfo = async (params: unknown) => {
  try {
    const request = await httpClient.get(api.accountInfo(), {
      params,
    });
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

export const createNewOrder = async (body: unknown) => {
  try {
    const request = await httpClient.post(api.order(), body);
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

export const getSingleOrder = async (orderId: number) => {
  try {
    const request = await httpClient.get(api.singleOrder(orderId));
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

export const getOrderStatuses = async () => {
  try {
    const request = await httpClient.get(api.orderStatus());
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