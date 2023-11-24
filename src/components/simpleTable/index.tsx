import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";

import _ from "lodash";

import { useAccountList } from "../../pages/accountList/request";

const AccountList: React.FC = () => {


  const [isLoading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const navigate = useNavigate();

  const { getAccountList } = useAccountList();

  const getList = async () => {
    setLoading(true);
    const response = await getAccountList();
    try {
      // Assuming the data is an array inside response.data, map it with an incremental id
      // const mappedData = response?.data.map(
      //   (item: {
      //     id: string;
      //     crBankName: string;
      //     crInn: string;
      //     debBankName: string;
      //     naznCode: string;
      //   }) => ({
      //     key: item.id,
      //     name: item.crBankName,
      //     currency: item.crInn,
      //     bankName: item.debBankName,
      //     remainder: item.naznCode,
      //     action: ["Изменить", "Утвердить", "Удалить"],
      //   })
      // );
      // @ts-ignore
      setTableData(response.data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  interface DataType {
    key: React.Key;
    nDoc: string;
    mfo_1: string;
    account_1: string;
    mfo_2: string;
    accunt_2: string;
    total_amount: string;
    status: string;
  }

  const transTabbleData = tableData.map((item: {id: string, ndoc: string, crMfo: string, crPnfl: string, debMfo: string, debPnfl:string, sum:string }) => ({
    key: item.id,
    nDoc: item.ndoc,
    mfo_1: item.crMfo, 
    account_1: item.crPnfl, 
    mfo_2: item.debMfo, 
    account_2: item.debPnfl, 
    total_amount: item.sum, 
  }));

  const columns: ColumnsType<DataType>  = [
    { title: "№ Док.", dataIndex: "nDoc", key: "nDoc" },
    {
      title: "Платильшик",
      children: [
        { title: "МФО", dataIndex: "mfo_1", key: "mfo_1" },
        { title: "Счет", dataIndex: "account_1", key: "account_1" },
      ],
    },
    {
      title: "Получатель",
      children: [
        { title: "МФО", dataIndex: "mfo_2", key: "mfo_2" },
        { title: "Счет", dataIndex: "account_2", key: "account_2" },
      ],
    },
    { title: "Сумма", dataIndex: "total_amount", key: "total_amount" },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button>Изменить</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h3 style={{ textAlign: "center", marginBottom: 16 }}>
        Список Документов
      </h3>


    <Table dataSource={transTabbleData} columns={columns} bordered />
    </>
  );
};

export default AccountList;
