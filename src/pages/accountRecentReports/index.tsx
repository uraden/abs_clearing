import { Button, DatePicker, Form, Select, Table, notification } from "antd";
import jsPDF from "jspdf";
import moment from "moment";
import { getAccount, getAccountReportData, getAccounts } from "./request";
import { useEffect, useState } from "react";

const AccountReport = () => {
  const doc = new jsPDF({
    orientation: "landscape",
  });
  const [isLoading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState<any>({});
  const [api, contextHolder] = notification.useNotification();
  const [accountList, setAccountList] = useState([]);

  const handlePdf = () => {
    doc.addFileToVFS("WorkSans-normal.ttf", font);

    doc.addFont("WorkSans-normal.ttf", "WorkSans", "normal");

    doc.setFont("WorkSans"); // set font
    doc.setFontSize(10);
    doc.line(15, 15, 280, 15);
    doc.text("00150LS", 15, 20);
    doc.text("Дата изготовления:", 215, 20);
    doc.text("27.12.2023 14:06", 250, 20);
    doc.text('01203 "Milliy kliring markazi" AJ ', 30, 24);
    doc.text("Лицевой счет", 140, 28);
    doc.text("21596000800447893003", 100, 32);
    doc.text("c 29.12.2023 до 08.08.2024", 150, 32);
    doc.text(
      '"Freedom Finance" MCHJ" AJ Davon Bank hello world uyo buyo',
      30,
      36
    );
    doc.text("Дата посл. операции: 26.12.2023", 30, 40);
    doc.line(15, 44, 280, 44);
    doc.text("ВХ. ОСТАТОК ПАССИВ", 15, 48);
    doc.text("1 000 000,00", 240, 48);
    doc.text("ИСХ. ОСТАТОК ПАССИВ", 15, 52);
    doc.text("1 000 000,00", 240, 52);
    doc.text("ВО", 15, 56);
    doc.text("МФО", 25, 56);
    doc.text("СЧЕТ", 49, 56);
    doc.text("№ ДОК", 80, 56);
    doc.text("ДЕБЕТ", 110, 56);
    doc.text("КРЕДИТ", 170, 56);
    doc.text("01", 15, 60);
    doc.text("00014", 24, 60);
    doc.text("21596000400447893001", 36, 60);
    doc.text("0000004565", 77, 60);
    doc.text("123430608000.00", 102, 60);
    doc.text("МКМ", 170, 60);
    doc.text("06", 15, 64);
    doc.text("00014", 24, 64);
    doc.text("17101000900000074840", 36, 64);
    doc.text("0000000456", 77, 64);
    doc.text("МКМ", 102, 64);
    doc.text("99401400000.00", 160, 65);
    doc.text("ИТОГО:", 15, 70);
    doc.text("865149397485.00", 102, 70);
    doc.text("807078008640.00", 160, 70);

    doc.save("test");
  };

  const fetchAccounts = async () => {
    const request = await getAccounts();
    setAccountList(request.map(({ account }: any) => account));
  };

  useEffect(() => {
    setCurrentTime({
      format1: moment().format("DD.MM.YYYY"),
      format2: moment().format("YYYY-MM-DD"),
    });
    fetchAccounts();
  }, []);

  const onFinish = async ({ account }: any) => {
    console.log("vall: ", { account });
    setLoading(true);
    const request = await getAccountReportData({
      account: "22204000100001203001",
      fromDate: currentTime.format2,
      toDate: currentTime.format2,
    });
    if (!request.data.length) {
      setLoading(false);
      return api.warning({
        message: "Нет отчетов",
        description: `Нету отчетов на ${currentTime.format1}`,
      });
    }
    
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("errorInfo: ", errorInfo);
  };

  return (
    <div style={{ padding: 8, fontSize: 16 }}>
      {contextHolder}
      <div className="title">Выписка лицевых счетов</div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Form
          layout="horizontal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <Form.Item
            // labelCol={{ span: 4 }}
            // wrapperCol={{ span: 14 }}
            label="Выберите счет"
            name="account"
            rules={[{ required: true, message: "" }]}
          >
            <Select style={{ width: 200 }}>
              {accountList.map((account: string) => (
                <Select.Option value={account}>{account}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Дата">{currentTime.format1}</Form.Item>
          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit">
              Скачать отчет
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AccountReport;
