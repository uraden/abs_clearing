import { useEffect, useState } from "react";
import LoginForm from "../../components/loginForm";
import { Toaster, toast } from "react-hot-toast";

import loginImage from "../../../public/images/login-image.png"
const LoginPage = () => {
  const [message, setMessage] = useState('')
  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [message]);
  return (
    <>
    <Toaster
      toastOptions={{
        duration: 4000,
      }}
    />
    <div className="login-wrapper">
      <div className="image-div">
        <img src={loginImage} className="loginImage"/>
      </div>
      <div className="glass">
        
        {/* @ts-ignore*/}
        <LoginForm setMessage={setMessage} />
      </div>
    </div>
    </>
  );
};

export default LoginPage;
