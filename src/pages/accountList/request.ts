import api from "../../api";
import { httpClient } from "../../httpClient";

export const getAccountList = async () => {
  try {
    const request = await httpClient.post(api.orders());
    console.log('request: ', request);
    return request;
  } catch (error) {
    console.log("err: ", error);
  }
};
