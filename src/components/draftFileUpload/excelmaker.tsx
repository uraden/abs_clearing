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
    const worksheet = workbook.addWorksheet("Sheet1");

    // Set up the first row with merged cells
    worksheet.addRow(["Number", "Data", 31]);
    worksheet.mergeCells("A1:C1");

    // Set up the second row
    worksheet.addRow(["", "Date", backendData.date]);

    // Set up the third row with merged cells
    worksheet.addRow(["", "Customer", "", "", "Solder", ""]);
    worksheet.mergeCells("B3:C3");
    worksheet.mergeCells("D3:F3");

    // Set up the fourth row
    worksheet.addRow([
      "Debit",
      backendData.debit.customer[0],
      backendData.debit.customer[1],
      backendData.debit.customer[2],
      "",
      backendData.iin.solder[0],
      backendData.iin.solder[1],
    ]);

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
