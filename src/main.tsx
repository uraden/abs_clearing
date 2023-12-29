import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd";
import russian from "antd/locale/ru_RU";
import 'dayjs/locale/ru';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ConfigProvider locale={russian}>
      <App />
    </ConfigProvider>
  </>
);
