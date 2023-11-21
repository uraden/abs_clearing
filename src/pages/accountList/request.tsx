import { httpClient } from "../../httpClient";
import api from '../../api';

export const getAccountList = async () => {
  try {
    const request = await httpClient.post(api.orders());
    console.log('request: ', request);
  } catch (error) {
    console.log('err: ', error);
  }
};
