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
  Flex,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { changeStatus, createOrder } from "../../pages/accountForm/request";
import { useParams, useLocation } from "react-router";

import { editFormData } from "./request";
import { withDecimal } from "../../assets/numberToJs";

import _ from "lodash";
import { status } from "../../assets/defaultData";
import dayjs from "dayjs";

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
  debMfo: string;
  crName: string;
  crPnfl: string;
  debName: string;
  debPnfl: string;
  // forderDay: string
};



const AccountEntryForm: React.FC = () => {
  const [role] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [sum, setSum] = useState(null);
  const [form] = Form.useForm();
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
    debMfo: "",
    crName: "",
    crPnfl: "",
    debName: "",
    debPnfl: "",
    // forderDay: ""
  });
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const [editable, setEditable] = useState(false);

  const { docId } = useParams();
  const { pathname: urlChange } = useLocation();

  // const { makeOrder } = useMakeOrder();
  const fetchEditForm = async () => {
    const infoEdit = await editFormData(docId);
    setEditData(infoEdit);
  };

  // useEffect(() => {}, [urlChange]);

  useEffect(() => {
    if (!location.pathname.includes("new-doc")) {
      setEditable(true);
      fetchEditForm();
    } else {
      setEditable(false);
      form.resetFields();
    }
  }, [urlChange]);

  const confirmForm = () => {
    message.success("Поручение создано");
  };

  const failConfirmForm = () => {
    message.error("Couldn't send form");
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        fval: "0",
        forderDay: "08.12.2023",
        dtd: dayjs(values.dtd).format("DD.MM.YYYY"),
        sum: values.sum.toString(),
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

  interface TempStatus {
    statusColor?: string;
    statusId?: number;
    statusTitle?: string;
    // typestatusId?: number
  }
  const displayButton = () => {
    let tempStatus: TempStatus = {};
    if (editData.statusId === "12" || editData.statusId === "11") {
      return null;
    }
    if (editData.statusId === "10") {
      tempStatus = (_.find(status, { statusId: 12 }) as TempStatus) || {};
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
      tempStatus =
        _.find(status, { statusId: Number(editData.statusId) + 1 }) || {};
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

  const validateMinLengthMFO = (_: unknown, value: unknown) => {
    if (typeof value === "string" && value.length < 5) {
      return Promise.reject(new Error("Минимум 5 символов ввода."));
    }
    return Promise.resolve();
  };

  const validateAccount = (_: unknown, value: unknown) => {
    if (typeof value === "string" && value.length < 20) {
      return Promise.reject(new Error("Минимум 20 символов ввода."));
      // const validateAccount = (_: unknown, value: unknown) => {
      //   if (value && value.length < 20) {
      //     return Promise.reject(new Error("Минимум 20 символов ввода."));
    }
    return Promise.resolve();
  };

  const validateINN = (_: unknown, value: unknown) => {
    if (typeof value === "string" && value.length < 9) {
      return Promise.reject(new Error("Минимум 9 символов ввода."));
      // if (value && value.length < 9) {
      //   return Promise.reject(new Error("Минимум 9 символов ввода."));
    }
    return Promise.resolve();
  };

  const validateDokNumber = (_: unknown, value: unknown) => {
    if (typeof value === "string" && value.length > 10) {
      return Promise.reject(new Error("Максимум 10 цифр."));
      // if (value && value.length < 9) {
      //   return Promise.reject(new Error("Минимум 9 символов ввода."));
    }
    return Promise.resolve();
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
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        fields={
          editable
            ? [
                {
                  name: ["dtd"],
                  value: dayjs(editData.dtd),
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
                {
                  name: ["debMfo"],
                  value: editData.debMfo,
                },
                {
                  name: ["crName"],
                  value: editData.crName,
                },
                {
                  name: ["crPnfl"],
                  value: editData.crPnfl,
                },
                {
                  name: ["debName"],
                  value: editData.debName,
                },
                {
                  name: ["debPnfl"],
                  value: editData.debPnfl,
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
            className="aaaaa"
            label="Дата документа:"
            name="dtd"
            rules={[{ required: true, message: "Пожалуйста выберете Дату" }]}
            style={{
              marginRight: 40,
            }}
          >
            <DatePicker
              placeholder="Выберите дату"
              format="DD.MM.YYYY"
              inputReadOnly={editData ? true : false}
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            label="№ документа"
            name="ndoc"
            rules={[
              { required: true, message: "Пожалуйста выберете № документа" },
              { validator: validateDokNumber },
            ]}
          >
            <Input maxLength={10} type="number" />
          </Form.Item>
        </div>
        <Divider orientation="left">Дебет</Divider>
        <div
          className="inline"
          style={{
            display: "flex",
            // justifyContent: "flex-start",
            // flexWrap: "wrap",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex" }}>
            {role == 2 ? (
              <Form.Item
                label="Счет плательщика"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста выберете cчет плательщика",
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
                label="Счет плательщика"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста выберете cчет плательщика",
                  },
                  { validator: validateAccount },
                ]}
                name="debAcc"
                style={{
                  marginRight: 40,
                }}
              >
                <Input maxLength={20} />
              </Form.Item>
            )}

            <Form.Item
              label="Банк"
              style={{
                marginRight: 40,
              }}
              name="debBankName"
            >
              <Input disabled={editData.debBankName ? true : false} />
            </Form.Item>

            <Form.Item
              label="МФО Банка"
              rules={[
                { required: true, message: "Пожалуйста выберете МФО Банка" },
                { validator: validateMinLengthMFO },
              ]}
              name="debMfo"
              style={{
                marginRight: 40,
              }}
            >
              <Input disabled={editData.debMfo ? true : false} maxLength={5} />
            </Form.Item>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Form.Item
              label="ИНН"
              rules={[{ validator: validateINN }]}
              name="debInn"
              style={{
                marginRight: 40,
              }}
            >
              <Input disabled={editData.debInn ? true : false} maxLength={9} />
            </Form.Item>

            <Form.Item
              label="Наименование плательщика"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста выберете Наименование плательщика",
                },
              ]}
              name="debName"
              style={{
                marginRight: 40,
              }}
            >
              <Input disabled={editData.debName ? true : false} />
            </Form.Item>
          </div>
          {/* <Form.Item
            label="ПИНФЛ плательщика"
            rules={[
              {
                required: true,
                message: "Пожалуйста выберете ПИНФЛ плательщика",
              },
            ]}
            name="debPnfl"
          >
            <Input disabled={editData.debPnfl ? true : false} />
          </Form.Item>*/}
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
                setSum(value);
              }}
              style={{ width: 200 }}
              // parser={(value) => {
              //   console.log('par: ',  value.toLocaleString());
              //   return value.replace(/\$\s?|(,*)/g, "");
              // }}
            />
          </Form.Item>
          {sum ? (
            <div
              style={{
                marginLeft: 8,
                fontSize: 16,
                fontStyle: "italic",
                textDecoration: "underline",
              }}
            >
              {withDecimal(sum)}
            </div>
          ) : null}
        </div>

        <Divider orientation="left">Кредит</Divider>

        <div
          className="inline"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {role === 2 ? (
              <Form.Item
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                label="Счет получателя"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста выберете счет получателя",
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
                label="Счет получателя"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста выберете счет получателя",
                  },
                  { validator: validateAccount },
                ]}
                name="crAcc"
                style={{
                  marginRight: 40,
                }}
              >
                <Input maxLength={20} />
              </Form.Item>
            )}

            <Form.Item
              label="Банк"
              // labelCol={{span: 10}}
              // wrapperCol={{ span: 14 }}
              style={{
                marginRight: 40,
              }}
              name="crBankName"
            >
              <Input readOnly={editData.debBankName ? true : false} />
            </Form.Item>

            <Form.Item
              label="МФО Банка"
              rules={[
                { required: true, message: "Пожалуйста выберете МФО Банка" },
                { validator: validateMinLengthMFO },
              ]}
              name="crMfo"
              // labelCol={{span: 10}}
              // wrapperCol={{ span: 14 }}
              style={{
                marginRight: 40,
              }}
            >
              <Input maxLength={5} />
            </Form.Item>
          </div>
          <div style={{
            display: 'flex'
          }}>
            <Form.Item
              label="ИНН"
              rules={[{ validator: validateINN }]}
              name="crInn"
              // labelCol={{span: 10}}
              // wrapperCol={{ span: 14 }}
              style={{
                marginRight: 40,
              }}
            >
              <Input
                style={{
                  width: 184,
                  display: "flex",
                }}
                maxLength={9}
              />
            </Form.Item>

            <Form.Item
              label="Наименование получателя"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста выберете Наименование получателя",
                },
              ]}
              name="crName"
              style={{
                marginRight: 40,
              }}
            >
              <Input />
            </Form.Item>
          </div>
          {/* 
          <Form.Item
            label="ПИНФЛ получателя"
            rules={[
              {
                required: true,
                message: "Пожалуйста выберете ПИНФЛ получателя",
              },
            ]}
            name="crPnfl"
            style={{
              marginRight: 40,
            }}
          >
            <Input />
          </Form.Item> */}
        </div>

        <Divider />

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
              marginRight: 40,
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
              marginRight: "40px",
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

              {editData.statusId === "11" ? null : (
                <Button
                  style={{
                    outline: 0,
                  }}
                  onClick={async () => {
                    setLoading(true);
                    const response = await changeStatus({
                      orderId: Number(editData.id),
                      newStatusId: 11,
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
                    console.log("ressponseee: ", response);
                  }}
                  danger
                  loading={isLoading}
                >
                  Отбраковать
                </Button>
              )}
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
