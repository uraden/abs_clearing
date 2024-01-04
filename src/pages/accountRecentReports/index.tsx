import { Button,  Form, Select, notification } from "antd";
// import jsPDF from "jspdf";
import moment from "moment";
import { getAccountReportData, getAccounts } from "./request";
import { useEffect, useState } from "react";
import * as ExcelJS from 'exceljs';

const AccountReport = () => {
  //eslint-disable-next-line
  // const doc = new jsPDF({
  //   orientation: "landscape",
  // });
  const [isLoading, setLoading] = useState(false);
  //eslint-disable-next-line
  const [currentTime, setCurrentTime] = useState<any>({});
  const [api, contextHolder] = notification.useNotification();
  const [accountList, setAccountList] = useState([]);
  const [apiData, setApiData] = useState();

  // const handlePdf = () => {
  //   doc.addFileToVFS("WorkSans-normal.ttf", font);

  //   doc.addFont("WorkSans-normal.ttf", "WorkSans", "normal");

  //   doc.setFont("WorkSans"); // set font
  //   doc.setFontSize(10);
  //   doc.line(15, 15, 280, 15);
  //   doc.text("00150LS", 15, 20);
  //   doc.text("Дата изготовления:", 215, 20);
  //   doc.text("27.12.2023 14:06", 250, 20);
  //   doc.text('01203 "Milliy kliring markazi" AJ ', 30, 24);
  //   doc.text("Лицевой счет", 140, 28);
  //   doc.text("21596000800447893003", 100, 32);
  //   doc.text("c 29.12.2023 до 08.08.2024", 150, 32);
  //   doc.text(
  //     '"Freedom Finance" MCHJ" AJ Davon Bank hello world uyo buyo',
  //     30,
  //     36
  //   );
  //   doc.text("Дата посл. операции: 26.12.2023", 30, 40);
  //   doc.line(15, 44, 280, 44);
  //   doc.text("ВХ. ОСТАТОК ПАССИВ", 15, 48);
  //   doc.text("1 000 000,00", 240, 48);
  //   doc.text("ИСХ. ОСТАТОК ПАССИВ", 15, 52);
  //   doc.text("1 000 000,00", 240, 52);
  //   doc.text("ВО", 15, 56);
  //   doc.text("МФО", 25, 56);
  //   doc.text("СЧЕТ", 49, 56);
  //   doc.text("№ ДОК", 80, 56);
  //   doc.text("ДЕБЕТ", 110, 56);
  //   doc.text("КРЕДИТ", 170, 56);
  //   doc.text("01", 15, 60);
  //   doc.text("00014", 24, 60);
  //   doc.text("21596000400447893001", 36, 60);
  //   doc.text("0000004565", 77, 60);
  //   doc.text("123430608000.00", 102, 60);
  //   doc.text("МКМ", 170, 60);
  //   doc.text("06", 15, 64);
  //   doc.text("00014", 24, 64);
  //   doc.text("17101000900000074840", 36, 64);
  //   doc.text("0000000456", 77, 64);
  //   doc.text("МКМ", 102, 64);
  //   doc.text("99401400000.00", 160, 65);
  //   doc.text("ИТОГО:", 15, 70);
  //   doc.text("865149397485.00", 102, 70);
  //   doc.text("807078008640.00", 160, 70);

  //   doc.save("test");
  // };

  const fetchAccounts = async () => {
    const request = await getAccounts();
    //eslint-disable-next-line
    setAccountList(request.map(({ account }: any) => account));
  };

  useEffect(() => {
    setCurrentTime({
      format1: moment().format("DD.MM.YYYY"),
      format2: moment().format("YYYY-MM-DD"),
    });
    fetchAccounts();
  }, []);

  //eslint-disable-next-line
  const onFinish = async ({ account }: any) => {
    console.log("vall: ", { account });
    setLoading(true);
    const request = await getAccountReportData({
      account: "22204000100001203001",
      fromDate: currentTime.format2,
      toDate: currentTime.format2,
      // fromDate: "2023-12-25",
      // toDate: "2023-12-26",
    });
    setApiData(request);
    setLoading(false);
    
    if (!request.data.length) {
      setLoading(false);
      return api.warning({
        message: "Нет отчетов",
        description: `Нету отчетов на ${currentTime.format1}`,
      });
    }
    
  };
  console.log('date', typeof  currentTime.format2, currentTime.format2,)

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("errorInfo: ", errorInfo);
  };

// @ts-expect-error try to fix
  const apiExcelData = apiData?.data.map((item: {
    documentType: string;
    mfo: string;
    account: string;
    documentNumber: string;
    debit: number;
    credit: number;
  }) => {
    return {
      'BO': item.documentType,
      'MFO': item.mfo,
      'Счет': item.account,
      '№ Док': item.documentNumber,
      'Дебет': item.debit,
      'Кредит': item.credit,
    };
  });

  const generateExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
  
    // Create a worksheet
    worksheet.addRow(['', '', '', '', 'Форма', '00150LS']);
    const greyRow = worksheet.lastRow;
    // @ts-expect-error try to fix
    greyRow.eachCell((cell, colNumber) => {
    if (colNumber <= 6) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00FFFF' } }; 
    }
  });

    worksheet.addRow([]);
  
    // @ts-expect-error try to fix
    const titleRow = worksheet.addRow([`${apiData ? apiData?.clientName : '"Milliy kliring markazi" AJ'}`]);
    titleRow.getCell(1).alignment = { horizontal: 'center' };
    titleRow.getCell(1).font = { bold: true };
  
    worksheet.addRow([]);
    // @ts-expect-error try to fix
    worksheet.addRow(['Код филиала', `${apiData?.branchMFO}`]);
    // @ts-expect-error try to fix
    worksheet.addRow(['Номер счета клиента', `${apiData?.ownerAccount}`]);
    // @ts-expect-error try to fix
    worksheet.addRow(['Наименование клиента', `${apiData?.clientName}`]);
    // @ts-expect-error try to fix
    worksheet.addRow(['Дата последней. Операции', `${apiData?.lastOperationDate}`]);
  
    // @ts-expect-error try to fix
    const incomingBalanceRow = worksheet.addRow(['Входящий  Остаток', `${apiData?.debitSumTotal}`]);
    incomingBalanceRow.getCell(2).numFmt = '0,000.00';
    incomingBalanceRow.getCell(2).alignment = { horizontal: 'right' };
  
    // @ts-expect-error try to fix
    const outgoingBalanceRow = worksheet.addRow(['Исходящий Остаток', `${apiData?.creditSumTotal}`]);
    outgoingBalanceRow.getCell(2).numFmt = '0,000.00';
    outgoingBalanceRow.getCell(2).alignment = { horizontal: 'right' };
  
    worksheet.addRow([]);

    const headerRow = worksheet.addRow(['BO', 'МФО', 'СЧЕТ', '№ ДОКУМЕНТА', 'Дебет (Д)', 'Кредит (К)']);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
      
      cell.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };
      
      cell.alignment = { horizontal: 'center' };
    });
  
    
    apiExcelData.forEach((data : unknown) => {
      // @ts-expect-error try to fix
      const dataRow = worksheet.addRow([data.BO, data.MFO, data.Счет, data['№ Док'], data.Дебет, data.Кредит]);
      
      dataRow.eachCell((cell) => {
        cell.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };
        cell.alignment = { horizontal: 'center' };
      });
    });
    // @ts-expect-error try to fix
    const totalRow = worksheet.addRow(['', '', '', 'ИТОГО:', `${apiData?.debitSumTotal}`, `${apiData?.creditSumTotal}`]);
    
    totalRow.eachCell((cell, index) => {
      cell.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };
      cell.alignment = { horizontal: index === 1 ? 'center' : 'right' };
    });

    worksheet.addRow(['']);

    const inChargePerson = worksheet.addRow(['Ответственный испольнитель', '', '','','', '']);

    const borderInChargePerson = inChargePerson.getCell(3)
    const borderInChargePerson2 = inChargePerson.getCell(5)
    borderInChargePerson.border = {  bottom: { style: 'thin' } };
    borderInChargePerson2.border = {  bottom: { style: 'thin' } };

    worksheet.addRow(['']);

    const accountantHead = worksheet.addRow(['Главный бухгалтер', '', '', '','', '']);

    const borderaccountantHead = accountantHead.getCell(3)
    const borderaccountantHead2 = accountantHead.getCell(5)
    borderaccountantHead.border = {  bottom: { style: 'thin' } };
    borderaccountantHead2.border = {  bottom: { style: 'thin' } };

    worksheet.addRow(['']);
    worksheet.addRow(['']);
    worksheet.addRow(['']);

    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; 
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    worksheet.addRow(['Дата изготовления', '', `${formattedDate}`, '', '', '']);
    
    const greyRowNew = worksheet.lastRow;
    // @ts-expect-error try to fix
    greyRowNew.eachCell((cell, colNumber) => {
    if (colNumber <= 7) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00FFFF' } }; 
    }
  });

    worksheet.mergeCells('A3:F3');
    worksheet.mergeCells('A19:D19');
  
    // Auto-fit column widths based on content
    worksheet.columns.forEach((column, index) => {
      let maxWidth = 0;
      // @ts-expect-error try to fix
      column.eachCell({ includeEmpty: true }, (cell) => {
        const cellWidth = cell.value ? cell.value.toString().length : 0;
        maxWidth = Math.max(maxWidth, cellWidth);
      });
      worksheet.getColumn(index + 1).width = maxWidth + 2; 
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Выписка лицевого счета.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    // @ts-expect-error try to fix
    if(apiData?.data.length > 0) {
      generateExcel()
    }
  }, [apiData])


  return (
    <div style={{ padding: 8, fontSize: 16 }}>
      {contextHolder}
      <div className="title"> Выписка лицевых счетов</div>
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
            <Button style={{ outline: 'none' }} loading={isLoading} type="primary" htmlType="submit">
              Скачать отчет
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AccountReport;
