import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import ComponentWrapper from "../layouts";
import { IProtectedRoute } from "../assets/interfaces";
import Wrapper from "../layout";

const Protected = ({ children }: IProtectedRoute) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/login");
    }
  }, [location.pathname]);

  return <Wrapper>{children}</Wrapper>;
};
export default Protected;
