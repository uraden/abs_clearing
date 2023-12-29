import { Button, DatePicker, Table } from "antd";
import jsPDF from "jspdf";

const { RangePicker } = DatePicker;

const AccountReport = () => {
  const doc = new jsPDF({
    orientation: "landscape",
  });
  const columns = [
    {
      title: "ВО",
      dataIndex: "ВО",
      width: "20%",
    },
    {
      title: "МФО",
      dataIndex: "МФО",
      // width: "25%",
    },
    {
      title: "СЧЕТ",
      dataIndex: "СЧЕТ",
    },
    {
      title: "№ ДОК",
      dataIndex: "№ ДОК",
      width: "10%",
    },
    {
      title: "ДЕБЕТ",
      dataIndex: "ДЕБЕТ",
    },
    {
      title: "КРЕДИТ",
      dataIndex: "КРЕДИТ",
    },
  ];

  const handlePdf = () => {
    doc.addFont("test/reference/PTSans.ttf", "PTSans", "normal");

    doc.setFont("PTSans"); // set font
    doc.setFontSize(10);
    doc.line(15, 15, 280, 15);
    doc.text("00150LS", 15, 20);
    doc.text("Дата изготовления:", 215, 20);
    doc.text("27.12.2023 14:06", 250, 20);
    doc.text('01203 "Milliy kliring markazi" AJ ', 30, 24);
    doc.text('Лицевой счет" AJ ', 140, 28);
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
  };
  return (
    <div>
      <Button onClick={handlePdf}>click</Button>
      <div className="title">Выписка лицевых счетов за период</div>
      {/* <div className="title">Выписка лицевых счетов за период</div> */}
      <div>
        <div className="report-wrapper">
          <div className="report-items-between">
            <div>00150LS</div>
            <div>
              Дата изготовления:{" "}
              <span style={{ fontWeight: 400 }}>27.12.2023 14:06</span>
            </div>
          </div>
          <div>
            <div>01203 "Milliy kliring markazi" AJ </div>
            <div>Лицевой счет</div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 128,
                marginTop: 8,
              }}
            >
              <div>21596000800447893003</div>
              <div>
                <RangePicker format="DD.MM.YYYY" />
              </div>
            </div>
          </div>
          <div>
            <div style={{ textAlign: "left" }}>"Freedom Finance" MCHJ</div>
            <div style={{ textAlign: "left", marginTop: 0 }}>
              Дата посл. операции: 26.12.2023
            </div>
          </div>
          <div>
            <div className="report-items-between">
              <div>ВХ. ОСТАТОК ПАССИВ</div>
              <div>1 000 000,00</div>
            </div>
            <div className="report-items-between">
              <div>ИСХ. ОСТАТОК ПАССИВ</div>
              <div>1 000 000,00</div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 24 }}>
          <Table columns={columns} dataSource={[]} />
        </div>
      </div>
    </div>
  );
};

export default AccountReport;
