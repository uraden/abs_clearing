import { Table } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleDebit, getSingleCredit } from './request'

const RevenueTable = () => {
  const [isLoading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState()
  const accountnumber = useParams();

  const columns = [
    {
      title: "№",
      dataIndex: "id",
    },
    {
      title: "Документ",
      children: [
        {
          title: "№",
          dataIndex: "documentNumber",
          align: "center",
        },
        {
          title: "Дата",
          dataIndex: "documentDate",
          align: "center",
        },
      ],
    },
    {
      title: "Плательщик",
      children: [
        {
          title: "Филиал",
          dataIndex: "debitClient",
          align: "center",
        },
        {
          title: "Лицевой счет",
          dataIndex: "debitAccount",
          align: "center",
        },
        {
          title: "ИНН",
          dataIndex: "debitINN",
          align: "center",
        },
      ],
    },
    {
      title: "Получатель",
      children: [
        {
          title: "Филиал",
          dataIndex: "creditClient",
          align: "center",
        },
        {
          title: "Лицевой счет",
          dataIndex: "creditAccount",
          align: "center",
        },
        {
          title: "ИНН",
          dataIndex: "creditINN",
          align: "center",
        },
      ],
    },
    {
      title: "Сумма",
      dataIndex: "amount",
      align: "center",
      key: "total_amount",
      render: (amount: string) =>
        Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 }),
    },
    {
      title: "Назначение",
      dataIndex: "naznacheniya",
      key: "Назначение",
    },
 
  ];


  accountnumber.account === "debit"

  // const myQueryParams = {account: accountnumber.account}
  const myQueryParamsDebet = {account: '20208000100001203001'}  
  const myQueryParamsCredit = {account: '20208000900000001001'}

  useEffect(() => {
    const fetchData = async () => {
      try {
         if(accountnumber.account === "debit") {
          const response = await getSingleDebit(myQueryParamsDebet);
          setResponseData(response);
         } else {
          const response = await getSingleCredit(myQueryParamsCredit);
          setResponseData(response);
         }

       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  },[]);

  console.log('this is data', responseData)

  
  return (

    <>
    <Table
      loading={isLoading}
      dataSource={responseData || []}
      columns={columns}
      bordered
      style={{ marginTop: 40 }}
      pagination={false}
    />
    </>
  );
};

export default RevenueTable;
