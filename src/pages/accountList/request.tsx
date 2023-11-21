import { httpClient } from "../../httpClient";
import api from '../../api';
import axios from "axios";

export const getAccountList = async () => {
  try {
    const request = await axios.post(api.orders());
    console.log('request: ', request);
  } catch (error) {
    console.log('err: ', error);
  }
};
