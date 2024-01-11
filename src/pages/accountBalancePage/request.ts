import api from "../../api";
import { httpClient } from "../../httpClient";

interface MyError {
  response?: {
    data?: unknown;
  };
}

export const getAccountReport = async (params: unknown) => {
// export const getAccountReport = async (params: unknown) => {
  try {
    const request = await httpClient.get(api.accountReport(), {
      params,
    });
    console.log('reqqq: ', request.data);
    return request.data;
  } catch (error: unknown) {
    const myError = error as MyError;
    if (myError.response) {
      console.log('requesttt: ', myError.response.data);
      return myError.response.data;
    }
  }
};

