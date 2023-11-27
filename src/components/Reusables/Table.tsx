import React from "react";
import { Table } from "antd";
// import { useAccountList } from "../../pages/accountList/request";

const CustomTable: React.FC = ({ isLoading, columns, dataSource }: any) => {
  console.log('coll: ', columns)
  return (
    <>
      <h3 style={{ textAlign: "center", marginBottom: 16 }}>
        Список Документов
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
