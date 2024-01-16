import api from "../../api";
import { httpClient } from "../../httpClient";

export const getBankDirectory = async () => {
  try {
    const request = await httpClient.get(
      api.bankDirectory(),
    );
    return request.data;
  } catch (error) {
    console.log("err: ", error);
  }
};