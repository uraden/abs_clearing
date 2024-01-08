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
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { changeStatus } from "../../pages/accountForm/request";
import { useParams } from "react-router";

import {
  // createNewOrder,
  editFormData,
  getActiveInfo,
  getActiveList,
  // getOrderStatuses,
  getSingleOrder,
} from "./request";
import { withDecimal } from "../../assets/numberToJs";

import _ from "lodash";
import { status } from "../../assets/defaultData";
import dayjs from "dayjs";
import { DownCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { IPurpose } from "../../assets/interfaces";
import { getPaymentPurposes } from "../accountFormNew/request";

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
  documentType: string;
  // forderDay: string
};

const AccountEntryFormNew = () => {
  // const [role] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [sum, setSum] = useState(null);
  const [form] = Form.useForm();
  const [purposeList, setPurposeList] = useState<IPurpose[]>([]);
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
    documentType: "",
    // forderDay: ""
  });
  // const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [editable, setEditable] = useState(false);
  const [tempCreditAccount, setTempCreditAccount] = useState("");
  const [debetAccount, setDebetAccount] = useState("");
  const [accountList, setAccountList] = useState([]);
  const { docId } = useParams();
  // const { pathname: urlChange } = useLocation();
  const [docType, setDocType] = useState("01");
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
    const paymentPurpose = await getPaymentPurposes();
    setPurposeList(paymentPurpose);
    const infoEdit = await getSingleOrder(Number(docId));
    setEditData(infoEdit);
  };

  useEffect(() => {
    fetchEditForm();
    setEditable(true);
  }, []);

  useEffect(() => {
    form.setFieldValue("debitAccount", null);
    form.setFieldValue("debitName", null);
    form.setFieldValue("debitINN", null);
    form.setFieldValue("debitBankName", null);
    form.setFieldValue("debitMFO", null);
  }, [docType]);

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        createdDate: dayjs(editData?.createdDate),
        documentType: editData?.documentType,
        documentNumber: editData?.documentNumber,
        creditAccount: editData?.creditAccount,
        creditINN: editData?.creditINN,
        creditBankName: editData?.creditBankName,
        creditMFO: editData?.creditMFO,
        sum: editData?.sum,
        debitAccount: editData?.debitAccount,
        debitINN: editData?.debitINN,
        debitBankName: editData?.debitBankName,
        codeNaznachentiya: editData?.codeNaznachentiya,
        textNaznachentiya: editData?.textNaznachentiya,
        debitMFO: editData?.debitMFO,
        creditName: editData?.creditName,
        crPnfl: editData?.crPnfl,
        debitName: editData?.debitName,
        debPnfl: editData?.debPnfl,
      });
    }
  }, [editData]);

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
    // const request = await getActiveList({
    //   clientId: 2,
    // });

    setAccountList(request);
  };

  // const fetchStatusList = async () => {
  // const request = await getOrderStatuses();
  // setAccountList(request);
  // };

  useEffect(() => {
    fetchActiveList();
    // fetchStatusList();
  }, []);

  const confirmForm = () => {
    message.success("Поручение создано");
    navigate("/account-list");
  };

  const failConfirmForm = () => {
    message.error("Couldn't send form");
  };
  // eslint-disable-next-line
  const onFinish = async (values: any) => {
    console.log("valuess: ", values);
    setLoading(true);
    // console.log("valuess: ", values);
    try {
      const request = await editFormData({
        ...values,
        id: Number(docId),
        createdDate: dayjs(values.createdDate).format("YYYY-MM-DD"),
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
        Изменить поручение
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
            <Select.Option value="06">Мемориальный ордер</Select.Option>
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
              // @ts-expect-error remove this
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
                {docType === "01" ? (
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
                <Input maxLength={9} style={{ width: 400, display: "flex" }} />
                {/* <Input disabled={editData.debitINN ? true : false} maxLength={9} /> */}
              </Form.Item>
            </div>

            <Form.Item
              label="Банк плательщика"
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
              label="Код банка плательщика"
              name="debitMFO"
              rules={[{ required: true, message: "" }]}
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

            <div
              style={{ display: "flex", justifyContent: "center", gap: "3%" }}
            >
              <Form.Item
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 21 }}
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
                {/* <div style={{ display: "flex" }}> */}
                <Input
                  onChange={({ target: { value } }) => {
                    console.log("val: ", value);
                    setTempCreditAccount(value);
                  }}
                  maxLength={20}
                  style={{ width: 400 }}
                />
                {/* </div> */}
              </Form.Item>
              <Form.Item>
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
                  style={{ fontSize: 24, color: "#1677ff", cursor: "pointer" }}
                />
              </Form.Item>
            </div>
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
              <Input
                maxLength={9}
                // readOnly={checkValue("creditINN")}
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
              label="Банк получателя"
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
              label="Код банка получателя"
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
            options={purposeList.map((purpose: IPurpose) => ({
              label: `${purpose.code} - ${purpose.name}`,
              value: `${purpose.code}`,
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
          rules={[{ required: true, message: "" }]}
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
          {editable ? (
            <>
              {displayButton()}

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
