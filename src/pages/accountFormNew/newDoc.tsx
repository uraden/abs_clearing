import { useState, useEffect } from "react";
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
  Space,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { withDecimal } from "../../assets/numberToJs";

import _ from "lodash";
import dayjs from "dayjs";
import { DownCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  createNewOrder,
  getPaymentPurposes,
  getActiveList,
  getActiveInfo,
} from "./request";
import { IPurpose } from "../../assets/interfaces";

const AccountEntryFormNew = () => {
  // const [role] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [sum, setSum] = useState(null);
  const [form] = Form.useForm();

  // const [api, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [editable] = useState(false);
  const [tempCreditAccount, setTempCreditAccount] = useState("");
  const [debetAccount, setDebetAccount] = useState("");
  const [accountList, setAccountList] = useState([]);
  const [purposeList, setPurposeList] = useState<IPurpose[]>([]);
  // const { docId } = useParams();
  // const { pathname: urlChange } = useLocation();
  const [docType, setDocType] = useState("01");
  const [errorList] = useState({
    operDay: "Пожалуйста выберете Дату",
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

  useEffect(() => {
    form.setFieldValue("debitAccount", null);
    form.setFieldValue("debitName", null);
    form.setFieldValue("debitINN", null);
    form.setFieldValue("debitBankName", null);
    form.setFieldValue("debitMFO", null);
  }, [docType]);

  const handleDebet = async (value: string, type: string) => {
    setLoading(true);
    if (value) {
      if (type === "debet") {
        const request = await getActiveInfo({
          name: value,
        });
        setLoading(false);
        if (request.client) {
          form.setFieldValue("debitName", request.client);
        }
        if (request.inn) {
          form.setFieldValue("debitINN", request.inn);
        }
        if (request.ownerName) {
          form.setFieldValue("debitBankName", request.ownerName);
        }
        if (request.ownerBranchMFO) {
          form.setFieldValue("debitMFO", request.ownerBranchMFO);
        }
      } else if (type === "credit") {
        const { client, inn, ownerName, ownerBranchMFO } = await getActiveInfo({
          name: value,
        });

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
        setLoading(false);
      }
    } else {
      const { client, inn, ownerName, ownerBranchMFO } = await getActiveInfo({
        name: value,
      });
      if (client) {
        form.setFieldValue("debitName", client);
      }
      if (inn) {
        form.setFieldValue("debitINN", inn);
      }
      if (ownerName) {
        form.setFieldValue("debitBankName", ownerName);
      }
      if (ownerBranchMFO) {
        form.setFieldValue("debitMFO", ownerBranchMFO);
      }
      setLoading(false);
    }
    setLoading(false);
  };

  const fetchActiveList = async () => {
    const request = await getActiveList();
    setAccountList(request);
    const paymentPurpose = await getPaymentPurposes();
    setPurposeList(paymentPurpose);
  };

  useEffect(() => {
    fetchActiveList();
  }, []);

  const confirmForm = () => {
    message.success("Документ создан");
    navigate("/account-list");
  };

  const failConfirmForm = () => {
    message.error("Документ не создан");
  };

  // eslint-disable-next-line
  const onFinish = async ({ operDay, ...values }: any) => {
    setLoading(true);
    console.log("valuess: ", values);
    try {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const request = await createNewOrder({
        ...values,
        operDay: dayjs(operDay).format("YYYY-MM-DD"),
      });
      console.log("request: ", request);

      confirmForm();
      setLoading(false);
    } catch (err) {
      failConfirmForm();
    }
  };

  interface ErrorInfo {
    errorFields: Array<{ name: string }>;
    // Add other properties if necessary
  }

  const onFinishFailed = (errorInfo: unknown) => {
    const errors = (errorInfo as ErrorInfo).errorFields.reduce(
      // @ts-expect-error remove this
      (acc: unknown, { name }: unknown) => {
        const tempError = name[0];
        // @ts-expect-error remove this
        return [...acc, errorList[tempError]];
      },
      []
    );
    console.log("errorInfo: ", errorInfo);
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

  // @ts-expect-error try
  const normalizeValue = (value) => {
    const filteredValue = value.replace(/\D/g, "");
    return filteredValue;
  };

  const validateMinLengthDescription = (_: unknown, value: unknown) => {
    if (typeof value === "string" && value.length > 490) {
      return Promise.reject(new Error("Максимум 490 символов ввода."));
    }
    return Promise.resolve();
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: 16 }}>Новый документ </h1>
      <Divider></Divider>

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
        initialValues={{
          documentType: docType,
        }}
      >
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          label="Тип документа"
          name="documentType"
          rules={[{ required: true, message: "" }]}
          style={{
            marginLeft: "30%",
          }}
        >
          <Select
            style={{
              width: 400,
              display: "flex",
            }}
            onChange={(value: string) => setDocType(value)}
            // allowClear
          >
            <Select.Option value="01">Платежное поручение</Select.Option>
            <Select.Option value="21">Пл.поруч.через сист.дист.обсл.</Select.Option>
            {/* <Select.Option value="06">Мемориальный ордер</Select.Option> */}
          </Select>
        </Form.Item>
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
            // type="number"
            style={{ display: "flex", width: 400 }}
            className="aaaaaaaa"
          />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          label="Дата документа:"
          name="operDay"
          rules={[{ required: true, message: "" }]}
          style={{
            marginLeft: "30%",
          }}
        >
          <DatePicker
            placeholder="Выберите дату"
            format="DD.MM.YYYY"
            style={{
              display: "flex",
              width: 400,
            }}
          />
        </Form.Item>

        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          label="Сумма документа"
          rules={[{ required: true, message: "" }]}
          name="sum"
          style={{
            marginLeft: "30%",
          }}
        >
          <InputNumber
            decimalSeparator="."
            // @ts-expect-error try
            formatter={(value) => {
              if (value && value.toString().includes(".")) {
                const [int, decimal] = value.toString().split(".");
                return `${int}.${decimal.slice(0, 2)}`;
              }
              return value;
            }}
            // write parser function to remove all non decimal character when user input
            parser={(value) => {
              if (!value || value === ".") {
                return "";
              }
              return value.replace(/[^0-9.]/g, "");
            }}
            onChange={(value) => {
              // @ts-expect-error try
              setSum(value);
            }}
            style={{ width: 400, display: "flex" }}
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
            <div>{withDecimal(sum)}</div>
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
                label="Лицевой счет плательщика"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                  { validator: validateAccount },
                ]}
                name="debitAccount"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                {docType === "01" || docType === "21"? (
                  <Select
                    style={{
                      width: 400,
                      display: "flex",
                      textAlign: "left",
                    }}
                    onChange={(value: string) => handleDebet(value, "debet")}
                    allowClear
                  >
                    {accountList && accountList.length
                      ? // eslint-disable-next-line
                        accountList.map(({ account }: any) => (
                          <Select.Option value={account}>
                            {account}
                          </Select.Option>
                        ))
                      : null}
                  </Select>
                ) : (
                  <div style={{ display: "flex" }}>
                    <Input
                      onChange={({ target: { value } }) => {
                        setDebetAccount(value);
                      }}
                      maxLength={20}
                      style={{ width: 400, display: "flex", marginRight: 10 }}
                    />

                    <DownCircleFilled
                      onClick={() => {
                        // console.log('debet: ', debetAccount);

                        if (debetAccount) {
                          form.setFieldValue("creditName", "");
                          form.setFieldValue("creditINN", "");
                          form.setFieldValue("creditBankName", "");
                          form.setFieldValue("creditMFO", "");
                          handleDebet(debetAccount, "debet");
                        }
                      }}
                      style={{
                        fontSize: 24,
                        color: "#1677ff",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                )}
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
              >
                <Input style={{ width: 400, display: "flex" }} />
              </Form.Item>
              <Form.Item
                label="ИНН плательщика"
                rules={[
                  { validator: validateINN },
                  { required: true, message: "" },
                ]}
                name="debitINN"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 20 }}
              >
                <InputNumber
                  maxLength={9}
                  style={{ width: 400, display: "flex" }}
                />
                {/* <Input disabled={editData.debitINN ? true : false} maxLength={9} /> */}
              </Form.Item>
            </div>

            <Form.Item
              label="Наименование банка плательщика"
              // style={{}}
              name="debitBankName"
              rules={[{ required: true, message: "" }]}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 20 }}
            >
              <Input
                // value={"test"}
                // disabled={editData.debitBankName ? true : false}
                style={{ width: 400, display: "flex" }}
              />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 20 }}
              label="МФО банка плательщика"
              name="debitMFO"
              rules={[{ required: true, message: "" }]}
              normalize={normalizeValue}
            >
              <Input maxLength={5} style={{ width: 400, display: "flex" }} />
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
              label="Лицевой счет получателя"
              rules={[
                {
                  required: true,
                  message: "",
                },
                { validator: validateAccount },
              ]}
              name="creditAccount"
            >
              <Space.Compact style={{ width: "100%" }}>
                <Input
                  onChange={({ target: { value } }) => {
                    console.log("val: ", value);
                    setTempCreditAccount(value);
                  }}
                  maxLength={20}
                  style={{ width: 400}}
                />

                <DownCircleFilled
                  onClick={() => {
                    if (tempCreditAccount) {
                      form.setFieldValue("creditName", "");
                      form.setFieldValue("creditINN", "");
                      form.setFieldValue("creditBankName", "");
                      form.setFieldValue("creditMFO", "");
                      handleDebet(tempCreditAccount, "credit");
                    }
                  }}
                  style={{
                    fontSize: 24,
                    color: "#1677ff",
                    cursor: "pointer",
                    marginLeft: 5,
                  }}
                />
                </Space.Compact>
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
                // readOnly={checkValue("creditName")}
                style={{
                  width: 400,
                  display: "flex",
                }}
              />
            </Form.Item>

            <Form.Item
              label="ИНН получателя"
              rules={[
                { required: true, message: "" },
                { validator: validateINN },
              ]}
              name="creditINN"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 20 }}
            >
              <InputNumber
                maxLength={9}
                // readOnly={checkValue("creditINN")}
                style={{
                  width: 400,
                  display: "flex",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Наименование банка получателя"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 20 }}
              name="creditBankName"
              rules={[{ required: true, message: "" }]}
            >
              <Input
                // readOnly={checkValue("creditBankName")}
                style={{
                  width: 400,
                  display: "flex",
                }}
              />
            </Form.Item>

            <Form.Item
              label="МФО банка получателя"
              rules={[
                { required: true, message: "" },
                { validator: validateMinLengthMFO },
              ]}
              name="creditMFO"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 20 }}
              normalize={normalizeValue}
            >
              <Input
                maxLength={5}
                // readOnly={checkValue("creditMFO")}
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
            marginLeft: "20%",
          }}
          name="codeNaznachentiya"
          rules={[
            { required: true, message: "" },
            // { validator: validateDokNumber },
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
            // @ts-ignore
            // @ts-expect-error try
            options={purposeList.map((purpose: IPurpose) => ({
              label: `${purpose.code} - ${purpose.name}`,
              value: purpose.code,
            }))}
            style={{ width: "80%", display: "flex" }}
          />
        </Form.Item>

        <Form.Item
          label="Детали платежа"
          name="textNaznachentiya"
          style={{
            marginLeft: "20%",
          }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          rules={[
            { required: true, message: "" },
            { validator: validateMinLengthDescription },
          ]}
        >
          <TextArea rows={4} style={{ width: "80%", display: "flex" }} />
        </Form.Item>

        <div
          className="horizontal"
          style={{ display: "flex", justifyContent: "center", gap: 16 }}
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
        </div>
      </Form>
  
    </>
  );
};

export default () => <AccountEntryFormNew />;
