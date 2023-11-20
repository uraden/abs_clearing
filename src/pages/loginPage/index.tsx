import { useEffect, useState } from "react";
import LoginForm from "../../components/loginForm";
import { Toaster, toast } from "react-hot-toast";

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
      <div className="glass">
        
        {/* @ts-ignore*/}
        <LoginForm setMessage={setMessage} />
      </div>
    </div>
    </>
  );
};

export default LoginPage;
