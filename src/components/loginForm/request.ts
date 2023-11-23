import axios from "axios";
import api from "../../api";

interface MyError {
  response?: {
    data?: unknown; 
  };
}

export const login = async (body: unknown) => {
  try {
    const request = await axios.post(api.login(), body);
    console.log('reqqq: ', request);
    return request.data;
  } catch (error: unknown) {
    const myError = error as MyError;
    if (myError.response) {
      console.log('requesttt: ', myError.response.data);
      return myError.response.data;
    }
  }
};
