import { Navigate } from "react-router-dom";

// import ComponentWrapper from "../layouts";
import { IProtectedRoute } from "../assets/interfaces";
import Wrapper from "../layout";

const Protected = ({ children, isSignedIn }: IProtectedRoute) => {
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Wrapper>{children}</Wrapper>;
};
export default Protected;