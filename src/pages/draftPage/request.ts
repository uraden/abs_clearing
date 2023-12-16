import api from "../../api";
import { httpClient } from "../../httpClient";

export const getAccountArchiveList = async (params = null) => {
  try {
    const request = await httpClient.post(
      api.orders(),
      params
        ? {
            params,
          }
        : ""
    );
    return request.data;
  } catch (error) {
    console.log("err: ", error);
  }
};
