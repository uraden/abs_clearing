import axios from "axios";
import api from "../../api";

interface MyError {
  response?: {
    data?: unknown;
    status?: number;
  };
}

export const login = async (body: unknown) => {
  try {
    const request = await axios.post(api.login(), body);
    console.log("reqqq: ", request);
    return request.data;
  } catch (error: unknown) {
    const myError = error as MyError;
    console.log("reqqq: ", myError);
    if (myError.response && myError.response.status) {
      return myError.response;
    }
  }
};
