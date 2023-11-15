import React, { ReactNode, useState } from "react";
import {
  SettingOutlined,
  FileTextOutlined,
  PieChartOutlined,
  DesktopOutlined,
  FileDoneOutlined,
  FormOutlined,
  AppstoreAddOutlined,
  DeliveredProcedureOutlined,
  BlockOutlined,
  
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Layout, Menu, Popover, theme } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const Navbar = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [men, setMen] = useState(false);
  const [marginLeft, setMarginLeft] = useState(false);
  const [withLayout, setWithLayout] = useState(false);
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

  const items: MenuItem[] = [
    getItem('Мои Документы', "", <FileTextOutlined />, [
      getItem("Список документов", "account-list"),
      getItem("Мои документы", "4"),
      getItem("Документы в других филивлах", "5"),
      getItem("Новый документ", "5"),
      getItem("Архив документов", "5"),
      getItem("Отчисления", "5"),
      getItem("Документы SWIFT", "5"),
      getItem("Валютные контракты", "5"),
      getItem("Заявки на конвертацию", "5"),
      getItem("Зарплатный проект", "5")
    ]),
    getItem('Счета', "account-form", <FormOutlined />),
    getItem("Долги", "1", <PieChartOutlined />, [
      getItem("Картотека", "111"),
      getItem("Кредитные договоры", "11"),
      getItem("Архив кредитных договоров", "1111"),
    ]),
    getItem("Справочники", "2", <DesktopOutlined />,  [
      getItem("Cправочник курсов валют", "111"),
      getItem("Cправочник банков", "11"),
      getItem("Cправочник филиалов банков", "1111"),
    ]),
    getItem("Отчеты", "sub1", <FileDoneOutlined />, [
      getItem("Выписка лицевых счетов", "33"),
      getItem("Сальдово-оборотная ", "44"),
      getItem("Справка о работе счета", "55"),
      getItem("Ведомость платежных операций", "55"),
      getItem("Опись платежей Paynet", "55"),
      getItem("Выгрузка документов ГНИ", "55"),
      getItem("Удаленные и незавершенные платежи", "55"),
      getItem("Выписка по карт-счетам UZKART-онлайн", "55"),
    ]),
    getItem("Настройки", "sub2", <SettingOutlined />, [
      getItem("Team 1", "6"),
      getItem("Team 2", "8"),
    ]),
    getItem("Сервисы", "9", <BlockOutlined />),
    getItem("Требования", "10", <AppstoreAddOutlined />),
    getItem("Заявки", "11", <DeliveredProcedureOutlined />),
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    navigate(`/${e.key}`);
  };

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1,
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => {
          setCollapsed(value);
          setMen(!men);

          setMarginLeft(!marginLeft);
          setWithLayout(!withLayout);
          console.log("marginLeft", marginLeft);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={onClick}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: marginLeft ? 88 : 200,
          minHeight: "100vh",
          width: withLayout ? "94vw" : "88vw",
        }}
      >
        <Header
          style={{
            background: colorBgContainer,
            padding: 0,
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div style={{ marginRight: 32 }}>
            <Popover trigger="click" title={"Профиль"} content={content}>
              <Avatar style={{ cursor: 'pointer' }} size={40}>USER</Avatar>
            </Popover>
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              zIndex: "99",
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>By Beka and Jamal 2023</Footer>
      </Layout>
    </Layout>
  );
};

export default Navbar;
