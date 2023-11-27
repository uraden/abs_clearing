import { useEffect, useState } from "react";
import { Button, Space } from "antd";
import { getAccountArchiveList } from "./request";
import CustomTable from "../../components/Reusables/Table";
import { Link } from "react-router-dom";

const AccountListArchive = () => {
  const [isLoading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

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
      //@ts-ignore
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/edit/${record.key}/doc`}>
            <Button>Изменить</Button>
          </Link>
        </Space>
      ),
    },
  ];

  const getList = async () => {
    setLoading(true);
    const response = await getAccountArchiveList();
    console.log("response: ", response);
    setDataSource(
      response.map(
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
      )
    );
    setLoading(false);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <CustomTable
      // @ts-ignore
      isLoading={isLoading}
      columns={columns}
      dataSource={dataSource}
    />
  );
};

export default AccountListArchive;
