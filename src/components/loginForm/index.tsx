import React, { useState, useEffect } from "react";
import { Button, Form, Input, notification } from "antd";
import { getSN, login } from "./request";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../assets/reusable/requests";
import { IProfile } from "../../layout/wrapper/Navbar";

// const Roles = [
//   {
//     roleId: 1,
//     roleName: "Сотрудник банка",
//   },
//   {
//     roleId: 2,
//     roleName: "Пользователь клиента",
//   },
// ];

type FieldType = {
  username?: string;
  password?: string;
};

interface ILogin {
  accessToken?: string;
  status?: number;
  sn?: string;
}

const LoginForm: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("accessToken");
  }, []);

  const onFinish = async (values: unknown) => {
    setLoading(true);
    const request = await getSN();
    console.log('reqqqqqq: ', request);
    if (request.status === 'error') {
      setLoading(false);
      return api.error({
        message: "Ошибка при авторизации",
        description:
          "Проверьте ключ",
        duration: 4,
      });
    }
    const response = (await login({
      //@ts-ignore
      ...values,
      sn: request.var1,
    })) as ILogin;
    console.log("responsetssst: ", response);
    if (response && response.status === 401) {
      api.error({
        message: "Ошибка при авторизации",
        description:
          "Username или пароль неверный, либо такой username не существует",
        duration: 4,
      });
    }

    if (response && response.accessToken) {
      localStorage.setItem("accessToken", response.accessToken);
      const profile = (await getProfile()) as IProfile;

      if (profile.isActive) {
        navigate("/");
      } else {
        api.error({
          message: "Ошибка при авторизации",
          description: "Срок действия пароля истек обратитесь к администратору",
          duration: 4,
        });
      }
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="glass-inner">
      {contextHolder}
      <h3
        style={{
          marginBottom: 4,
          fontSize: "54px",
          color: "white",
          display: "flex",
        }}
      >
        ABS Login
      </h3>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 700 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          label={<label style={{ color: "white" }}>Username</label>}
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label={<label style={{ color: "white" }}>Password</label>}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="middle"
            loading={isLoading}
            block
            style={{
              outline: "none",
              // width: "466px",
              // background: 'white',
              // color: '#028FD6'
            }}
          >
            Log-in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
