import axios from "axios";
import api from "../../api";
import { IOperday } from "../interfaces";
import { getOperdays } from "./requests";

export const fetchOperDay = async () => {
  const response = await getOperdays();
  console.log(
    "ress: ",
    response.find((day: IOperday) => day.isActive)
  );
  return response.find((day: IOperday) => day.isActive);
};

export const getCurrency = async (currency: string, date: string) => {
  try {
    const request = await axios.get(api.currency(currency, date));
    console.log("date: ", request);
    return request.data;
  } catch (error) {
    console.log("err: ", error);
  }
};

export const formatNumberWithCommas = (amount: string, minimumFractionDigits = 2) => {
  const parts = Number(amount)
    .toFixed(minimumFractionDigits)
    .toString()
    .split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
