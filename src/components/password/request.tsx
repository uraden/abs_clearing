import api from "../../api"
import { httpClient } from "../../httpClient";


interface MyError {
    response?: {
      data?: unknown;
    };
  }
  
export const changePassword = async (body: unknown) => {
    try {
      const request = await httpClient.post(api.editPassword(), body);
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
  