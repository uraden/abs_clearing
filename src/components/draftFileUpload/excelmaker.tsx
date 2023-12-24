import React from "react";
import ExcelJS from "exceljs";

const ExcelExport: React.FC = () => {
  const exportToExcel = async () => {
    // Sample data from the backend
    const backendData = {
      date: "2023-01-01",
      debit: {
        customer: [100, 200, 300],
      },
      iin: {
        solder: [400, 500, 600],
      },
    };

    // Create a new workbook
    const workbook = new ExcelJS.Workbook();

    workbook.creator = "Alibek";
    workbook.lastModifiedBy = "Alibek";
    workbook.created = new Date(2023, 12, 25);
    workbook.modified = new Date();
    const worksheet = workbook.addWorksheet("sheet1");
    // Set up the first row with merged cells
    worksheet.columns = [
      { header: "ОИ" },
      { header: "Электронное Пл.поруч.через сист.дист.обсл. №" },
      {},
      {},
      { header: "31" },
    ];
    worksheet.mergeCells("B1:D1");
    worksheet.addRow(["ДАТА"]);
    worksheet.getCell("B2").value = "15.12.2023";
    worksheet.mergeCells("B2:E2");

    worksheet.getCell("A3").value = "Наименование";
    worksheet.getCell("A4").value = "плательщика";
    worksheet.getCell("B3").value = '"DASTURCHILAR LABORATORIYASI" MCHJ';
    worksheet.mergeCells("B3:E4");

    worksheet.getCell("A5").value = "ДЕБЕТ";
    worksheet.getCell("A6").value = "Счет плательщика";
    worksheet.getCell("B5").value = "20208000805474605001";
    worksheet.getCell("D5").value = "ИНН";
    worksheet.getCell("D6").value = "плательщика";
    worksheet.getCell("E5").value = "309156313";
    worksheet.mergeCells("B5:C6");
    worksheet.mergeCells("E5:E6");

    worksheet.getCell("A7").value = "Наименование";
    worksheet.getCell("A8").value = "банка плательщика";
    worksheet.getCell("B7").value =
      'ТОШКЕНТ Ш., "ИПОТЕКА-БАНК" АТИБ ЮНУСОБОД ФИЛИАЛИ';
    worksheet.getCell("D7").value = "Код банка";
    worksheet.getCell("D8").value = "плательщика";
    worksheet.getCell("E7").value = "00837";
    worksheet.mergeCells("B7:C8");
    worksheet.mergeCells("E7:E8");
    // // Set up the second row
    // worksheet.addRow(["", "Date", backendData.date]);

    // // Set up the third row with merged cells
    // worksheet.addRow(["", "Customer", "", "", "Solder", ""]);
    // worksheet.mergeCells("B3:C3");
    // worksheet.mergeCells("D3:F3");

    // Set up the fourth row
    // worksheet.addRow([
    //   "Debit",
    //   backendData.debit.customer[0],
    //   backendData.debit.customer[1],
    //   backendData.debit.customer[2],
    //   "",
    //   backendData.iin.solder[0],
    //   backendData.iin.solder[1],
    // ]);

    // Save the workbook as an Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);

    // Create a download link and trigger a click event
    const a = document.createElement("a");
    a.href = url;
    a.download = "excel_export.xlsx";
    a.click();

    // Release the object URL
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={exportToExcel}>Export to Excel</button>
    </div>
  );
};

export default ExcelExport;
