import axios from "axios";
import api from '../../api';

export const login = async (body: any) => {
  try {
    const request = await axios.post(api.login(), body);
    console.log('request: ', request);
  } catch (error) {
    console.log('err: ', error);
  }
};