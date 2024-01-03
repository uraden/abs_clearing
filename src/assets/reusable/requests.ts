import api from "../../api";
import { httpClient } from "../../httpClient";

export const getProfile = async () => {
  try {
    const request = await httpClient.get(api.profile());
    return request.data;
  } catch (error) {
    console.log("err: ", error);
  }
};

export const getOperdays = async () => {
  try {
    const request = await httpClient.get(api.operDays());
    return request.data;
  } catch (error) {
    console.log("err: ", error);
  }
};
