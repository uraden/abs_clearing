import { Button } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-bg">
      {/* <img
        className="not-found-page"
        src="https://i.ibb.co/W6tgcKQ/softcodeon.gif"
      /> */}
      <h1 className="not-found-error-text">
        Упс, к сожалению у вас нету доступа к этой странице.
      </h1>
      <div style={{
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'
      }}>
        <Link to="/account-page">
          <Button
            style={{
              fontSize: 20,
              height: 50,
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
