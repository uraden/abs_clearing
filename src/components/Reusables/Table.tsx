import React from "react";
import { Table } from "antd";
import { useLocation } from "react-router-dom";
import moment from "moment";
// import { useAccountList } from "../../pages/accountList/request";

const CustomTable: React.FC = ({ isLoading, columns, dataSource }: any) => {
  const location = useLocation();

  return (
    <>
      <h3 style={{ textAlign: "center", marginBottom: 16 }}>
        Список Документов{" "}
        <span style={{ fontStyle: "italic", textDecoration: "underline" }}>
          {" "}
          {location.pathname === "/account-list"
            ? `- ${moment().format("DD.MM.YYYY")}`
            : null}
        </span>
      </h3>

      <Table
        loading={isLoading}
        dataSource={dataSource}
        columns={columns}
        bordered
      />
    </>
  );
};

export default CustomTable;
