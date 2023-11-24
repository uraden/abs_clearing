import api from "../../api"
import { httpClient } from "../../httpClient"
import { useNavigate } from "react-router-dom";
import { message} from "antd";


export const useMakeOrder = () => {

  const navigate = useNavigate();

  const unauthorizedAccess = () => {
    message.error('Unauthorized access. Please login!')
  }

 const makeOrder = async (body: unknown) => {
  try {
    const request = await httpClient.post(api.newOrder(), body);
    console.log('req: ', request);
  } catch (error) {
    console.log('err: ', error);
    setTimeout(() => {
      unauthorizedAccess()
      navigate('/login');
      }, 500);
  }
}

return {makeOrder}
}