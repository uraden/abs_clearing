import api from "../../api";
import { httpClient } from "../../httpClient";

export const getDraftDetails = async (params = null) => {
  try {
    const request = await httpClient.post(
      api.draftDetails(),
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

export const getDraftList = async (params = null) => {
  try {
    const request = await httpClient.post(
      api.draftList(),
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
