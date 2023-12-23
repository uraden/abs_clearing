import api from "../../api"
import { httpClient } from "../../httpClient";

interface MyError {
    response?: {
      data?: unknown; 
    };
  }
  
  export const reportData = async (id: unknown) => {
    try {
      const request = await httpClient.get(api.report(id));
      console.log('req: ', request);
      return request.data;
    } catch (error: unknown) {
      const myError = error as MyError;
      if (myError.response) {
        console.log('requesttt: ', myError.response.data);
        return myError.response.data;
      }
    }
  };