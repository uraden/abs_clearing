import { useState, useEffect } from "react";
// import AccountList from "../../components/simpleTable";
import { Button, Space, Tag } from "antd";
import { Link } from "react-router-dom";
import { getAccountArchiveList } from "../accountListArchive/request";
import CustomTable from "../../components/Reusables/Table";
import moment from "moment";
import { status } from "../../assets/defaultData";
import _ from "lodash";
import { fetchOperDay } from "../../assets/reusable/functions";
import dayjs from "dayjs";

const AccoutDocs = () => {
  const [isLoading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    { title: "№ Док.", dataIndex: "documentNumber", key: "documentNumber", align: "center" },
    {
      title: "Дата Док.",
      dataIndex: "createdDate",
      key: "createdDate",
      align: "center",
      render: (createdDate: string) =>
        createdDate ? moment(createdDate).format("DD.MM.YYYY") : null,
    },
    {
      title: "Плательщик",
      children: [
        { title: "МФО", dataIndex: "debitMFO", key: "debitMFO", align: "center" },
        { title: "Счет", dataIndex: "debitAccount", key: "debitAccount", align: "center" },
        { title: "ИНН", dataIndex: "debitINN", key: "debitINN", align: "center" },
        { title: "Наименование", dataIndex: "debitName", key: "debitName", align: "center" },
        // { title: "ИНН", dataIndex: "creditINN", key: "creditINN" },
      ],
    },
    {
      title: "Получатель",
      children: [
        { title: "МФО", dataIndex: "creditMFO", key: "creditMFO", align: "center" },
        { title: "Счет", dataIndex: "creditAccount", key: "creditAccount", align: "center" },
        { title: "ИНН", dataIndex: "creditINN", key: "creditINN", align: "center" },
        { title: "Наименование", dataIndex: "creditName", key: "creditName", align: "center" },
      ],
    },
    {
      title: "Сумма",
      dataIndex: "total_amount",
      key: "total_amount",
      align: "center",
      render: (amount: string) => ({
        children: (
          <div style={{ textAlign: 'right' }}>
            {Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        ),
      }),
    },
    {
      title: "Статус",
      dataIndex: "statusName",
      key: "statusName",
      render: (statusText: string) => {
        if (statusText) {
          let tempStatus = _.find(status, { statusTitle: statusText });
          console.log("temppp: ", tempStatus);
          return (
            <Tag color={tempStatus?.statusColor}>{tempStatus?.statusTitle}</Tag>
          );
        }
      },
    },
    {
      title: "Действие",
      key: "action",
      //@ts-ignore
      render: (_, record) => (
        <Space size="middle">
          <Link
            to={`/edit/${record.key}/doc`}
          >
          {/* <Link
            to={`/edit/${encodeURIComponent(
              record.key + localStorage.getItem("accessToken")
            )}/doc`}
          > */}
            <Button>Изменить</Button>
          </Link>
        </Space>
      ),
    },
  ];

  const fetchOperdays = async () => {
    const response = await fetchOperDay();
    // setOperday(response);

    await getList(response.date);
  }


  const getList = async (operday: string) => {
    setLoading(true);
    // @ts-ignore
    const response = await getAccountArchiveList({
      // clientId: 2,
      operday: dayjs(operday).format("YYYY-MM-DD"),
    });
    console.log("response: ", response);
    setDataSource(
      response.map(
        (item: {
          id: string;
          documentNumber: string;
          creditMFO: string;
          // crPnfl: string;
          creditAccount: string;
          creditName: string;
          creditINN: string;
          debitMFO: string;
          // debPnfl: string;
          debitName: string;
          debitAccount: string;
          debitINN: string;
          sum: string;
          createdDate: string;
          debName: string;
          forderDay: string;
          statusName: string;
        }) => ({
          key: item.id,
          documentNumber: item.documentNumber,
          creditMFO: item.creditMFO,
          creditAccount: item.creditAccount,
          creditName: item.creditName,
          creditINN: item.creditINN,
          debitMFO: item.debitMFO,
          debitAccount: item.debitAccount,
          debitName: item.debitName,
          // debitAccount: item.debPnfl,
          debitINN: item.debitINN,
          total_amount: item.sum,
          createdDate: item.createdDate,
          forderDay: item.forderDay,
          statusName: item.statusName,
        })
      )
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchOperdays();
  }, []);

  return (
    <CustomTable
      // @ts-ignore
      isLoading={isLoading}
      columns={columns}
      dataSource={dataSource}
      titleOfThePage="Список документов"
    />
  );
};

export default AccoutDocs;
