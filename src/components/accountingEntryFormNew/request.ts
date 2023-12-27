import axios from "axios";
import api from "../../api";
import { httpClient } from "../../httpClient";

interface MyError {
  response?: {
    data?: unknown;
  };
}

export const editFormData = async (id: unknown) => {
  try {
    const request = await httpClient.get(api.editForm(id));
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

export const getActiveList = async (params: unknown) => {
  try {
    const request = await axios.get(api.accountActives(), {
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

export const getActiveInfo = async (params: unknown) => {
  try {
    const request = await axios.get(api.accountInfo(), {
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
    const request = await axios.post(api.order(), body);
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
    const request = await axios.get(api.singleOrder(orderId));
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
