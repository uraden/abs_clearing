import React from "react";
import { Table, Divider } from "antd";
import { useLocation } from "react-router-dom";
import moment from "moment";
// import { useAccountList } from "../../pages/accountList/request";

const CustomTable: React.FC = ({
  isLoading,
  columns,
  dataSource,
  titleOfThePage,
  datePicked,
}: any) => {
  const location = useLocation();

  return (
    <>
      <div className="title">
        {titleOfThePage}
      </div>

      <div className="todays_date">
        {" "}
        Операционный день
        <span style={{ fontWeight: 700 }}>
          {location.pathname === "/account-list" ||
          location.pathname === "/draft-form"
            ? ` - ${moment().format("DD.MM.YYYY")} `
            : ` - ${datePicked}`}
        </span>
      </div>
      <Divider />
      <Table
        loading={isLoading}
        dataSource={dataSource}
        columns={columns}
        bordered
        style={{ marginTop: 40 }}
      />
    </>
  );
};

export default CustomTable;
