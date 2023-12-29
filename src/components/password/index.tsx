import { Form, Input } from "antd";
// import { useEffect } from "react";
import {changePassword} from "./request"

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const Password = ({ onClose }) => {
  const [form] = Form.useForm();

  interface MyFormValues {
    currentPassword: string;
    newPassword: string;
    confirm: string;
    message: string;
  }
  

  const onFinish = async (values: MyFormValues) => {
    try {
     
      if (values.confirm !== values.newPassword) {
        message.error("Новый пароль не совпадает с подтверждением!");
        return;
      }

      const result = await await changePassword({
        "id": "10",
        "oldPassword": values.currentPassword,
        "newPassword": values.newPassword,
      });

      console.log('PAssword UPDATE', result)
      onClose();
    } catch (error) {
      // Handle the error from the API request
      console.error("Password change failed:", error);
      message.error("Не удалось изменить пароль. Пожалуйста, попробуйте еще раз.");
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      // style={{ maxWidth: 600 }}
      // scrollToFirstError
    >
      <Form.Item
        name="currentPassword"
        label="Текущий пароль"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите текущий пароль!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="newPassword"
        label="Новый пароль"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите новый пароль!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Подтвердите пароль"
        dependencies={["newPassword"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите пароль!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Новый пароль, который вы ввели, не соответствует!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
    <button style={{ background: "#00b96b", borderColor: "#00b96b", color: "white" }}> Обновить пароль </button>
    </Form>
  );
};

export default Password;
