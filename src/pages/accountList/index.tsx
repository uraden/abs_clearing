import { useState, useEffect } from "react";
// import AccountList from "../../components/simpleTable";
import { Button, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { getAccountArchiveList } from "../accountListArchive/request";
import moment from "moment";
// import { status } from "../../assets/defaultData";
import _ from "lodash";
import { fetchOperDay } from "../../assets/reusable/functions";
import dayjs from "dayjs";

const AccoutDocs = () => {
  const [isLoading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  // @ts-ignore
  const  formatNumberWithCommas = (amount, minimumFractionDigits = 2) => {
    const parts = Number(amount).toFixed(minimumFractionDigits).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}
  const columns = [
    {
      title: "№ Док.",
      dataIndex: "documentNumber",
      key: "documentNumber",
      align: "center",
    },
    {
      title: "Дата Док.",
      dataIndex: "operDay",
      key: "operDay",
      align: "center",
      render: (operDay: string) =>
        operDay ? moment(operDay).format("DD.MM.YYYY") : null,
    },
    {
      title: "Плательщик",
      children: [
        {
          title: "МФО банка",
          dataIndex: "debitMFO",
          key: "debitMFO",
          align: "center",
        },
        {
          title: "Лицевой счет",
          dataIndex: "debitAccount",
          key: "debitAccount",
          align: "center",
        },
        {
          title: "ИНН",
          dataIndex: "debitINN",
          key: "debitINN",
          align: "center",
        },
        {
          title: "Наименование",
          dataIndex: "debitName",
          key: "debitName",
          align: "center",
        },
        // { title: "ИНН", dataIndex: "creditINN", key: "creditINN" },
      ],
    },
    {
      title: "Получатель",
      children: [
        {
          title: "МФО банка",
          dataIndex: "creditMFO",
          key: "creditMFO",
          align: "center",
        },
        {
          title: "Лицевой счет",
          dataIndex: "creditAccount",
          key: "creditAccount",
          align: "center",
        },
        {
          title: "ИНН",
          dataIndex: "creditINN",
          key: "creditINN",
          align: "center",
        },
        {
          title: "Наименование",
          dataIndex: "creditName",
          key: "creditName",
          align: "center",
        },
      ],
    },
    {
      title: "Сумма",
      dataIndex: "total_amount",
      key: "total_amount",
      align: "center",
      render: (amount: string) => ({
        children: (
          <div style={{ textAlign: "right" }}>
            {formatNumberWithCommas(amount)}
          </div>
        ),
      }),
    },
    {
      title: "Статус",
      dataIndex: "statusName",
      key: "statusName",
      align: "center"
      // render: (statusText: string) => {
      //   if (statusText) {
      //     let tempStatus = _.find(status, { statusTitle: statusText });
      //     console.log("temppp: ", tempStatus);
      //     return (
      //       <Tag color={tempStatus?.statusColor}>{tempStatus?.statusTitle}</Tag>
      //     );
      //   }
      // },
    },
    {
      title: "Действие",
      key: "action",
      //@ts-ignore
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/edit/${record.key}/doc`}>
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
  };

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
          operDay: string;
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
          operDay: item.operDay,
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
    <>
      <div className="title">Список документов</div>
      <Table
        loading={isLoading}
        dataSource={dataSource}
        //@ts-ignore
        columns={columns}
        bordered
        style={{ marginTop: 40 }}
      />
    </>
  );
};

export default AccoutDocs;
