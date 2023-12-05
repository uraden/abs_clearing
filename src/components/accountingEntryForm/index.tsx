import React, { useState, useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Divider,
  message,
  InputNumber,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  changeStatus,
  createOrder,
  useMakeOrder,
} from "../../pages/accountForm/request";
import { useParams, useLocation } from "react-router";
import moment from "moment";
import { ToWords } from "to-words";
import { editFormData } from "./request";
// @ts-ignore
import writtenNumber from "written-number";

import n2words from "n2words";
import _ from "lodash";
import { status } from "../../assets/defaultData";

type EditData = {
  dtd: string;
  ndoc: string;
  crAcc: string;
  crInn: string;
  crBankName: string;
  crMfo: string;
  sum: string;
  debAcc: string;
  debInn: string;
  debBankName: string;
  naznCode: string;
  naznText: string;
  statusId: string;
  id: string;
};

const AccountEntryForm: React.FC = () => {
  const [role] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [editData, setEditData] = useState<EditData>({
    dtd: "",
    ndoc: "",
    crAcc: "",
    crInn: "",
    crBankName: "",
    crMfo: "",
    sum: "",
    debAcc: "",
    debInn: "",
    debBankName: "",
    naznCode: "",
    naznText: "",
    statusId: "",
    id: "",
  });
  const location = useLocation();
  const toWords = new ToWords({
    localeCode: "ru",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      // currencyOptions: { // can be used to override defaults for the selected locale
      //   name: 'Rupee',
      //   plural: 'Rupees',
      //   symbol: '₹',
      //   fractionalUnit: {
      //     name: 'Paisa',
      //     plural: 'Paise',
      //     symbol: '',
      //   },
      // }
    },
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [editable, setEditable] = useState(false);

  const { docId } = useParams();
  // const { makeOrder } = useMakeOrder();
  const fetchEditForm = async () => {
    const infoEdit = await editFormData(docId);
    setEditData(infoEdit);
  };

  useEffect(() => {
    if (!location.pathname.includes("new-doc")) {
      setEditable(true);
      fetchEditForm();
    }
  }, [location.pathname]);

  const confirmForm = () => {
    message.success("Поручение создано");
  };

  const failConfirmForm = () => {
    message.error("Couldn't send form");
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    console.log("valuesss:: ", values);
    try {
      const formattedValues = {
        ...values,
        crMfo: "0014",
        crInn: 201053750,
        crPnfl: 123456,
        crBankName: "BEKHZOD COMPANY",
        statusId: "1",
        debMfo: "1234",
        sum: "1234",
        debInn: "1234",
        dtd: values.dtd ? moment(values?.dtd).format("DD.MM.YYYY") : null,
      };

      const request = await createOrder(formattedValues);
      console.log("req: ", request);
      confirmForm();
      setLoading(false);
    } catch (err) {
      failConfirmForm();
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

  const displayButton = () => {
    let tempStatus = "";
    if (editData.statusId === "12" || editData.statusId === "11") {
      return null;
    }
    if (editData.statusId === "10") {
      tempStatus = _.find(status, { statusId: 12 });
      return (
        <Button
          type="primary"
          loading={isLoading}
          style={{
            outline: "none",
            backgroundColor: tempStatus.statusColor,
            border: `1px solid ${tempStatus.statusColor}`,
          }}
          onClick={async () => {
            setLoading(true);
            const response = await changeStatus({
              orderId: Number(editData.id),
              newStatusId: tempStatus.statusId,
            });
            if (response.code === 0) {
              messageApi.open({
                type: "success",
                content: response.message,
              });
              fetchEditForm();
            } else if (response.code !== 0) {
              messageApi.open({
                type: "error",
                content: response.message,
              });
            }
            setLoading(false);
          }}
        >
          {tempStatus.statusTitle}
        </Button>
      );
    } else {
      tempStatus = _.find(status, { statusId: Number(editData.statusId) + 1 });
      return (
        <Button
          type="primary"
          loading={isLoading}
          style={{
            outline: "none",
            backgroundColor: tempStatus.statusColor,
            border: `1px solid ${tempStatus.statusColor}`,
          }}
          onClick={async () => {
            setLoading(true);
            const response = await changeStatus({
              orderId: Number(editData.id),
              newStatusId: tempStatus.statusId,
            });
            if (response.code === 0) {
              messageApi.open({
                type: "success",
                content: response.message,
              });
              fetchEditForm();
            } else if (response.code !== 0) {
              messageApi.open({
                type: "error",
                content: response.message,
              });
            }
            setLoading(false);
          }}
        >
          {tempStatus.statusTitle}
        </Button>
      );
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: 16 }}>
        {editable ? "Изменить поручение" : "Новое поручение"}
      </h2>
      {contextHolder}
      <Form
        layout="horizontal"
        style={{
          padding: "10px",
          borderRadius: "10px",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        fields={
          editable
            ? [
                {
                  name: ["dtd"],
                  value: moment(editData.dtd),
                },
                {
                  name: ["ndoc"],
                  value: editData.ndoc,
                },
                {
                  name: ["crAcc"],
                  value: editData.crAcc,
                },
                {
                  name: ["crInn"],
                  value: editData.crInn,
                },
                {
                  name: ["crBankName"],
                  value: editData.crBankName,
                },
                {
                  name: ["crMfo"],
                  value: editData.crMfo,
                },
                {
                  name: ["sum"],
                  value: editData.sum,
                },
                {
                  name: ["debAcc"],
                  value: editData.debAcc,
                },
                {
                  name: ["debInn"],
                  value: editData.debInn,
                },
                {
                  name: ["debBankName"],
                  value: editData.debBankName,
                },
                {
                  name: ["naznCode"],
                  value: editData.naznCode,
                },
                {
                  name: ["naznText"],
                  value: editData.naznText,
                },
              ]
            : []
        }
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Form.Item
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            label="№ документа"
            name="ndoc"
            rules={[
              { required: true, message: "Пожалуйста выберете № документа" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            className="aaaaa"
            label="Дата документа:"
            name="dtd"
            rules={[{ required: true, message: "Пожалуйста выберете Дату" }]}
          >
            <DatePicker
              placeholder="Выберите дату"
              format="DD.MM.YYYY"
              inputReadOnly={editData ? true : false}
            />
          </Form.Item>
        </div>
        <Divider orientation="left">Дебет плательщика</Divider>

        <div
          className="inline"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            fontSize: "100px",
            flexWrap: "wrap",
          }}
        >
          {role === 2 ? (
            <Form.Item
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              label="Счет плательщика"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста выберете счет плательщика",
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
              // labelCol={{span: 10}}
              // wrapperCol={{ span: 14 }}
              label="Счет плательщика"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста выберете счет плательщика",
                },
              ]}
              name="crAcc"
            >
              <InputNumber
                type="number"
                minLength={16}
                maxLength={16}
                style={{
                  width: 184,
                  display: "flex",
                }}
              />
            </Form.Item>
          )}

          <Form.Item
            label="ИНН"
            name="crInn"
            // labelCol={{span: 10}}
            // wrapperCol={{ span: 14 }}
            style={{
              marginLeft: 40,
            }}
          >
            <Input
              style={{
                width: 184,
                display: "flex",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Банк"
            // labelCol={{span: 10}}
            // wrapperCol={{ span: 14 }}
            style={{
              marginLeft: 40,
            }}
            name="crBankName"
          >
            <Input readOnly={editData ? true : false} />
          </Form.Item>

          <Form.Item
            label="МФО Банка"
            rules={[
              { required: true, message: "Пожалуйста выберете МФО Банка" },
            ]}
            name="crMfo"
            // labelCol={{span: 10}}
            // wrapperCol={{ span: 14 }}
            style={{
              marginLeft: 40,
            }}
          >
            <Input />
          </Form.Item>
        </div>

        <Divider />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Form.Item
            label="Сумма"
            rules={[{ required: true, message: "Пожалуйста введите сумму" }]}
            name="sum"
          >
            <InputNumber
              // type="number"
              // formatter={(value) => {
              //   console.log("valuee: ", value);
              //   return Number(value).toLocaleString();
              // }}
              onChange={(value) => {
                console.log(
                  "value: ",
                  value,
                  writtenNumber(value, { lang: "ru" })
                  // n2words(value,{lang: 'ru'})
                  // num2str()
                );
              }}
              style={{ width: 200 }}
              // parser={(value) => {
              //   console.log('par: ',  value.toLocaleString());
              //   return value.replace(/\$\s?|(,*)/g, "");
              // }}
            />
          </Form.Item>
        </div>

        <Divider orientation="left">Кредит получателя</Divider>

        <div
          className="inline"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {role == 2 ? (
            <Form.Item
              label="Счет получателя"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста выберете cчет получателя",
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
                  message: "Пожалуйста выберете cчет получателя",
                },
              ]}
              name="debAcc"
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item
            label="ИНН"
            // rules={[{ required: true, message: "Пожалуйста выберете ИНН" }]}
            name="debInn"
            style={{
              marginLeft: 40,
            }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Банк"
            style={{
              marginLeft: 40,
            }}
            name="debBankName"
          >
            <Input readOnly={editData ? true : false} />
          </Form.Item>

          <Form.Item
            label="МФО Банка"
            rules={[
              { required: true, message: "Пожалуйста выберете МФО Банка" },
            ]}
            name="crAcc"
            style={{
              marginLeft: 40,
            }}
          >
            <Input />
          </Form.Item>
        </div>

        {/* <Divider /> */}

        <div
          className="inline"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <Form.Item
            label="Код назначения"
            style={{
              width: "20%",
            }}
            name="naznCode"
          >
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

          <Form.Item
            label="Детали платежа"
            name="naznText"
            style={{
              width: "45%",
              marginLeft: 30,
            }}
          >
            <TextArea rows={4} />
          </Form.Item>
        </div>

        {/* <Divider /> */}

        <div
          className="horizontal"
          style={{ display: "flex", justifyContent: "flex-start", gap: 16 }}
        >
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              style={{ outline: "none" }}
            >
              {editable ? "Изменить" : "Создать"}
            </Button>
          </Form.Item>
          {editable ? (
            <>
              {displayButton()}
              {/* <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  style={{
                    outline: "none",
                    backgroundColor: "#28A745",
                    border: "1px solid #116e26",
                  }}
                >
                  Утвердить
                </Button>
              </Form.Item> */}

              <Button danger>Отбраковать</Button>
            </>
          ) : (
            <></>
          )}

          {/* <Form.Item>
            <Button
              danger
              type="primary"
              style={{
                outline: "none",
              }}
            >
              Удалить
            </Button>
          </Form.Item> */}
        </div>
      </Form>
    </>
  );
};

export default () => <AccountEntryForm />;
