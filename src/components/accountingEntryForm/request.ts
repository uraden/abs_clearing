import axios from "axios";
import api from "../../api";

interface MyError {
  response?: {
    data?: unknown; 
  };
}

export const editFormData = async (id: unknown) => {
  try {
    const request = await axios.get(api.editForm(id));
    console.log('req------>: ', request);
    return request.data;
  } catch (error: unknown) {
    const myError = error as MyError;
    if (myError.response) {
      console.log('requesttt: ', myError.response.data);
      return myError.response.data;
    }
  }
};
