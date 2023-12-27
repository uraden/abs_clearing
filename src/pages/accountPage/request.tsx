import api from "../../api";
import { httpClient } from "../../httpClient";


interface MyError {
    response?: {
      data?: unknown;
    };
  }

export const getAllAccounts = async () => {
    try{ 
        const request = await httpClient.get(api.allAccount(1))
        return request.data
    } catch (error: unknown) {
    const myError = error as MyError;
    if (myError.response) {
      console.log("requesttt: ", myError.response.data);
      return myError.response.data;
    }
  }
} 