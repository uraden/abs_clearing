import { Table } from "antd";
import { useState } from "react";

const RevenueTable = () => {
  const [isLoading, setLoading] = useState(false);

  const columns = [
    {
      title: "№",
      dataIndex: "№",
    },
    {
      title: "Документ",
      children: [
        {
          title: "№",
          dataIndex: "№",
          align: "center",
        },
        {
          title: "Дата",
          dataIndex: "Дата",
          align: "center",
        },
      ],
    },
    {
      title: "Плательщик",
      children: [
        {
          title: "Филиал",
          dataIndex: "Филиал",
          align: "center",
        },
        {
          title: "Лицевой счет",
          dataIndex: "Дата",
          align: "center",
        },
        {
          title: "ИНН",
          dataIndex: "Дата",
          align: "center",
        },
      ],
    },
    {
      title: "Получатель",
      children: [
        {
          title: "Филиал",
          dataIndex: "Филиал",
          align: "center",
        },
        {
          title: "Лицевой счет",
          dataIndex: "Дата",
          align: "center",
        },
        {
          title: "ИНН",
          dataIndex: "Дата",
          align: "center",
        },
      ],
    },
    {
      title: "Сумма",
      dataIndex: "total_amount",
      align: "center",
      key: "total_amount",
      render: (amount: string) =>
        Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 }),
    },
    {
      title: "Назначение",
      dataIndex: "Назначение",
      key: "Назначение",
    },
    // { title: "Дата", dataIndex: "operDate", key: "operDate" },
    // {
    //   title: "Номер",
    //   dataIndex: "doc_no",
    //   key: "doc_no",
    //   // render: (dtd: string) => (dtd ? moment(dtd).format("DD.MM.YYYY") : null),
    // },
    // // {
    // //   title: "Опер. день",
    // //   dataIndex: "forderDay",
    // //   key: "forderDay",
    // //   render: (forderDay: string) =>
    // //     forderDay ? moment(forderDay).format("DD.MM.YYYY") : null,
    // // },
    // {
    //   title: "Тип Документа",
    //   dataIndex: "typeDoc",
    //   key: "typeDoc",
    // },
    // {
    //   title: "Информация",
    //   dataIndex: "Информация",
    //   key: "Информация",
    // },
    // {
    //   title: "Сумма",
    //   dataIndex: "total_amount",
    //   key: "total_amount",
    //   render: (amount: string) =>
    //     Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 }),
    // },
    // {
    //   title: "Валюта",
    //   dataIndex: "currency",
    //   key: "currency",
    // },
    // {
    //   title: "Вид Операции",
    //   dataIndex: "Вид Операции",
    //   key: "Вид Операции",
    // },
    // {
    //   title: "Контрагент",
    //   dataIndex: "counter-agent",
    //   key: "counter-agent",
    // },
  ];

  return (
    <Table
      loading={isLoading}
      dataSource={[]}
      columns={columns}
      bordered
      style={{ marginTop: 40 }}
    />
  );
};

export default RevenueTable;
