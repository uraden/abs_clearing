import api from "../../api";
import { httpClient } from "../../httpClient";

interface MyError {
  response?: {
    data?: unknown;
  };
}

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

export const getActiveList = async () => {
  // export const getActiveList = async (params: unknown) => {
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

// export const createOrder = async (body: unknown) => {
//   try {
//     const request = await httpClient.post(api.newOrder(), body);
//     console.log("req: ", request);
//     return request.data;
//   } catch (error: unknown) {
//     const myError = error as MyError;
//     if (myError.response) {
//       console.log("requesttt: ", myError.response.data);
//       return myError.response.data;
//     }
//   }
// };

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
};



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
};
