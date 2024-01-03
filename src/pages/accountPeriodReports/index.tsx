import {
  Button,
  // ConfigProvider,
  DatePicker,
  Form,
  Select,
  // Table,
  notification,
} from "antd";
import jsPDF from "jspdf";
import { font } from "../../assets/fonts/font";
import { useEffect, useState } from "react";
import {
  getAccountReportData,
  getAccounts,
} from "../accountRecentReports/request";
// import moment from "moment";
import dayjs from "dayjs";
import * as XLSX from 'xlsx';

import * as ExcelJS from 'exceljs';



const { RangePicker } = DatePicker;

const AccountReport = () => {
  const doc = new jsPDF({
    orientation: "landscape",
  });
  const [isLoading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [accountList, setAccountList] = useState([]);

  const handlePdf = (
    currentDate: string,
    ownerAccount: string,
    operDate: string,
  ) => {
    doc.addFileToVFS("WorkSans-normal.ttf", font);

    doc.addFont("WorkSans-normal.ttf", "WorkSans", "normal");

    doc.setFont("WorkSans"); // set font
    doc.setFontSize(10);
    doc.line(15, 15, 280, 15);
    doc.text("00150LS", 15, 20);
    doc.text("Дата изготовления:", 215, 20);
    doc.text(currentDate, 250, 20);
    doc.text('01203 "Milliy kliring markazi" AJ ', 30, 24);
    doc.text("Лицевой счет", 140, 28);
    doc.text(ownerAccount, 100, 32);
    doc.text(operDate, 150, 32);
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
    fetchAccounts();
  }, []);
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
  //   doc.text('Лицевой счет', 140, 28);
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

  const onFinish = async (values: any) => {
    console.log("vall: ", values);
    setLoading(true);
    const response = await getAccountReportData({
      account: values.account,
      fromDate: dayjs(values.range[0]).format("YYYY-MM-DD"),
      toDate: dayjs(values.range[1]).format("YYYY-MM-DD"),
    });
    console.log("reqqq: ", response);
    if (!response.data.length) {
      setLoading(false);
      return api.warning({
        message: "Нет отчетов",
        description: `Нету отчетов c ${dayjs(values.range[0]).format(
          "YYYY-MM-DD"
        )} - до ${dayjs(values.range[1]).format("YYYY-MM-DD")}`,
      });
    }
    handlePdf(response.currentDate, response.ownerAccount, response.operDate);
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("errorInfo: ", errorInfo);
  };









  const fakeData = [
    {
      'BO': '01',
      'MFO': '00014',
      'Счет': '21596000400447893001',
      '№ Док': '0000004565',
      'Дебет': '123430608000.00',
      'Кредит': '500',
    },
    
 
  {
    'BO': '01',
    'MFO': '00014',
    'Счет': '21596000400447893001',
    '№ Док': '0000004565',
    'Дебет': 'МКМ',
    'Кредит': '50,00',
  }   ,
  {
    'BO': '01',
    'MFO': '00014',
    'Счет': '21596000400447893001',
    '№ Док': '0000004565',
    'Дебет': 'МКМ',
    'Кредит': '50,00',
  }   ,
  {
    'BO': '01',
    'MFO': '00014',
    'Счет': '21596000400447893001',
    '№ Док': '0000004565',
    'Дебет': 'МКМ',
    'Кредит': '50,00',
  }, {
    'BO': '',
    'MFO': '',
    'Счет': '',
    '№ Док': '',
    'Дебет': '',
    'Кредит': '',
    'total': 'ИТОГО:',
    'totalDebit': '861495.00',
    'totalCredit': '80000.00',
  }     
  ]




  // excel
  const generateExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
  
    // Create a worksheet
    worksheet.addRow(['', '', '', '', 'Form', '01/01/2024']);
    const greyRow = worksheet.lastRow;
    greyRow.eachCell((cell, colNumber) => {
    if (colNumber <= 6) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC0C0C0' } }; // Grey background color
    }
  });

    worksheet.addRow([]);
  
    const titleRow = worksheet.addRow(['Title of the File']);
    titleRow.getCell(1).alignment = { horizontal: 'center' };
    titleRow.getCell(1).font = { bold: true };
  
    worksheet.addRow([]);
    worksheet.addRow(['Код филиала', '01203']);
    worksheet.addRow(['Номер счета клиента', '21596000800447893003']);
    worksheet.addRow(['Наименование клиента', '"Freedom Finance" MCHJ']);
    worksheet.addRow(['Дата последней. Операции', '26/12/2023']);
    worksheet.addRow([]);
  
    const incomingBalanceRow = worksheet.addRow(['Входящий  Остаток', 1000000.00]);
    incomingBalanceRow.getCell(2).numFmt = '0,000.00';
    incomingBalanceRow.getCell(2).alignment = { horizontal: 'right' };
  
    const outgoingBalanceRow = worksheet.addRow(['Исходящий Остаток', 1000000.00]);
    outgoingBalanceRow.getCell(2).numFmt = '0,000.00';
    outgoingBalanceRow.getCell(2).alignment = { horizontal: 'right' };
  
    worksheet.addRow([]);

    const headerRow = worksheet.addRow(['BO', 'MFO', 'Счет', '№ Док', 'Дебет', 'Кредит']);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
      
      cell.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };
      
      cell.alignment = { horizontal: 'center' };
    });
  
    
    fakeData.forEach((data) => {
      const dataRow = worksheet.addRow([data.BO, data.MFO, data.Счет, data['№ Док'], data.Дебет, data.Кредит]);
      
      dataRow.eachCell((cell) => {
        cell.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };
        cell.alignment = { horizontal: 'center' };
      });
    });
    
    // Add total row
    const totalRow = worksheet.addRow([fakeData[fakeData.length - 1].total, '', '', '', fakeData[fakeData.length - 1].totalDebit, fakeData[fakeData.length - 1].totalCredit]);
    totalRow.eachCell((cell, index) => {
      cell.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };
      cell.alignment = { horizontal: index === 1 ? 'center' : 'right' };
    });

    worksheet.mergeCells(`A${totalRow.number}:C${totalRow.number}`);



    worksheet.mergeCells('A3:F3');
    worksheet.mergeCells('A19:D19');
  
    // Auto-fit column widths based on content
    worksheet.columns.forEach((column, index) => {
      let maxWidth = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        const cellWidth = cell.value ? cell.value.toString().length : 0;
        maxWidth = Math.max(maxWidth, cellWidth);
      });
      worksheet.getColumn(index + 1).width = maxWidth + 2; 
    });

   
  
    // Save the workbook as a file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'output.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  




  return (
    <div style={{ padding: 8, fontSize: 16 }}>
      <div className="title">Выписка лицевых счетов за период</div>
      {contextHolder}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <button onClick={generateExcel}>Download Excel</button>
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
            rules={[{ required: true, message: "Выберите счет" }]}
          >
            <Select style={{ width: 200 }}>
              {accountList.map((account: string) => (
                <Select.Option value={account}>{account}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Дата"
            name="range"
            rules={[{ required: true, message: "Выберите интервал" }]}
          >
            <RangePicker />
          </Form.Item>
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
