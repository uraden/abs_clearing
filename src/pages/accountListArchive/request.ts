import api from "../../api";
import { httpClient } from "../../httpClient";

export const getAccountArchiveList = async (params = null) => {
  try {
    const request = await httpClient.get(
      api.orderAll(),
      // @ts-ignore
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
