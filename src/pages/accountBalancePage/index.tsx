import React, { useEffect } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { getAccountReport } from "./request";

export default function AccountBalancePage() {
  interface DataType {
    key: string;
    account: string;
    remainder: string;
    debit: string;
    credit: string;
    end: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Филиал",
      dataIndex: "account",
      align: "center",
    },
    {
      title: "Лицевой счет",
      dataIndex: "account",
      align: "center",
    },
    // {
    //   title: "Валюта",
    //   dataIndex: "currency",
    //   align: "center",
    // },
    {
      title: "Входящий остаток",
      dataIndex: "remainder",
      align: "right",
    },
    {
      title: "Дебет",
      dataIndex: "debit",
      align: "right",
      render: (debet: string, { account }: DataType) => {
        return <Link to={`${account}/debet`}>{debet}</Link>;
      },
    },
    {
      title: "Кредит",
      dataIndex: "credit",
      align: "right",
      render: (credit: string, { account }: DataType) => {
        return <Link to={`${account}/credit`}>{credit}</Link>;
      },
    },
    // {
    //   title: "Оборот",
    //   children: [
    //     {
    //       title: "Дебет",
    //       dataIndex: "debit",
    //       align: "right",
    //       render: (debet: string, { account }: DataType) => {
    //         return <Link to={`${account}/debet`}>{debet}</Link>;
    //       },
    //     },
    //     {
    //       title: "Кредит",
    //       dataIndex: "credit",
    //       align: "right",
    //       render: (credit: string, { account }: DataType) => {
    //         return <Link to={`${account}/credit`}>{credit}</Link>;
    //       },
    //     },
    //   ],
    // },
    {
      title: "Исходящий остаток",
      dataIndex: "end",
      align: "right",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      account: "1610451354008825",
      remainder: "0.00",
      debit: "10,000",
      credit: "12,000",
      end: "2,000",
    },
    {
      key: "2",
      account: "2020153305612412",
      remainder: "3,814,622",
      debit: "10,000",
      credit: "12,000",
      end: "2,000",
    },
    {
      key: "3",
      account: "1006833431150330",
      remainder: "0.00",
      debit: "10,000",
      credit: "12,000",
      end: "2,000",
    },
    {
      key: "4",
      account: "2020158885612412",
      remainder: "0.00",
      debit: "10,000",
      credit: "12,000",
      end: "2,000",
    },
  ];

  const fetchReport = async () => {
    const response = await getAccountReport({
      clientId: 1,
    });

    console.log('ress: ', response);
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div>
      <div className="main-table-1-account">
        <div className="title">
          Мониторинг оборотов и остатков по Лицевым счетам отделений НКЦ на{" "}
          {dayjs().format("DD.MM.YYYY")}
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          style={{ width: "100%", marginBottom: 50 }}
        />
      </div>
    </div>
  );
}
