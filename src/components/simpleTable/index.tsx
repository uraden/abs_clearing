import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";

import { useAccountList } from "../../pages/accountList/request";
import { Link } from "react-router-dom";

const AccountList: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  // const navigate = useNavigate();

  const { getAccountList } = useAccountList();

  const getList = async () => {
    setLoading(true);
    const response = await getAccountList();
    try {
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

  const transTabbleData = tableData.map(
    (item: {
      id: string;
      ndoc: string;
      crMfo: string;
      crPnfl: string;
      debMfo: string;
      debPnfl: string;
      sum: string;
    }) => ({
      key: item.id,
      nDoc: item.ndoc,
      mfo_1: item.crMfo,
      account_1: item.crPnfl,
      mfo_2: item.debMfo,
      account_2: item.debPnfl,
      total_amount: item.sum,
    })
  );

  const columns = [
    { title: "№ Док.", dataIndex: "nDoc", key: "nDoc" },
    {
      title: "Плательщик",
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
      // @ts-ignore
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/${record.key}/new-doc`}>
            <Button>Изменить</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h3 style={{ textAlign: "center", marginBottom: 16 }}>
        Список Документов
      </h3>

      <Table
        loading={isLoading}
        dataSource={transTabbleData}
        columns={columns}
        bordered
      />
    </>
  );
};

export default AccountList;
