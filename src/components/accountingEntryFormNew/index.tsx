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
  notification,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { changeStatus, createOrder } from "../../pages/accountForm/request";
import { useParams, useLocation } from "react-router";

import {
  createNewOrder,
  editFormData,
  getActiveInfo,
  getActiveList,
} from "./request";
import { withDecimal } from "../../assets/numberToJs";

import _ from "lodash";
import { status } from "../../assets/defaultData";
import dayjs from "dayjs";
import { RightCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type EditData = {
  createdDate: string;
  documentNumber: number | null;
  creditAccount: string;
  creditINN: string;
  creditBankName: string;
  creditMFO: string;
  sum: string;
  debitAccount: string;
  debitINN: string;
  debitBankName: string;
  codeNaznachentiya: string;
  textNaznachentiya: string;
  statusId: string;
  id: string;
  debitMFO: string;
  creditName: string;
  crPnfl: string;
  debitName: string;
  debPnfl: string;
  // forderDay: string
};

const AccountEntryFormNew = () => {
  const [role] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [sum, setSum] = useState(null);
  const [form] = Form.useForm();
  const [editData, setEditData] = useState<EditData>({
    createdDate: "",
    documentNumber: null,
    creditAccount: "",
    creditINN: "",
    creditBankName: "",
    creditMFO: "",
    sum: "",
    debitAccount: "",
    debitINN: "",
    debitBankName: "",
    codeNaznachentiya: "",
    textNaznachentiya: "",
    statusId: "",
    id: "",
    debitMFO: "",
    creditName: "",
    crPnfl: "",
    debitName: "",
    debPnfl: "",
    // forderDay: ""
  });
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [editable, setEditable] = useState(false);
  const [creditAccount, setCreditAccount] = useState("");
  const [accountList, setAccountList] = useState([]);
  const { docId } = useParams();
  const { pathname: urlChange } = useLocation();
  const [errorList] = useState({
    createdDate: "Пожалуйста выберете Дату",
    documentNumber: "Пожалуйста выберете № документа",
    debitINN: "Пожалуйста выберете cчет плательщика",
    debitAccount: "Пожалуйста выберете cчет плательщика",
    debitMFO: "Пожалуйста выберете МФО Банка",
    debitName: "Пожалуйста выберете Наименование плательщика",
    sum: "Пожалуйста введите сумму",
    creditAccount: "Пожалуйста выберете счет получателя",
    creditName: "Пожалуйста выберете Наименование получателя",
    creditMFO: "Пожалуйста выберете МФО Банка",
  });

  const fetchEditForm = async () => {
    const infoEdit = await editFormData(docId);
    setEditData(infoEdit);
  };

  const checkValue = (name: string) =>
    form.getFieldValue(name) ? true : false;

  const handleDebet = async (value: string, type: string) => {
    setLoading(true);
    console.log({ value, type });
    if (value) {
      if (type === "debet") {
        const request = await getActiveInfo({
          name: value,
        });
        setLoading(false);
        if (request.client && request.inn) {
          form.setFieldValue("debitName", request.client);
          form.setFieldValue("debitINN", request.inn);
          form.setFieldValue("debitBankName", request.ownerName);
          form.setFieldValue("debitMFO", request.ownerBranchMFO);
        }
        setLoading(false);
      } else {
        const { client, inn, ownerName, ownerBranchMFO } = await getActiveInfo({
          name: value,
        });
        console.log({ client, inn, ownerName, ownerBranchMFO });
        if (client) {
          form.setFieldValue("creditName", client);
        }
        if (inn) {
          form.setFieldValue("creditINN", inn);
        }
        if (ownerName) {
          form.setFieldValue("creditBankName", ownerName);
        }
        if (ownerBranchMFO) {
          form.setFieldValue("creditMFO", ownerBranchMFO);
        }
        console.log(
          'form.getFieldValue("creditName");: ',
          form.getFieldValue("creditName")
        );
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!location.pathname.includes("new-doc")) {
      setEditable(true);
      fetchEditForm();
    } else {
      setEditable(false);
      form.resetFields();
    }
  }, [urlChange]);

  const fetchActiveList = async () => {
    const request = await getActiveList({
      clientId: 2,
    });

    setAccountList(request);
  };

  useEffect(() => {
    fetchActiveList();
  }, []);

  const confirmForm = () => {
    message.success("Поручение создано");
    navigate("/account-list");
  };

  const failConfirmForm = () => {
    message.error("Couldn't send form");
  };

  const onFinish = async ({ createdDate, ...values }: any) => {
    setLoading(true);
    console.log({ values });
    try {
      // const formattedValues = {
      //   ...values,
      //   fval: "0",
      //   forderDay: "08.12.2023",
      //   createdDate: dayjs(values.createdDate).format("DD.MM.YYYY"),
      //   sum: values.sum.toString(),
      // };

      const request = await createNewOrder({
        ...values,
        createdDate: dayjs(createdDate).format("YYYY-MM-DD"),
      });
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
    let errors = errorInfo.errorFields.reduce(
      (acc: unknown, { name }: unknown) => {
        let tempError = name[0];
        return [...acc, errorList[tempError]];
      },
      []
    );

    // console.log('errors.join(),: ', errors.join(''));
    notificationApi.error({
      message: "Ошибка",
      duration: 0,
      placement: "top",
      description: errors.map((err: string) => (
        <div style={{ color: "red" }}>{err}</div>
      )),
    });
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
    if (editData?.statusId === "12" || editData?.statusId === "11") {
      return null;
    }
    if (editData?.statusId === "10") {
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
              newStatusId: tempStatus?.statusId,
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
        _.find(status, { statusId: Number(editData?.statusId) + 1 }) || {};
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
              newStatusId: tempStatus?.statusId,
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
      return Promise.reject(new Error("Нужно ввести 9 символов ввода."));
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
      <h1 style={{ textAlign: "center", marginBottom: 16 }}>
        {editable ? "Изменить поручение" : "Новое поручение"}
      </h1>
      <Divider></Divider>

      {contextHolder}
      {notificationContextHolder}
      <Form
        layout="horizontal"
        style={{
          padding: "10px",
          borderRadius: "10px",
          marginTop: 40,
        }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        fields={
          editable
            ? [
                {
                  name: ["createdDate"],
                  value: dayjs(editData?.createdDate),
                },
                {
                  name: ["documentNumber"],
                  value: editData?.documentNumber,
                },
                {
                  name: ["creditAccount"],
                  value: editData?.creditAccount,
                },
                {
                  name: ["creditINN"],
                  value: editData?.creditINN,
                },
                {
                  name: ["creditBankName"],
                  value: editData?.creditBankName,
                },
                {
                  name: ["creditMFO"],
                  value: editData?.creditMFO,
                },
                {
                  name: ["sum"],
                  value: editData?.sum,
                },
                {
                  name: ["debitAccount"],
                  value: editData?.debitAccount,
                },
                {
                  name: ["debitINN"],
                  value: editData?.debitINN,
                },
                {
                  name: ["debitBankName"],
                  value: editData?.debitBankName,
                },
                {
                  name: ["codeNaznachentiya"],
                  value: editData?.codeNaznachentiya,
                },
                {
                  name: ["textNaznachentiya"],
                  value: editData?.textNaznachentiya,
                },
                {
                  name: ["debitMFO"],
                  value: editData?.debitMFO,
                },
                {
                  name: ["creditName"],
                  value: editData?.creditName,
                },
                {
                  name: ["crPnfl"],
                  value: editData?.crPnfl,
                },
                {
                  name: ["debitName"],
                  value: editData?.debitName,
                },
                {
                  name: ["debPnfl"],
                  value: editData?.debPnfl,
                },
              ]
            : []
        }
      >
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          label="№ документа"
          name="documentNumber"
          rules={[
            { required: true, message: "" },
            { validator: validateDokNumber },
          ]}
          style={{
            marginLeft: "30%",
          }}
        >
          <Input
            maxLength={10}
            type="number"
            style={{ display: "flex", width: 400 }}
            className="aaaaaaaa"
          />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          label="Дата документа:"
          name="createdDate"
          rules={[{ required: true, message: "" }]}
          style={{
            marginLeft: "30%",
          }}
        >
          <DatePicker
            placeholder="Выберите дату"
            format="DD.MM.YYYY"
            inputReadOnly={editData ? true : false}
            style={{
              display: "flex",
              width: 400,
            }}
          />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          label="Сумма"
          rules={[{ required: true, message: "" }]}
          name="sum"
          style={{
            marginLeft: "30%",
          }}
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
            style={{ width: 400, display: "flex" }}
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

        <Divider orientation="left"></Divider>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            className="inline"
            style={{
              display: "flex",
              // justifyContent: "flex-start",
              // flexWrap: "wrap",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <h3 style={{ marginBottom: 10 }}>Дебет</h3>
            <div>
              <Form.Item
                label="Счет плательщика"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                  { validator: validateAccount },
                ]}
                name="debitAccount"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 20 }}
              >
                <Select
                  style={{
                    width: 400,
                    display: "flex",
                  }}
                  onChange={(value: string) => handleDebet(value, "debet")}
                  allowClear
                >
                  {accountList && accountList.length
                    ? accountList.map(({ account }: any) => (
                        <Select.Option value={account}>{account}</Select.Option>
                      ))
                    : null}
                </Select>
              </Form.Item>
              <Form.Item
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 20 }}
                label="Наименование плательщика"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
                name="debitName"
                style={
                  {
                    // marginRight: 40,
                  }
                }
              >
                <Input
                  disabled={isLoading}
                  readOnly={true}
                  style={{ width: 400, display: "flex" }}
                />
              </Form.Item>
              <Form.Item
                label="ИНН"
                // rules={[{ validator: validateINN }]}
                name="debitINN"
                style={
                  {
                    // marginRight: 40,
                  }
                }
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 20 }}
              >
                <Input
                  disabled={isLoading}
                  readOnly={true}
                  style={{ width: 400, display: "flex" }}
                />
                {/* <Input disabled={editData.debitINN ? true : false} maxLength={9} /> */}
              </Form.Item>
            </div>

            <Form.Item
              label="Банк"
              style={{}}
              name="debitBankName"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 20 }}
            >
              <Input
                value={"test"}
                readOnly={true}
                // disabled={editData.debitBankName ? true : false}
                style={{ width: 400, display: "flex" }}
              />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 20 }}
              label="Код Банка"
              name="debitMFO"
            >
              <Input
                readOnly={true}
                maxLength={5}
                style={{ width: 400, display: "flex" }}
              />
            </Form.Item>
          </div>

          <Divider type="vertical" />

          <div
            className="inline"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <h3 style={{ marginBottom: 10 }}>Кредит</h3>

            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 20 }}
              label="Счет получателя"
              rules={[
                {
                  required: true,
                  message: "",
                },
                { validator: validateAccount },
              ]}
              name="creditAccount"
            >
              <div style={{ display: "flex" }}>
                <Input
                  onChange={({ target: { value } }) => {
                    setCreditAccount(value);
                  }}
                  maxLength={20}
                  style={{ width: 400, display: "flex", marginRight: 10 }}
                />

                <RightCircleFilled
                  onClick={() => {
                    if (creditAccount) {
                      form.setFieldValue("creditName", "");
                      form.setFieldValue("creditINN", "");
                      form.setFieldValue("creditBankName", "");
                      form.setFieldValue("creditMFO", "");
                      handleDebet(creditAccount, "credit");
                    }
                  }}
                  style={{ fontSize: 24, color: "#1677ff", cursor: "pointer" }}
                />
              </div>
            </Form.Item>

            {/* <Form.Item style={{ marginRight: 8 }}>
              <RightCircleFilled
                onClick={() => {
                  if (creditAccount) {
                    form.setFieldValue("creditName", "");
                    form.setFieldValue("creditINN", "");
                    form.setFieldValue("creditBankName", "");
                    form.setFieldValue("creditMFO", "");
                    handleDebet(creditAccount, "credit");
                  }
                }}
                style={{ fontSize: 24, color: "#1677ff", cursor: "pointer" }}
              />
            </Form.Item> */}

            <Form.Item
              label="Наименование получателя"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
              name="creditName"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 20 }}
            >
              <Input
                readOnly={checkValue("creditName")}
                style={{
                  width: 400,
                  display: "flex",
                }}
              />
            </Form.Item>

            <Form.Item
              label="ИНН"
              rules={[{ validator: validateINN }]}
              name="creditINN"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 20 }}
            >
              <Input
                maxLength={9}
                readOnly={checkValue("creditINN")}
                style={{
                  width: 400,
                  display: "flex",
                }}
              />
              {/* <Input
                style={{
                  width: 184,
                  display: "flex",
                }}
                maxLength={9}
              /> */}
            </Form.Item>

            <Form.Item
              label="Банк"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 20 }}
              name="creditBankName"
            >
              <Input
                readOnly={checkValue("creditBankName")}
                style={{
                  width: 400,
                  display: "flex",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Код Банка"
              rules={[
                { required: true, message: "" },
                { validator: validateMinLengthMFO },
              ]}
              name="creditMFO"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 20 }}
            >
              <Input
                maxLength={5}
                readOnly={checkValue("creditMFO")}
                style={{
                  width: 400,
                  display: "flex",
                }}
              />
            </Form.Item>
          </div>
        </div>
        <Divider />

        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          label="Код назначения"
          style={{
            marginLeft: "30%",
          }}
          name="codeNaznachentiya"
          rules={[
            { required: true, message: "" },
            { validator: validateDokNumber },
          ]}
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
            style={{ width: 400, display: "flex" }}
          />
        </Form.Item>

        <Form.Item
          label="Детали платежа"
          name="textNaznachentiya"
          style={{
            marginLeft: "30%",
          }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
        >
          <TextArea rows={4} style={{ width: 400, display: "flex" }} />
        </Form.Item>

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

              {editData?.statusId === "11" ? null : (
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

export default () => <AccountEntryFormNew />;
