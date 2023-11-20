import React from "react";
import { Button, Form, Input } from "antd";
import { login } from "./request";

const Roles = [
  {
    roleId: 1,
    roleName: 'Сотрудник банка'
  },
  {
    roleId: 2,
    roleName: 'Пользователь клиента'
  }
]

const onFinish = async (values: unknown) => {
  console.log("Success:", values);
  const request = await login(values);
  console.log('request: ', request);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  login?: string;
  password?: string;
  remember?: string;
};

const LoginForm: React.FC = () => (
  <div>
    <h3 style={{ textAlign: "center", marginBottom: 4 }}>ABS Login</h3>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="login"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Button type="primary" htmlType="submit" size="middle" block style={{outline: 'none'}}>
        Log-in
      </Button>
    </Form>
  </div>
);

export default LoginForm;
