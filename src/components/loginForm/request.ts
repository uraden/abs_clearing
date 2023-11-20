import axios from "axios";
import api from "../../api";

export const login = async (body: any) => {
  try {
    const request = await axios.post(api.login(), body);
    console.log('reqqq: ', request);
    return request.data;
  } catch (error) {
    // console.log('err: ', error);
    if (error) {
      console.log('requesttt: ', error.response.data);
      return error.response.data;
    }
  }
};
