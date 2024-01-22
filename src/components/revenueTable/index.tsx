import { Table, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleDebit, getSingleCredit } from "./request";
import { formatNumberWithCommas } from "../../assets/reusable/functions";

const RevenueTable = () => {
  const [isLoading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const accountnumber = useParams();

  const columns = [
    {
      title: "№",
      dataIndex: "id",
      align: "center",
      width: '4%'
      // fixed: "left",
    },
    // {
    //   title: "Документ",

    //   children: [
    //     {
    //       title: "№",
    //       dataIndex: "documentNumber",
    //       align: "center",
    //       fixed: "left",
    //     },
    //     {
    //       title: "Дата",
    //       dataIndex: "documentDate",
    //       align: "center",
    //       fixed: "left",
    //     },
    //   ],
    // },
    {
      title: "Плательщик",
      children: [
        {
          title: "МФО Банка",
          dataIndex: "debitMFO",
          align: "center",
          width: '8%'
        },
        {
          title: "Лицевой счет",
          dataIndex: "debitAccount",
          align: "center",
          width: "12%",
          render: (account: string, rest: any) => (
            <Tooltip title={rest.debitClient}>
              <span style={{ whiteSpace: "nowrap" }}>{account}</span>
            </Tooltip>
          ),
        },
      ],
    },
    {
      title: "Получатель",
      children: [
        {
          title: "МФО Банка",
          dataIndex: "creditMFO",
          align: "center",
          width: '8%'
        },
        {
          title: "Лицевой счет",
          dataIndex: "creditAccount",
          align: "center",
          width: "12%",
          render: (account: string, rest: any) => (
            <Tooltip title={rest.creditClient}>
              <span style={{ whiteSpace: "nowrap" }}>{account}</span>
            </Tooltip>
          ),
        },
      ],
    },
    {
      title: "Сумма",
      dataIndex: "amount",
      align: "center",
      width: "12%",
      key: "total_amount",
      render: (amount: string) => (
        <div style={{ textAlign: "right" }}>
          {formatNumberWithCommas(amount)}
        </div>
      ),
    },
    {
      title: "Назначение",
      dataIndex: "naznacheniya",
      key: "Назначение",
      width: "42%",
      align: "center",
      render: (text: string) => (
        <div style={{ textAlign: "left" }}>
          {text}
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      if (accountnumber.revenue === "debet") {
        const response = await getSingleDebit({
          account: accountnumber.account,
        });
        setResponseData(response);
        setLoading(false);
      } else {
        const response = await getSingleCredit({
          account: accountnumber.account,
        });
        setResponseData(response);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Table
        loading={isLoading}
        dataSource={responseData || []}
        // @ts-expect-error ignore for npm run build
        columns={columns}
        bordered
        style={{ marginTop: 40 }}
        pagination={false}
        scroll={{ x: 1500 }}
      />
    </>
  );
};

export default RevenueTable;
