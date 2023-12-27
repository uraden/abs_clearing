import api from "../../api";
import { httpClient } from "../../httpClient";

interface MyError {
    response?: {
      data?: unknown;
    };
  }

  export const getSingleDebit = async (params: unknown) => {
    try{
        const request = await httpClient.get(api.accountDebit(), {
          params
        });
        return request.data;
      } catch (error: unknown) {
    const myError = error as MyError;
    if (myError.response) {
      console.log("requesttt: ", myError.response.data);
      return myError.response.data;
    }
  }
} 


export const getSingleCredit = async (params: unknown) => {
    try{ 
        const request = await httpClient.get(api.accountCredit(), {
            params
        })
        console.log('CREDIT')
        return request.data
    } catch (error: unknown) {
    const myError = error as MyError;
    if (myError.response) {
      console.log("requesttt: ", myError.response.data);
      return myError.response.data;
    }
  }
} 