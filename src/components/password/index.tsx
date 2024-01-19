import { Form, Input, notification } from "antd";
// import { useEffect } from "react";
import { changePassword } from "./request";
import { useSelector } from "react-redux";

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

//@ts-expect-error ignore for npm run build
const Password = ({ onClose }) => {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  // @ts-ignore
  const { globalDate } = useSelector((state: unknown) => state.globalDate);

  const { globalDate: profile } = useSelector(
    // @ts-ignore
    (state: unknown) => state.globalProfile
  );

  interface MyFormValues {
    currentPassword: string;
    newPassword: string;
    confirm: string;
    message: string;
  }

  const onFinish = async (values: MyFormValues) => {
    if (values.confirm !== values.newPassword) {
      // @ts-expect-error ignore for npm run build
      message.error("Новый пароль не совпадает с подтверждением!");
      return;
    }

    const result = await changePassword({
      id: profile.id,
      oldPassword: values.currentPassword,
      newPassword: values.newPassword,
    });

    if (result && result.code === 0) {
      api.success({
        message: "Пароль",
        description: "Пароль был успешно изменен",
      });
      return onClose();
    } else {
      api.error({
        message: "Пароль",
        description: result.message,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
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
        <button
          style={{
            background: "#00b96b",
            borderColor: "#00b96b",
            color: "white",
          }}
        >
          {" "}
          Обновить пароль{" "}
        </button>
      </Form>
    </>
  );
};

export default Password;
