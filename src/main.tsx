import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./reduxStore/store.ts";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd";
import russian from "antd/locale/ru_RU";
import "dayjs/locale/ru";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ConfigProvider
      locale={russian}
      theme={{
        components: {
          Menu: {
            colorPrimary: '#f5222d',
            algorithm: true,
          },
        }
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </>
);
