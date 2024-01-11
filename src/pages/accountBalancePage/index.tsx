import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGlobalDate } from "../../reduxStore/features/globalDateSlice";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { getAccountReport } from "./request";

export default function AccountBalancePage() {
  const [responseData, setResponseData] = useState<DataType[]>();

  interface DataType {
    key: string;
    account: string;
    remainder: string;
    debit: string;
    credit: string;
    end: string;
    branchMFO: string;
    endAmount: number;
    beginAmount: number;
  }

  //@ts-expect-errortry
  const mappedData: DataType[] | undefined = responseData
    ? responseData.map((item) => ({
        key: item.key,
        account: item.account,
        branchMFO: item.branchMFO,
        beginAmount: item.beginAmount,
        endAmount: item.endAmount,
        debit: item.debit,
        credit: item.credit,
      }))
    : undefined;

  const columns: ColumnsType<DataType> = [
    {
      title: "Филиал",
      dataIndex: "branchMFO",
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
      dataIndex: "beginAmount",
      align: "right",
    },
    // {
    //   title: "Дебет",
    //   dataIndex: "debit",
    //   align: "right",
    //   render: (debet: string, { account }: DataType) => {
    //     return <Link to={`${account}/debet`}>{debet}</Link>;
    //   },
    // },
    // {
    //   title: "Кредит",
    //   dataIndex: "credit",
    //   align: "right",
    //   render: (credit: string, { account }: DataType) => {
    //     return <Link to={`${account}/credit`}>{credit}</Link>;
    //   },
    // },
    {
      title: "Оборот",
      children: [
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
      ],
    },
    {
      title: "Исходящий остаток",
      dataIndex: "endAmount",
      align: "right",
    },
  ];

  const dispatch = useDispatch();
  // @ts-expect-error try
  const { globalDate } = useSelector((state: unknown) => state.globalDate);
  console.log("gl: ", dayjs(globalDate.date).format("YYYY-MM-DD"));
  const fetchReport = async () => {
    const response = await getAccountReport({
      fromDate: dayjs(globalDate.date).format("YYYY-MM-DD"),
      toDate: dayjs(globalDate.date).format("YYYY-MM-DD"),
    });

    setResponseData(response);
    console.log("ress: ", response);
  };

  useEffect(() => {
    fetchReport();
  }, [globalDate.date]);

  useEffect(() => {
    // @ts-expect-error try
    dispatch(fetchGlobalDate());
  }, []);

  // const mappedData: DataType[] | undefined = responseData

  return (
    <div>
      <div className="main-table-1-account">
        <div className="title">
          Мониторинг оборотов и остатков по Лицевым счетам отделений НКЦ на{" "}
          {dayjs(globalDate.date).format("DD.MM.YYYY")}
        </div>
        <Table
          columns={columns}
          dataSource={mappedData}
          pagination={false}
          bordered
          style={{ width: "100%", marginBottom: 50 }}
        />
      </div>
    </div>
  );
}
