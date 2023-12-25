import { Form, Input } from "antd";
import { useEffect } from "react";

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

const Password = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
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
    </Form>
  );
};

export default Password;
