import { Button } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-bg">
      <img
        className="not-found-page"
        src="https://i.ibb.co/W6tgcKQ/softcodeon.gif"
      />
      <h1 className="not-found-error-text">
        Упс, похоже, мы не можем найти ресурс, который вы ищете.
      </h1>
      <div>
        <Link to="/">
          <Button
            style={{
              fontSize: 36,
              height: 80,
            }}
            type="primary"
            size="large"
          >
            Перейти в главную страницу
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
