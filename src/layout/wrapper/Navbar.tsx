import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGlobalDate } from "../../reduxStore/features/globalDateSlice";
import {
  FileTextOutlined,
  PieChartOutlined,
  FileDoneOutlined,
  BlockOutlined,
  UserOutlined,
  EuroCircleOutlined,
  DollarOutlined,
  RiseOutlined,
  FallOutlined,
  HddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Button, Flex, Layout, Menu, Modal, Popover } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import CustomPassword from "../../components/password";
import { getProfile } from "../../assets/reusable/requests";
import dayjs from "dayjs";
import {
  formatNumberWithCommas,
  getCurrency,
} from "../../assets/reusable/functions";
// import { fetchOperDay } from "../../assets/reusable/functions";

const { Header, Content, Footer } = Layout;

interface IProfile {
  clientId: number;
  clientName: string;
  fullName: string;
  id: number;
  roleDescription: string;
  roleId: number;
  roleName: string;
  userName: string;
}

// interface IOperday {
//   date: string;
//   id: number;
//   isActive: boolean;
// }

const Navbar = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(
    location.pathname.replace("/", "")
  );
  const [currencies, setCurrencies] = useState({
    usd: {
      Rate: 0,
      Diff: "",
    },
    euro: {
      Rate: 0,
      Diff: "",
    },
  });
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<IProfile>({
    clientId: 0,
    clientName: "",
    fullName: "",
    id: 0,
    roleDescription: "",
    roleId: 0,
    roleName: "",
    userName: "",
  });
  // const [operDay, setOperday] = useState<IOperday>({
  //   date: "",
  //   id: 0,
  //   isActive: false,
  // });

  // redux is below
  const dispatch = useDispatch();

  // @ts-expect-error try
  const { globalDate } = useSelector((state: unknown) => state.globalDate);

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

  const fetchProfile = async () => {
    const response = await getProfile();
    setProfile(response);
    const usd = await getCurrency("USD", dayjs().format("YYYY-MM-DD"));
    const euro = await getCurrency("EUR", dayjs().format("YYYY-MM-DD"));
    setCurrencies({
      usd: usd[0],
      euro: euro[0],
    });
  };
  console.log("currencies: ", currencies);
  // const fetchOperdays = async () => {
  //   const response = await fetchOperDay();
  //   console.log('ressss: ', response);
  //   setOperday(response);
  // };

  useEffect(() => {
    fetchProfile();
    // fetchOperdays();
    // @ts-expect-error try
    dispatch(fetchGlobalDate());
  }, []);

  // const currentYear = new Date().getFullYear();

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
      // getItem("Мои Счета", "account-page"),
      getItem("Остатки и обороты счетов", "account-balance-page"),
    ]),
    getItem("Документы", "0", <FileTextOutlined />, [
      getItem("Новый документ", "new-doc"),
      getItem("Список документов", "account-list"),
      getItem("Архив документов", "account-list-archive"),
    ]),
    getItem("Отчеты", "sub1", <FileDoneOutlined />, [
      getItem("Выписка лицевых счетов", "account-recent-reports"),
      getItem("Выписка лицевых счетов за период", "account-period-reports"),
      getItem("Сальдо-оборотная ведомость", "/#1"),
      // getItem("Сальдо-оборотная ведомость за период", "/#2"),
      getItem("Ведомость платежных операций", "/#3"),
      getItem("Удаленные и незавершенные платежи", "delete-incomplete"),
      getItem("Отчет об удаленных документах", "/#5"),
    ]),
    getItem("Сервис", "9", <BlockOutlined />, [
      getItem("Импорт документов", "draft-form"),
    ]),
    getItem("Справочники", "reference", <HddOutlined />, 
    [
      getItem("Техническая поддержка", "reference"),
      getItem("Филиалы банков", "bank-reference"),
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
          width: "100%",
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
          width: "100%",
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
        <CustomPassword onClose={() => setIsModalOpen(false)} />
      </Modal>
      <Header className="header-container">
        {/* <div style={{ width: "20vw" }}>{logoImg}</div> */}
        <Menu
          // theme="dark"
          defaultSelectedKeys={[activeMenu]}
          mode="horizontal"
          items={items}
          onClick={onClick}
          style={{ width: "100%" }}
        />

        <div
          style={{
            marginRight: 64,
            color: "black",
            width: "30%",
            textAlign: "end",
          }}
        >
          Опер. день:{" "}
          <span style={{ fontWeight: "bold" }}>
            {dayjs(globalDate.date).format("DD.MM.YYYY")}
          </span>
        </div>
        <div className="currency-container">
          <div>
            ЦБ{" "}
            <span style={{ fontStyle: "italic" }}>
              {dayjs().format("DD.MM.YYYY")}
            </span>
            :
          </div>
          <div className="currency-icon">
            <DollarOutlined style={{ fontSize: 20 }} />
            {formatNumberWithCommas(String(currencies.usd.Rate), 2)}
            <div
              style={{
                color: currencies.usd.Diff.includes("-") ? "red" : "green",
                marginRight: 2,
                marginLeft: 2,
              }}
            >
              ({currencies.usd.Diff})
            </div>
            {currencies.usd.Diff.includes("-") ? (
              <FallOutlined style={{ color: "red", fontSize: 20 }} />
            ) : (
              <RiseOutlined style={{ color: "green", fontSize: 20 }} />
            )}{" "}
          </div>
          <div className="currency-icon">
            <EuroCircleOutlined style={{ fontSize: 20 }} />
            {formatNumberWithCommas(String(currencies.euro.Rate), 2)}
            <div
              style={{
                color: currencies.euro.Diff.includes("-") ? "red" : "green",
                marginRight: 2,
                marginLeft: 2,
              }}
            >
              ({currencies.euro.Diff})
            </div>

            {currencies.euro.Diff.includes("-") ? (
              <FallOutlined style={{ color: "red", fontSize: 20 }} />
            ) : (
              <RiseOutlined style={{ color: "green", fontSize: 20 }} />
            )}
          </div>
        </div>
        <div>
          <Popover trigger="click" title={"Настройки"} content={content}>
            <Avatar
              style={{ cursor: "pointer" }}
              size={40}
              icon={<UserOutlined />}
            />
          </Popover>
        </div>
      </Header>
      <Content className="bg-image">
        {/* <div className="background">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div> */}
        <div className="content-container">{children}</div>
      </Content>
      <Footer className="footer-container">
        {/* АО
        <span style={{ fontStyle: "italic" }}>
          {" "}
          "Национальный Клиринговый Центр"
        </span>{" "}
        при УзРВБ {currentYear} */}
        <Flex justify="space-between">
          <div>
            Клиент:{" "}
            <span style={{ fontStyle: "italic", textDecoration: "underline" }}>
              {profile?.clientName}
            </span>
          </div>
          <div>
            Пользователь:{" "}
            <span style={{ fontStyle: "italic", textDecoration: "underline" }}>
              {profile?.fullName}
            </span>
          </div>

          <div>
            Срок действия пароля:{" "}
            <span style={{ fontStyle: "italic", textDecoration: "underline" }}>
              10.01.2024 13:57 (осталось 21 дней)
            </span>
          </div>
        </Flex>
      </Footer>
    </Layout>
  );
};

export default Navbar;
