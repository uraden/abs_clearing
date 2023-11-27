import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import { useAccountList } from "../../pages/accountList/request";

interface IAccountList {
  isLoading: boolean;
  columns: {
    render?: Function;
    title: string;
    dataIndex?: string;
    key?: string;
  }[];
  dataSource: any;
}

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
