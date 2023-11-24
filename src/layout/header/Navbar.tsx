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
      getItem("Список документов", "account-list"),
      getItem("Мои документы", "4"),
      getItem("Документы в других филивлах", "51"),
      getItem("Новый документ", "52"),
      getItem("Архив документов", "53"),
      getItem("Отчисления", "544"),
      getItem("Документы SWIFT", "512"),
      getItem("Валютные контракты", "522"),
      getItem("Заявки на конвертацию", "533"),
      getItem("Зарплатный проект", "57"),
    ]),
    getItem("Счета", "account-form", <FormOutlined />),
    getItem("Долги", "1", <PieChartOutlined />, [
      getItem("Картотека", "1121"),
      getItem("Кредитные договоры", "114"),
      getItem("Архив кредитных договоров", "111091"),
    ]),
    getItem("Справочники", "2", <DesktopOutlined />, [
      getItem("Cправочник курсов валют", "1811"),
      getItem("Cправочник банков", "11"),
      getItem("Cправочник филиалов банков", "1111"),
    ]),
    getItem("Отчеты", "sub1", <FileDoneOutlined />, [
      getItem("Выписка лицевых счетов", "33"),
      getItem("Сальдово-оборотная ", "44"),
      getItem("Справка о работе счета", "551"),
      getItem("Ведомость платежных операций", "535"),
      getItem("Опись платежей Paynet", "552"),
      getItem("Выгрузка документов ГНИ", "5533"),
      getItem("Удаленные и незавершенные платежи", "554"),
      getItem("Выписка по карт-счетам UZKART-онлайн", "5425"),
      getItem("Справка о работе счета 2", "5512"),
      getItem("Выписка лицевых счетов 2", "5587"),
      getItem("Справка о работе счета 3", "5509"),
      getItem("Справка о работе счета 3 консолидированная", "5565"),
      getItem("Платежи по корреспондентам", "5500"),
      getItem("Выписка лицевых счетов за период", "52512"),
      getItem("Отчет об удаленных документах", "55"),
      getItem("Справка о работе счета консолидированная", "5095"),
      getItem("ИПБ - Шаблон СУВОКАВА по дням", "1955"),
      getItem("ИПБ - Сведения по депозитам организаций МВД", "5955"),
      getItem("ИПБ - Справка о работе счета", "055"),
      getItem("ИПБ - Сведения о сборе коммунальных платежей", "555"),
    ]),
    // getItem("Настройки", "sub2", <SettingOutlined />, [
    //   getItem("Смена пароля", "6"),
    // getItem("Установка параметров", "8"),
    // getItem("Периодические платежи", "8"),
    // ]),
    getItem("Сервис", "9", <BlockOutlined />, [
      getItem("Файлы отчетов", "6"),
      getItem("Импорт документов", "81"),
      getItem("Экспорт документов", "813"),
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
      <Content style={{ margin: "0 50px" }}>
        <div
          style={{
            // padding: 16,
            textAlign: "center",
            background: colorBgContainer,
            zIndex: "99",
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
