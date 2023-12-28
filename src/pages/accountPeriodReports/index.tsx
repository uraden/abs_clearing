import { Table } from "antd";

const AccountReport = () => {
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

  return (
    <div>
      <div className="title">Выписка лицевых счетов за период</div>
      <div className="report-wrapper">
        <div className="report-items-between">
          <div>00150LS</div>
          <div>Дата изготовления: <span style={{ fontWeight: 400  }}>27.12.2023 14:06</span></div>
        </div>
        <div>
          <div>01203 "Milliy kliring markazi" AJ </div>
          <div>Лицевой счет</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 128 }}>
            <div>21596000800447893003</div>
            <div>27.12.2023</div>
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
            <div>ВХ. ОСТАТОК ПАССИВ</div>
            <div>1 000 000,00</div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 24 }}>
        <Table
          columns={columns}
          dataSource={[]}
        />
      </div>
    </div>
  );
};

export default AccountReport;
