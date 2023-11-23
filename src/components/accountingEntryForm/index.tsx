import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Divider,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { makeOrder } from "../../pages/accountForm/request";
import moment from "moment";

const AccountEntryForm: React.FC = () => {
  const [role] = useState(1);
  const [isLoading, setLoading] = useState(false);

  const confirmForm = () => {
    message.success(`Created new form`);
  };

  const failConfirmForm = () => {
    message.error("Couldn't send form");
  };

  const onFinish = async (values: {dtd: string}) => {
    setLoading(true);

    try {
      const formattedValues = {
        ...values,
        crMfo: "0014",
        crInn: 201053750,
        crPnfl: 123456,
        crBankName: "BEKHZOD COMPANY",
        statusId: "1",
        dtd: values.dtd ? moment(values?.dtd).format("DD.MM.YYYY") : null,
      };

      const request = await makeOrder(formattedValues);
      console.log("req: ", request);
      console.log("iiii", formattedValues);
      confirmForm();
      setLoading(false);
    } catch (err) {
      failConfirmForm()
      console.log("error: ", err);
    }
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
      <h3 style={{ textAlign: "center", marginBottom: 16 }}>Форма</h3>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{
          padding: "10px",
          borderRadius: "10px",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="inline">
          <Form.Item
          className="aaaaa"
            label="Дата документа"
            name="dtd"
            rules={[{ required: true, message: "Пожалуста выберете Дату" }]}
          >
            <DatePicker placeholder="Выберите дату" format="DD.MM.YYYY"/>
          </Form.Item>
          <Form.Item
            label="№ документа"
            name="ndoc"
            rules={[
              { required: true, message: "Пожалуста выберете № документа" },
            ]}
          >
            <Input />
          </Form.Item>
        </div>

        <Divider />

        <Form.Item
          label="sum"
          name="sum"
          rules={[
            { required: true, message: "Пожалуста выберете № документа" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="debMfo"
          name="debMfo"
          rules={[
            { required: true, message: "Пожалуста выберете № документа" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="debInn"
          name="debInn"
          rules={[
            { required: true, message: "Пожалуста выберете № документа" },
          ]}
        >
          <Input />
        </Form.Item>

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
              name="sum"
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
              name="naznCode"
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item label="ИНН" name="naznText">
            <Input />
          </Form.Item>
        </div>
        <br />
        <div className="inline">
          <Form.Item label="Банк">
            <Input name="debMfo" />
          </Form.Item>

          <Form.Item
            label="МФО Банка"
            rules={[
              { required: true, message: "Пожалуста выберете МФО Банка" },
            ]}
            name="debAcc"
          >
            <Input />
          </Form.Item>
        </div>

        <Divider />
        <Form.Item
          label="Сумма"
          rules={[{ required: true, message: "Пожалуста введите сумму" }]}
          name="debName"
        >
          <Input />
        </Form.Item>
        {/* <h3> Сумма не указана</h3> */}

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
              name="debInn"
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
              name="debPnfl"
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item
            label="ИНН"
            // rules={[{ required: true, message: "Пожалуста выберете ИНН" }]}
            name="debBankName"
          >
            <Input />
          </Form.Item>
        </div>
        <br />
        <div className="inline">
          <Form.Item label="Банк">
            <Input name="crMfo" />
          </Form.Item>

          <Form.Item
            label="МФО Банка"
            rules={[
              { required: true, message: "Пожалуста выберете МФО Банка" },
            ]}
            name="crAcc"
          >
            <Input />
          </Form.Item>
        </div>

        <Divider />

        <div className="inline">
          <Form.Item label="Код назначения">
            <Select
              allowClear
              showSearch
              placeholder="Выберите код назначения"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={[
                {
                  value: "08101",
                  label:
                    "08101 - Предоплата по налогам и другим обязательным платежам",
                },
                {
                  value: "08102",
                  label:
                    "08102 - Оплата налогов и других обязательных платежей по расчёту",
                },
                {
                  value: "08103",
                  label:
                    "08103 - Оплата налогов и других обязательных платежей по перерасчёту",
                },
                {
                  value: "08104",
                  label:
                    "08104 - Оплата налогов и других обязательных платежей по итогам камеральной проверки",
                },
                {
                  value: "08105",
                  label:
                    "08105 - Оплата налогов и других обязательных платежей по итогам проверок ГНИ",
                },
                {
                  value: "08106",
                  label:
                    "08106 - Оплата доначисленных налогов на счета правоохранительных органов",
                },
                {
                  value: "08107",
                  label:
                    "08107 - Оплата налогов, взысканных судебными исполнителями",
                },
                {
                  value: "08108",
                  label: "08108 - Пеня",
                },
                {
                  value: "08201",
                  label: "08201 - Разовый платёж в бюджет – за регистрацию",
                },
                {
                  value: "08202",
                  label: "08202 - Разовый платёж в бюджет – пеня ",
                },
                {
                  value: "08203",
                  label: "08203 - Разовый платёж в бюджет – финансовые санкции",
                },
                {
                  value: "08301",
                  label:
                    "08301 - Разовый платёж в бюджет между хоз.субъектами – за регистрацию ",
                },
                {
                  value: "08302",
                  label:
                    "08302 - Разовый платёж в бюджет между хоз.субъектами – пеня ",
                },
                {
                  value: "08303",
                  label:
                    "08303 - Разовый платёж в бюджет между хоз.субъектами – финансовые санкции",
                },
              ]}
            />
          </Form.Item>

          <Form.Item label="Детали платежа" name="crName">
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
              loading={isLoading}
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

export default () => <AccountEntryForm />;
