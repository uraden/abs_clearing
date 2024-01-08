import { IOperday } from "../interfaces";
import { getOperdays } from "./requests"

export const fetchOperDay = async () => {
    const response = await getOperdays();
    console.log('ress: ', response.find((day: IOperday) => day.isActive));
    return response.find((day: IOperday) => day.isActive);
}