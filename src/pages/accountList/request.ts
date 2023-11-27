import api from "../../api";
import { httpClient } from "../../httpClient";
import { useNavigate } from "react-router-dom";
import { message} from "antd";

export const useAccountList = () => {
  const navigate = useNavigate();

  const unauthorizedAccess = () => {
    message.error('Unauthorized access. Please login!')
  }

  const getAccountList = async () => {
    try {
      const request = await httpClient.post(api.orders());
      console.log('request: ', request);
      return request;
    } catch (error) {
      console.log("err: ", error);
      unauthorizedAccess();
      setTimeout(() => {
        navigate('/login');
        }, 1000);
    }
  };

  return { getAccountList };
};
