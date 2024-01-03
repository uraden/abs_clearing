import React, { ReactNode, useEffect, useState } from "react";
import {
  FileTextOutlined,
  PieChartOutlined,
  FileDoneOutlined,
  BlockOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, Modal, Popover, theme } from "antd";
import { useLocation, useNavigate, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import CustomPassword from "../../components/password";

const { Header, Content, Footer } = Layout;

const Navbar = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(
    location.pathname.replace("/", "")
  );
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const logoImg = (
    <img style={{ maxWidth: "100%", height: 70 }} src={logo} alt="logo" />
  );

  const items: MenuItem[] = [
    getItem(logoImg, ""),
    getItem("Счета", "account-page-home", <PieChartOutlined />, [
      getItem("Мои Счета", "account-page"),
      getItem("Остатки и обороты счетов", "account-balance-page"),
    ]),
    getItem("Документы", "0", <FileTextOutlined />, [
      // getItem("Новый документ", "new-doc"),
      getItem("Новый документ", "new-ui-doc"),
      // getItem("Черновик", "draft-form"),
      getItem("Список документов", "account-list"),
      getItem("Архив документов", "account-list-archive"),
    ]),
    // getItem("Долги", "1", <PieChartOutlined />, [getItem("Картотека", "111q")]),
    // getItem("Справочники", "2", <DesktopOutlined />, [
    //   getItem("Cправочник филиалов банков", "1111w"),
    // ]),
    getItem("Отчеты", "sub1", <FileDoneOutlined />, [
      getItem("Выписка лицевых счетов", "account-recent-reports"),
      getItem("Выписка лицевых счетов за период", "account-period-reports"),
      // getItem("Выписка лицевых счетов", "33e"),
      getItem("Сальдо-оборотная ведомость", "/#1"),
      // getItem("Сальдо-оборотная ведомость", "balance-sheet"),
      getItem("Сальдо-оборотная ведомость за период", "/#2"),
      // getItem("Сальдо-оборотная ведомость за период", "balance-period-sheet"),
      // getItem("Справка о работе счета", "551t"),
      getItem("Ведомость платежных операций", "/#3"),
      // getItem("Ведомость платежных операций", "55y"),
      // getItem("Выгрузка документов ГНИ", "55"),
      getItem("Удаленные и незавершенные платежи", "/#4"),
      // getItem("Удаленные и незавершенные платежи", "55u"),
      // getItem("Справка о работе счета 2", "55i"),
      // getItem("Выписка лицевых счетов 2", "55o"),
      // getItem("Справка о работе счета 3", "55p"),
      // getItem("Справка о работе счета 3 консолидированная", "55a"),
      // getItem("Платежи по корреспондентам", "55s"),
      getItem("Отчет об удаленных документах", "/#5"),
      // getItem("Справка о работе счета консолидированная", "55g"),
    ]),
    getItem("Сервис", "9", <BlockOutlined />, [
      getItem("Импорт документов", "draft-form"),
      // getItem("Экспорт документов", "8j"),
      // getItem("Черновик", "draft-form", ""),
    ]),
  ];

  if (items[0]) {
    items[0].className = "my-logo";
  }
  const onClick: MenuProps["onClick"] = (e) => {
    setActiveMenu(e.key);
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
        onClick={() => {
          navigate("/login");
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
        onClick={showModal}
      >
        Смена пароля
      </Button>
    </div>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Modal
        title="Смена пароля"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <CustomPassword onClose={() => setIsModalOpen(false)}  />
      </Modal>
      <Header
        style={{
          display: "flex",
        }}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={[activeMenu]}
          mode="horizontal"
          items={items}
          onClick={onClick}
          style={{ width: "100%" }}
        />

        <div
          style={{
            marginRight: 64,
            color: "white",
            width: "30%",
            textAlign: "end",
          }}
        >
          Опер. день: 05.12.2023
        </div>
        <div>
          <Popover trigger="click" title={"Настройки"} content={content}>
            <Button
              size="small"
              style={{ margin: "0 16px", verticalAlign: "middle" }}
              // onClick={changeUser}
            >
              {localStorage.getItem("username") || null}
            </Button>
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
            paddingTop: 24,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer className="main-footer" style={{ textAlign: "center" }}>
        АО
        <span style={{ fontStyle: "italic" }}>
          {" "}
          "Национальный Клиринговый Центр"
        </span>{" "}
        при УзРВБ {currentYear}
      </Footer>
    </Layout>
  );
};

export default Navbar;
