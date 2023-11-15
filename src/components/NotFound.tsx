import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>
        Not Found, we will implement design later don't worry about it ::::
      </h1>
      <Button
        type="primary"
        color="#1677ff"
        onClick={() => navigate('/')}
      >
        Go back to main menu
      </Button>
    </div>
  );
};

export default NotFound;
