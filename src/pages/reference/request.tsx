import api from "../../api";
import { httpClient } from "../../httpClient";

export const getBankWorkingHours = async () => {
  try {
    const request = await httpClient.get(
      api.bankWorkingHours(),
    );
    return request.data;
  } catch (error) {
    console.log("err: ", error);
  }
};