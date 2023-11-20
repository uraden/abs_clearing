import LoginForm from "../../components/loginForm";
import loginImage from "../../../public/images/login-image.png"
const LoginPage = () => {
  return (
    <div className="login-wrapper">
      <div className="image-div">
        <img src={loginImage} className="loginImage"/>
      </div>
      <div className="glass">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
