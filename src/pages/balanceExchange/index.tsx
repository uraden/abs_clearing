import {
  Button,

  DatePicker,
  Form,
  Select,

  notification,
} from "antd";

import { useEffect, useState } from "react";

import dayjs from "dayjs";
import * as ExcelJS from "exceljs";
import { getAccountReport } from "../accountBalancePage/request";

const { RangePicker } = DatePicker;

const AccountReport = () => {

  const [isLoading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [apiData, setApiData] = useState([]);



  
  const onFinish = async (values: unknown) => {
    setLoading(true);


    const response = await getAccountReport({
      //@ts-expect-error try to fix
      account: values.account,
      //@ts-expect-error try to fix
      fromDate: dayjs(values.range[0]).format("YYYY-MM-DD"),
      //@ts-expect-error try to fix
      toDate: dayjs(values.range[1]).format("YYYY-MM-DD"),
    });

    setApiData(response);
    setLoading(false);
    if (!response.data.length) {
      setLoading(false);
      return api.warning({
        message: "Нет отчетов",
        //@ts-expect-error try to fix
        description: `Нету отчетов c ${dayjs(values.range[0]).format(
          "YYYY-MM-DD"
          //@ts-expect-error try to fix
        )} - до ${dayjs(values.range[1]).format("YYYY-MM-DD")}`,
      });
    }
    
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("errorInfo: ", errorInfo);
  };

  
  const apiExcelData = apiData.map(
    (item: {
      documentType: string;
      mfo: string;
      account: string;
      documentNumber: string;
      debit: number;
      credit: number;
    }) => {
      return {
        BO: item.documentType,
        MFO: item.mfo,
        Счет: item.account,
        "№ Док": item.documentNumber,
        Дебет: item.debit,
        Кредит: item.credit,
      };
    }
  );

  console.log('999999999', apiExcelData)

  const generateExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    // Create a worksheet
    worksheet.addRow(["", "", "", "", "Форма", "00150LS"]);
    const greyRow = worksheet.lastRow;
    // @ts-expect-error try to fix
    greyRow.eachCell((cell, colNumber) => {
      if (colNumber <= 6) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "00FFFF" },
        };
      }
    });

    worksheet.addRow([]);

    const titleRow = worksheet.addRow([`"Milliy kliring markazi" AJ`]);
    titleRow.getCell(1).alignment = { horizontal: "center" };
    titleRow.getCell(1).font = { bold: true };

    worksheet.addRow([]);
    // @ts-expect-error try to fix
    worksheet.addRow(["Код филиала", Number(apiData[0]?.branchMFO)]);

    const mfoCode = worksheet.getCell('B5'); 
    mfoCode.alignment = { horizontal: 'left' };
    
    // @ts-expect-error try to fix
    worksheet.addRow(["Валюта", `${apiData[0]?.currencyType}`]);

    worksheet.addRow([]);

    const headerRow = worksheet.addRow([
      "№",
      "Лицовой счет",
      "Входящий  остаток",
      "Обароты",
      "",      
      "Исходящий остаток",
    ]);
    
    const subHeaderRow = worksheet.addRow([
      "",    
      "",
      "",
      "Дебет", 
      "Кредит", 
      "",
    ]);
    

    worksheet.mergeCells('D8:E8');
    
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
      cell.alignment = { horizontal: "center" };
    });
    
    
    subHeaderRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
      cell.alignment = { horizontal: "center" };
    });
    
    // @ts-expect-error try
    headerRow.getCell(3).alignment = { horizontal: "center", vertical: "center" };
    headerRow.getCell(4).alignment = { horizontal: "center" };
    headerRow.getCell(5).alignment = { horizontal: "center" };
    
  
    interface ApiData {
      id: number;
      account: string;
      branchMFO: string;
      debit: number;
      credit: number;
      endAmount: number;
    }
    
    // Assuming apiData is an array of ApiData

    apiData.forEach((data : ApiData) => {
      const dataRow = worksheet.addRow([
        data.id,
        Number(data.account),
        Number(data.branchMFO), 
        Number(data.debit),      
        Number(data.credit),     
        Number(data.endAmount),  
      ]);
    
      dataRow.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };
        cell.alignment = { horizontal: "center" };
    
        // Set the number format to display the whole number
        cell.numFmt = '0';
      });
    });
    
    // Increment the row number for the sub-header row
    const subHeaderRowNumber = headerRow.number + 1;
    
    // Adjust the starting row number for the API data rows
    const apiDataStartRowNumber = subHeaderRowNumber + 1;
    
    // Iterate through the API data again to apply styles
    apiExcelData.forEach((data, index) => {
      const dataRowIndex = apiDataStartRowNumber + index;
      const dataRow = worksheet.getRow(dataRowIndex);
    
      dataRow.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };
        cell.alignment = { horizontal: "center" };
      });
    });
    
    // const totalRow = worksheet.addRow([
    //   "",
    //   "",
    //   "",
    //   "ИТОГО:",
    //   // @ts-expect-error try
    //   `${apiData?.debitSumTotal}`,
    //   // @ts-expect-error try
    //   `${apiData?.creditSumTotal}`,
    // ]);

    // totalRow.eachCell((cell, index) => {
    //   cell.border = {
    //     top: { style: "thin" },
    //     bottom: { style: "thin" },
    //     left: { style: "thin" },
    //     right: { style: "thin" },
    //   };
    //   cell.alignment = { horizontal: index === 1 ? "center" : "right" };
    // });

    worksheet.addRow([""]);

    const inChargePerson = worksheet.addRow([
      "Ответственный исполнитель",
      "",
      "",
      "",
      "",
      "",
    ]);

    inChargePerson.eachCell((cell) => {
      cell.font = { bold: true, size: 12 };
    });

    const borderInChargePerson = inChargePerson.getCell(3);
    const borderInChargePerson2 = inChargePerson.getCell(5);
    borderInChargePerson.border = { bottom: { style: "thin" } };
    borderInChargePerson2.border = { bottom: { style: "thin" } };

    worksheet.addRow([""]);

    const accountantHead = worksheet.addRow([
      "Главный бухгалтер",
      "",
      "",
      "",
      "",
      "",
    ]);

    accountantHead.eachCell((cell) => {
      cell.font = { bold: true, size: 12 };
    });

    const borderaccountantHead = accountantHead.getCell(3);
    const borderaccountantHead2 = accountantHead.getCell(5);
    borderaccountantHead.border = { bottom: { style: "thin" } };
    borderaccountantHead2.border = { bottom: { style: "thin" } };

    worksheet.addRow([""]);
    worksheet.addRow([""]);
    worksheet.addRow([""]);

    const currentDate = new Date();
    const currentTime = currentDate.getTime();

  let minutes = Math.floor((currentTime % (60 * 60 * 1000)) / (60 * 1000));

  // @ts-expect-error try
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  const nowTime = `${currentDate.getHours()}:${minutes}`;

  console.log(`Current Time: ${nowTime}`);


    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;

    const rowDate = worksheet.addRow(["Дата изготовления", "", `${formattedDate} ${nowTime}`, "", "", ""]);
    rowDate.eachCell((cell) => {
      cell.font = { bold: true };
    });

    
    rowDate.eachCell((cell, colNumber) => {
      if (colNumber <= 7) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "00FFFF" },
        };
      }
    });

    worksheet.mergeCells("A3:F3");
    worksheet.mergeCells("A19:D19");

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
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Выписка лицевого счета.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (apiData.length > 0) {
      generateExcel();
    }
  }, [apiData]);

  return (
    <div style={{ padding: 8, fontSize: 16 }}>
      <div className="title">Сальдо-оборотная ведомость</div>
      {contextHolder}
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
            label="Выберите валюту"
            name="account"
            rules={[{ required: true, message: "Выберите валюту" }]}
          >
            <Select style={{ width: 200 }}>
              <Select.Option value="RUB">RUB</Select.Option>
              <Select.Option value="USD">USD</Select.Option>
              <Select.Option value="UZS">UZS</Select.Option>
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
            <Button
              style={{ outline: "none" }}
              loading={isLoading}
              type="primary"
              htmlType="submit"
            >
              Скачать отчет
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AccountReport;
