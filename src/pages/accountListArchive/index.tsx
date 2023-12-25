import { useEffect, useState } from "react";
import { Button, Space, DatePicker, Tag, Table } from "antd";
import { getAccountArchiveList } from "./request";
import CustomTable from "../../components/Reusables/Table";
import { Link } from "react-router-dom";
import type { DatePickerProps } from "antd";
import moment, { MomentInput } from "moment";
import { status } from "../../assets/defaultData";
import _ from "lodash";
import dayjs from "dayjs";

// interface YourRecordType {
//   key: string;
// }

const AccountListArchive = () => {
  const [isLoading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [datePickedM, setDatePckedM] = useState(dayjs().format("DD.MM.YYYY"));

  const columns = [
    { title: "№ Док.", dataIndex: "documentNumber", key: "documentNumber" },
    {
      title: "Дата Док.",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (createdDate: string) =>
        createdDate ? moment(createdDate).format("DD.MM.YYYY") : null,
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
        { title: "МФО", dataIndex: "debitMFO", key: "debitMFO" },
        { title: "Счет", dataIndex: "debitAccount", key: "debitAccount" },
        { title: "ИНН", dataIndex: "debitINN", key: "debitINN" },
        { title: "Наименование", dataIndex: "debitName", key: "debitName" },
        // { title: "ИНН", dataIndex: "creditINN", key: "creditINN" },
      ],
    },
    {
      title: "Получатель",
      children: [
        { title: "МФО", dataIndex: "creditMFO", key: "creditMFO" },
        { title: "Счет", dataIndex: "creditAccount", key: "creditAccount" },
        { title: "ИНН", dataIndex: "creditINN", key: "creditINN" },
        { title: "Наименование", dataIndex: "creditName", key: "creditName" },
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
    // {
    //   title: "Действие",
    //   key: "action",
    //   //@ts-ignore
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Link to={`/edit/${record.key}/doc`}>
    //         <Button>Изменить</Button>
    //       </Link>
    //     </Space>
    //   ),
    // },
  ];

  const getList = async (date: any) => {
    setLoading(true);
    // @ts-ignore
    const response = await getAccountArchiveList({
      clientId: 2,
      operday: dayjs(date).format("YYYY-MM-DD"),
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
    getList(moment().format("YYYY-MM-DD"));
  }, []);

  const onChange: DatePickerProps["onChange"] = (dateString) => {
    let tempDate = dayjs(dateString);
    setDatePckedM(tempDate.format("DD.MM.YYYY"));
    getList(tempDate);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "18%",
          justifyContent: "space-evenly",
        }}
      >
        <h3>Выберите дату:</h3>
        <DatePicker onChange={onChange} defaultValue={dayjs()} />
      </div>
      <div className="title">
        Архив документов
      </div>
      <div className="todays_date">
          {" "}
          Дата:{" "}
          <span style={{ fontWeight: 700 }}>{datePickedM}</span>
          {/* <span style={{ fontWeight: 700 }}>
          {location.pathname === "/account-list" ||
          location.pathname === "/draft-form"
            ? ` - ${moment().format("DD.MM.YYYY")} `
            : ` - ${datePicked}`}
        </span> */}
        </div>
      <Table
        loading={isLoading}
        dataSource={dataSource}
        columns={columns}
        bordered
        style={{ marginTop: 40 }}
      />
    </>
  );
};

export default AccountListArchive;
