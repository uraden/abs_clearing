import api from "../../api";
import { httpClient } from "../../httpClient";

export const getAccounts = async () => {
  try {
    const request = await httpClient.get(api.accountAll());
    return request.data;
  } catch (error) {
    console.log("err: ", error);
  }
};

export const getAccountReportData = async (params: unknown) => {
  console.log("arap: ", params);
  try {
    const request = await httpClient.get(api.repotrIo(), { params });
    return request.data;
  } catch (error) {
    console.log("err: ", error);
  }
};
