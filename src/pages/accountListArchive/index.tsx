import { useState } from "react";
import { useSelector } from "react-redux";
// import { fetchGlobalDate } from "../../reduxStore/features/globalDateSlice";
import { DatePicker, Table, Space, Button } from "antd";
import { getAccountArchiveList } from "./request";
import type { DatePickerProps } from "antd";
import moment from "moment";
// import { status } from "../../assets/defaultData";
import _ from "lodash";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const { RangePicker } = DatePicker;

const AccountListArchive = () => {
  const [isLoading, setLoading] = useState(false);
  // @ts-expect-error try
  const { globalDate } = useSelector((state: unknown) => state.globalDate);
  const [dataSource, setDataSource] = useState([]);

  // @ts-expect-error try
  const formatNumberWithCommas = (amount, minimumFractionDigits = 2) => {
    const parts = Number(amount)
      .toFixed(minimumFractionDigits)
      .toString()
      .split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const columns = [
    {
      title: "№ Док.",
      dataIndex: "documentNumber",
      key: "documentNumber",
      align: "center",
      // fixed: "left"
    },
    {
      title: "Дата Док.",
      dataIndex: "operDay",
      key: "operDay",
      align: "center",
      // fixed: "left",
      render: (operDay: string) =>
        operDay ? moment(operDay).format("DD.MM.YYYY") : null,
    },
    // {
    //   title: "Опер. день",
    //   dataIndex: "forderDay",
    //   key: "forderDay",
    //   render: (forderDay: string) =>
    //     forderDay ? moment(forderDay).format("DD.MM.YYYY") : null,
    // },
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
          width: "12%",
          render: (amount: string) => ({
            children: <div style={{ whiteSpace: "nowrap" }}>{amount}</div>,
          }),
        },
        // { title: "ИНН", dataIndex: "debitINN", key: "debitINN", align: "center" },
        // {
        //   title: "Наименование",
        //   dataIndex: "debitName",
        //   key: "debitName",
        //   align: "center",
        // },
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
          width: "12%",
          render: (amount: string) => ({
            children: <div style={{ whiteSpace: "nowrap" }}>{amount}</div>,
          }),
        },
        // {
        //   title: "ИНН",
        //   dataIndex: "creditINN",
        //   key: "creditINN",
        //   align: "center",
        // },
        // {
        //   title: "Наименование",
        //   dataIndex: "creditName",
        //   key: "creditName",
        //   align: "center",
        // },
      ],
    },
    {
      title: "Сумма",
      dataIndex: "total_amount",
      key: "total_amount",
      align: "center",
      // fixed: "right",
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
      align: "center",
      // fixed: "right"
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
      align: "center",
      //@ts-expect-error try
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/archive/${record.key}/doc`}>
            <Button>Посмотреть</Button>
          </Link>
        </Space>
      ),
    },
  ];

  const getList = async (dates: unknown) => {
    setLoading(true);
    // @ts-expect-error try
    const response = await getAccountArchiveList(dates);
    // console.log("response: ", response);
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

  const onChange: DatePickerProps["onChange"] = (dateString) => {
    console.log('date: ', dateString);
    // @ts-ignore
    if (dateString && dateString.length) {
      // const tempDate = dayjs(dateString);
      // setDatePckedM(tempDate.format("DD.MM.YYYY"));
      return getList({
        //@ts-ignore
        fromDate: dayjs(dateString[0]).format("YYYY-MM-DD"),
        //@ts-ignore
        toDate: dayjs(dateString[1]).format("YYYY-MM-DD"),
      });
      // setChosenDate(tempDate);
    }
    return setDataSource([]);
  };

  return (
    <>
      <div className="title">Архив документов</div>
      <div className="todays_date">
        Дата:{" "}
        <div>
          <RangePicker
            // @ts-ignore
            onChange={onChange}
            format="DD.MM.YYYY"
          />
        </div>
      </div>
      <Table
        loading={isLoading}
        dataSource={dataSource}
        // @ts-expect-error try
        columns={columns}
        bordered
        style={{ marginTop: 40 }}
        scroll={{ x: 1500 }}
      />
    </>
  );
};

export default AccountListArchive;
