import api from "../../api"
import { httpClient } from "../../httpClient"

export const makeOrder = async (body: any) => {
  try {
    const request = await httpClient.post(api.newOrder(), body);
    console.log('req: ', request);
  } catch (error) {
    console.log('err: ', error);
  }
}