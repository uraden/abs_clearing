import { useState, useEffect } from "react";
// import AccountList from "../../components/simpleTable";
import { Button, Space, Tag } from "antd";
import { Link } from "react-router-dom";
import { getAccountArchiveList } from "../accountListArchive/request";
import CustomTable from "../../components/Reusables/Table";
import moment from "moment";
import { status } from "../../assets/defaultData";
import _ from "lodash";

const AccoutDocs = () => {
  const [isLoading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    { title: "№ Док.", dataIndex: "nDoc", key: "nDoc" },
    {
      title: "Дата Док.",
      dataIndex: "dtd",
      key: "dtd",
      render: (dtd: string) => (dtd ? moment(dtd).format("DD.MM.YYYY") : null),
    },
    {
      title: "Опер. день",
      dataIndex: "forderDay",
      key: "forderDay",
      render: (forderDay: string) =>
        forderDay ? moment(forderDay).format("DD.MM.YYYY") : null,
    },
    {
      title: "Получатель",
      children: [
        { title: "МФО", dataIndex: "mfo_1", key: "mfo_1" },
        { title: "Счет", dataIndex: "account_1", key: "account_1" },
        { title: "ИНН", dataIndex: "inn_1", key: "inn_1" },
        { title: "Наименование", dataIndex: "name_1", key: "name_1" },
      ],
    },
    {
      title: "Плательщик",
      children: [
        { title: "МФО", dataIndex: "mfo_2", key: "mfo_2" },
        { title: "Счет", dataIndex: "account_2", key: "account_2" },
        // { title: "ИНН", dataIndex: "inn_1", key: "inn_1" },
      ],
    },
    {
      title: "Сумма",
      dataIndex: "total_amount",
      key: "total_amount",
      render: (amount: string) =>
        Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 }),
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (statusText: string) => {
        if (statusText) {
          let tempStatus = _.find(status, { statusTitle: statusText });
          console.log('temppp: ', tempStatus);
          return <Tag color={tempStatus?.statusColor}>{tempStatus?.statusTitle}</Tag>
        }
      },
    },
    {
      title: "Действие",
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
          crName: string;
          crInn: string;
          debMfo: string;
          debPnfl: string;
          // debInn: string;
          sum: string;
          dtd: string;
          forderDay: string;
          status: string;
        }) => ({
          key: item.id,
          nDoc: item.ndoc,
          mfo_1: item.crMfo,
          account_1: item.crPnfl,
          name_1: item.crName,
          inn_1: item.crInn,
          mfo_2: item.debMfo,
          account_2: item.debPnfl,
          // inn_2: item.debInn,
          total_amount: item.sum,
          dtd: item.dtd,
          forderDay: item.forderDay,
          status: item.status,
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

export default AccoutDocs;
