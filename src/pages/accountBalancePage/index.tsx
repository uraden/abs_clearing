import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGlobalDate } from "../../reduxStore/features/globalDateSlice";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { getAccountReport } from "./request";
import { formatNumberWithCommas } from "../../assets/reusable/functions";

export default function AccountBalancePage() {
  const [responseData, setResponseData] = useState<DataType[]>();
  const [isLoading, setLoading] = useState(false);
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
      title: "МФО банка",
      dataIndex: "branchMFO",
      align: "center",
    },
    {
      title: "Лицевой счет",
      dataIndex: "account",
      align: "center",
      width: '12%',
      render: (account: string) => <span style={{ whiteSpace: 'nowrap' }}>{account}</span>
    },
    // {
    //   title: "Валюта",
    //   dataIndex: "currency",
    //   align: "center",
    // },
    {
      title: "Входящий остаток",
      dataIndex: "beginAmount",
      align: "center",
      render: (amount) => ({
        children: (
          <div style={{ textAlign: "right" }}>
            {formatNumberWithCommas(amount)}
          </div>
        ),
      }),
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
          align: "center",
          render: (debet: string, { account }: DataType) => {
            return {
              children: (
                <Link style={{ textAlign: "right" }} to={`${account}/debet`}>
                  {formatNumberWithCommas(debet)}
                </Link>
              ),
              props: {
                style: { textAlign: "right" },
              },
            };
          },
        },
        {
          title: "Кредит",
          dataIndex: "credit",
          align: "center",
          render: (credit: string, { account }: DataType) => {
            return {
              children: (
                <Link style={{ textAlign: "right" }} to={`${account}/credit`}>
                  {formatNumberWithCommas(credit)}
                </Link>
              ),
              props: {
                style: { textAlign: "right" },
              },
            };
          },
        },
      ],
    },
    {
      title: "Исходящий остаток",
      dataIndex: "endAmount",
      align: "center",
      render: (amount) => ({
        children: (
          <div style={{ textAlign: "right" }}>
            {formatNumberWithCommas(amount)}
          </div>
        ),
      }),
    },
  ];

  const dispatch = useDispatch();
  // @ts-expect-error try
  const { globalDate } = useSelector((state: unknown) => state.globalDate);

  const fetchReport = async () => {
    setLoading(true);
    const response = await getAccountReport({
      fromDate: dayjs(globalDate.date).format("YYYY-MM-DD"),
      toDate: dayjs(globalDate.date).format("YYYY-MM-DD"),
    });

    setResponseData(response);
    setLoading(false);
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
        <div className="title">Остатки и обороты счетов</div>
        <Table
          columns={columns}
          dataSource={mappedData}
          pagination={false}
          bordered
          loading={isLoading}
          style={{ width: "100%", marginBottom: 50 }}
        />
      </div>
    </div>
  );
}
