import { ReactNode } from "react";
// import MenuTitle from "./header/MenuTitle";
// import Navbar from "./header/Navbar";
// import { Footer } from "./footer/Footer";
import Navbar from "./wrapper/Navbar";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <Navbar>{children}</Navbar>;
};

export default Wrapper;
