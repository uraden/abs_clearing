import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select, Divider } from "antd";
import TextArea from "antd/es/input/TextArea";

const AccountingEntryForm: React.FC = () => {
  const [role] = useState(1);

  const onFinish = (values: unknown) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{
          border: "1px solid #808080",
          padding: "10px",
          borderRadius: "10px",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="inline">
          <Form.Item
            label="Дата документа"
            name="docDate"
            rules={[{ required: true, message: "Пожалуста выберете Дату" }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            label="№ документа"
            name="docNumber"
            rules={[
              { required: true, message: "Пожалуста выберете № документа" },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <Divider />

        <div className="inline" style={{ display: "inline" }}>
          {role === 2 ? (
            <Form.Item
              label="Счет плательщика"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста выберете счет плательшика",
                },
              ]}
              name="accountInvoice"
            >
              <Select style={{ width: "100px" }}>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
          ) : (
            <Form.Item
              label="Счет плательщика"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста выберете счет плательшика",
                },
              ]}
              name="accountInvoice"
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item label="ИНН" name="innOfPayer">
            <Input />
          </Form.Item>
        </div>
        <br />
        <div className="inline">
          <Form.Item label="Банк">
            <Input />
          </Form.Item>

          <Form.Item
            label="МФО Банка"
            rules={[
              { required: true, message: "Пожалуста выберете МФО Банка" },
            ]}
            name="bankCodePayer"
          >
            <Input />
          </Form.Item>
        </div>

        <Divider />

        <h3> Сумма не указана</h3>

        <Divider />

        <div className="inline">
          {role == 2 ? (
            <Form.Item
              label="Счет получателя"
              rules={[
                {
                  required: true,
                  message: "Пожалуста выберете cчет получателя",
                },
              ]}
              name="accountInvoiceReceiver"
            >
              <Select style={{ width: "100px" }}>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
          ) : (
            <Form.Item
              label="Счет получателя"
              rules={[
                {
                  required: true,
                  message: "Пожалуста выберете cчет получателя",
                },
              ]}
              name="accountInvoiceReceiver"
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item
            label="ИНН"
            // rules={[{ required: true, message: "Пожалуста выберете ИНН" }]}
            name="innOfReciver"
          >
            <Input />
          </Form.Item>
        </div>
        <br />
        <div className="inline">
          <Form.Item label="Банк">
            <Input />
          </Form.Item>

          <Form.Item
            label="МФО Банка"
            rules={[
              { required: true, message: "Пожалуста выберете МФО Банка" },
            ]}
            name="bankCodeOfReciver"
          >
            <Input />
          </Form.Item>
        </div>

        <Divider />

        <div className="inline">
          <Form.Item label="Код назначения">
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "tom",
                  label: "Tom",
                },
              ]}
            />
          </Form.Item>

          <Form.Item label="Детали платежа" name="paymentDetails">
            <TextArea rows={4} />
          </Form.Item>
        </div>

        <Divider />

        <div
          className="horizontal"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ outline: "none", marginRight: "50px" }}
            >
              Сократить
            </Button>
          </Form.Item>

          <Form.Item>
            <Button style={{ outline: "none" }}>Загрузить</Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default () => <AccountingEntryForm />;
