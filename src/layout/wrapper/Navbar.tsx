import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGlobalDate,
  fetchProfile,
} from "../../reduxStore/features/globalDateSlice";
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
import {
  Avatar,
  Button,
  Flex,
  Layout,
  Menu,
  Modal,
  Popover,
  notification,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import CustomPassword from "../../components/password";
import dayjs from "dayjs";
import {
  formatNumberWithCommas,
  getCurrency,
} from "../../assets/reusable/functions";
// import { fetchOperDay } from "../../assets/reusable/functions";

const { Header, Content, Footer } = Layout;

export interface IProfile {
  clientId: number;
  clientName: string;
  fullName: string;
  id: number;
  roleDescription: string;
  roleId: number;
  roleName: string;
  userName: string;
  isActive: boolean;
  expiredDate: string;
}

export interface ICurrency {
  date: string;
  difference: number;
  price: number;
  name: string;
}

// interface IOperday {
//   date: string;
//   id: number;
//   isActive: boolean;
// }

const Navbar = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(
    location.pathname.replace("/", "")
  );
  const [currencies, setCurrencies] = useState<ICurrency[]>([
    {
      date: "",
      difference: 0,
      price: 0,
      name: "",
    },
  ]);

  const navigate = useNavigate();

  // redux is below
  const dispatch = useDispatch();

  // @ts-expect-error try
  const { globalDate } = useSelector((state: unknown) => state.globalDate);
  // @ts-ignore
  const { globalDate: tempProfile } = useSelector(
    // @ts-ignore
    (state: unknown) => state.globalProfile
  );

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

  const fetchProfilee = async () => {
    const currency = await getCurrency();
    // const euro = await getCurrency("EUR", dayjs().format("YYYY-MM-DD"));
    setCurrencies(currency);
    const days = dayjs().diff(tempProfile.expiredDate, "day");
    if (days < 4 && days > -1) {
      api.error({
        message: "Срок действия пароля истек",
        description: "Срок действия пароля истек, смените пароль",
      });
    }
  };
  // const fetchOperdays = async () => {
  //   const response = await fetchOperDay();
  //   console.log('ressss: ', response);
  //   setOperday(response);
  // };

  useEffect(() => {
    fetchProfilee();
    // fetchOperdays();
    // @ts-expect-error try
    dispatch(fetchGlobalDate());
    // @ts-ignore
    dispatch(fetchProfile());
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
    // getItem(logoImg, ""),
    getItem("Счета", "account-page-home", <PieChartOutlined />, [
      getItem("Мои Счета", ""),
      getItem("Остатки и обороты счетов", "account-balance-page"),
    ]),
    getItem("Документы", "0", <FileTextOutlined />, [
      getItem("Новый документ", "new-doc"),
      getItem("Мои документы", "account-list"),
      // getItem("Удаленные и незавершенные платежи", "delete-incomplete"),
      getItem("Архив документов", "account-list-archive"),
    ]),
    getItem("Отчеты", "sub1", <FileDoneOutlined />, [
      getItem("Выписка лицевых счетов", "account-recent-reports"),
      getItem("Выписка лицевых счетов за период", "account-period-reports"),
      getItem("Сальдо-оборотная ведомость", "saldo-report"),
      // getItem("Ведомость платежных операций", "/#3"),
      // getItem("Удаленные и незавершенные платежи", "delete-incomplete"),
      // getItem("Отчет об удаленных документах", "/#5"),
    ]),
    getItem("Сервис", "9", <BlockOutlined />, [
      getItem("Импорт документов", "draft-form"),
    ]),
    getItem("Справочники", "reference", <HddOutlined />, [
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

  const passwordReminder = () => {
    const days = dayjs().diff(tempProfile?.expiredDate, "day");

    if (days < 4 && days > -1) {
      return (
        <span
          className="custom-text-warning"
          style={{
            color: "red",
            fontStyle: "italic",
          }}
        >
          {dayjs(tempProfile?.expiredDate).format("DD.MM.YYYY")} (осталось{" "}
          {Math.abs(days)} дней)
        </span>
      );
      // return <div>{dayjs(profile?.expiredDate).format('DD.MM.YYYY')}(осталось {days > 3 ? days : <span style={{ color: 'red' }}>{days}</span>} дней)</div>;
    }
    return (
      <span style={{ fontStyle: "italic" }}>
        {dayjs(tempProfile?.expiredDate).format("DD.MM.YYYY")} (осталось{" "}
        {Math.abs(days)} дней)
      </span>
    );
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {contextHolder}
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
        <div style={{ width: "20vw" }}>{logoImg}</div>
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
         <span className="text-currency"> Опер. день: </span> 
          <span style={{ fontWeight: "bold" }}>
            {dayjs(globalDate?.date).format("DD.MM.YYYY")}
          </span>
        </div>
        <div className="currency-container">
          <div style={{whiteSpace: 'nowrap' }}>
            {/* <div>Курс на </div> */}
            {/* <div>
              {currencies[0].date
                ? dayjs(currencies[0].date).format("DD.MM.YYYY")
                : dayjs().format("DD.MM.YYYY")}
            </div>
            : */}
            Курсы валют:
          </div>
          {currencies.map((currency: ICurrency) => (
            <div className="currency-icon">
              {currency.name === "USD" ? (
                <DollarOutlined style={{ fontSize: 20 }} />
              ) : (
                <EuroCircleOutlined style={{ fontSize: 20 }} />
              )}
              {formatNumberWithCommas(String(currency.price), 2)}
              <div
                style={{
                  color: currency.difference < 0 ? "red" : "green",
                  marginRight: 2,
                  marginLeft: 2,
                }}
              >
                ({currency.difference})
              </div>
              {currency.difference < 0 ? (
                <FallOutlined style={{ color: "red", fontSize: 20 }} />
              ) : (
                <RiseOutlined style={{ color: "green", fontSize: 20 }} />
              )}{" "}
            </div>
          ))}
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
              {tempProfile?.clientName}
            </span>
          </div>
          <div>
            Пользователь:{" "}
            <span style={{ fontStyle: "italic", textDecoration: "underline" }}>
              {tempProfile?.fullName}
            </span>
          </div>

          <div>
            Срок действия пароля:{" "}
            {/* <span style={{ fontStyle: "italic", textDecoration: "underline" }}> */}
            {passwordReminder()}
            {/* </span> */}
          </div>
        </Flex>
      </Footer>
    </Layout>
  );
};

export default Navbar;
