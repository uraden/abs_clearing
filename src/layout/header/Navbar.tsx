import React, { ReactNode } from "react";
import {
  FileTextOutlined,
  PieChartOutlined,
  DesktopOutlined,
  FileDoneOutlined,
  FormOutlined,
  BlockOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Button, Layout, Menu, Popover, theme } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const Navbar = ({ children }: { children: ReactNode }) => {
  // const [collapsed, setCollapsed] = useState(false);
  // const [men, setMen] = useState(false);
  // const [marginLeft, setMarginLeft] = useState(false);
  // const [withLayout, setWithLayout] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const currentYear = new Date().getFullYear();

  const items: MenuItem[] = [
    getItem("Мои Документы", "", <FileTextOutlined />, [
      
      // getItem("Мои документы", "4"),
      // getItem("Документы в других филивлах", "5"),
      getItem("Новый документ", "account-form"),
      getItem("Список документов", "account-list"),
      getItem("Архив документов", "5"),
      // getItem("Отчисления", "5"),
      // getItem("Документы SWIFT", "5"),
      // getItem("Валютные контракты", "5"),
      // getItem("Заявки на конвертацию", "5"),
      // getItem("Зарплатный проект", "5"),
    ]),
    // getItem("Счета", "account-form", <FormOutlined />),
    getItem("Долги", "1", <PieChartOutlined />, [
      getItem("Картотека", "111"),
      // getItem("Кредитные договоры", "11"),
      // getItem("Архив кредитных договоров", "1111"),
    ]),
    getItem("Справочники", "2", <DesktopOutlined />, [
      // getItem("Cправочник курсов валют", "111"),
      // getItem("Cправочник банков", "11"),
      getItem("Cправочник филиалов банков", "1111"),
    ]),
    getItem("Отчеты", "sub1", <FileDoneOutlined />, [
      getItem("Выписка лицевых счетов", "33"),
      getItem("Сальдово-оборотная ", "44"),
      getItem("Справка о работе счета", "551"),
      getItem("Ведомость платежных операций", "55"),
      // getItem("Опись платежей Paynet", "55"),
      getItem("Выгрузка документов ГНИ", "55"),
      getItem("Удаленные и незавершенные платежи", "55"),
      // getItem("Выписка по карт-счетам UZKART-онлайн", "55"),
      getItem("Справка о работе счета 2", "55"),
      getItem("Выписка лицевых счетов 2", "55"),
      getItem("Справка о работе счета 3", "55"),
      getItem("Справка о работе счета 3 консолидированная", "55"),
      getItem("Платежи по корреспондентам", "55"),
      getItem("Выписка лицевых счетов за период", "55"),
      getItem("Отчет об удаленных документах", "55"),
      getItem("Справка о работе счета консолидированная", "55"),
      // getItem("ИПБ - Шаблон СУВОКАВА по дням", "55"),
      // getItem("ИПБ - Сведения по депозитам организаций МВД", "55"),
      // getItem("ИПБ - Справка о работе счета", "55"),
      // getItem("ИПБ - Сведения о сборе коммунальных платежей", "55"),
    ]),
    // getItem("Настройки", "sub2", <SettingOutlined />, [
    //   getItem("Смена пароля", "6"),
    // getItem("Установка параметров", "8"),
    // getItem("Периодические платежи", "8"),
    // ]),
    getItem("Сервис", "9", <BlockOutlined />, [
      // getItem("Файлы отчетов", "6"),
      getItem("Импорт документов", "8"),
      getItem("Экспорт документов", "8"),
      // getItem("Регистрация QR", "8"),
    ]),
    // getItem("Требования", "10", <AppstoreAddOutlined />, [
    //   getItem("УзбекЭнерго", "6"),
    //   getItem("Требования банка", "8"),
    // ]),
    // getItem("Заявки", "11", <DeliveredProcedureOutlined />, [
    //   getItem("Заявки на получение кредита в валюте", "8"),
    // ]),
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    navigate(`/${e.key}`);
  };

  const content = (
    <div className="setting-button-wrapper">
      <Button
        style={{
          borderColor: "#f5222d",
          color: "#f5222d",
          outline: "none",
        }}
      >
        Выход
      </Button>
      <Button
        style={{
          borderColor: "#fa8c16",
          color: "#fa8c16",
          outline: "none",
          marginTop: 8,
        }}
      >
        Смена пароля
      </Button>
    </div>
  );

  return (
    <Layout>
      <Header
        style={{
          // minWidth: "98vw",
          // width: '100%',
          display: "flex",
        }}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="horizontal"
          items={items}
          onClick={onClick}
          style={{ width: "100%" }}
        />
        <div style={{ marginRight: 32 }}>
          <Popover trigger="click" title={"Настройки"} content={content}>
            <Avatar style={{ cursor: "pointer" }} size={40}>
              USER
            </Avatar>
          </Popover>
        </div>
      </Header>
      <Content style={{ margin: "0 48px" }}>
        <div
          style={{
            // padding: 16,
            textAlign: "center",
            background: colorBgContainer,
            zIndex: "99",
            paddingTop: 24
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        By Beka and Jamal {currentYear}
      </Footer>
    </Layout>
  );
};

export default Navbar;
