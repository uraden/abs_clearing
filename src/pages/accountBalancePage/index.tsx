import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

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
          title: "Счет",
          dataIndex: "account",
          align: "center"
        },
        {
          title: "Валюта",
          dataIndex: "currency",
          align: "center"
        },
        {
          title: "Входящий остаток",
          dataIndex: "remainder",
          align: "right"
        },
        {
          title: "Оборот",
          children: [
            {
              title: "Дебет",
              dataIndex: "debit",
              align: "right"
            },
            {
              title: "Кредит",
              dataIndex: "credit",
              align: "right"
            },
          ]
        },
        {
          title: "Исходящий остаток",
          dataIndex: "end",
          align: "right"
        },
      ];

      const data: DataType[] = [
        {
          key: "1",
          account: "1610451354008825",
          remainder: "0.00",
          debit: "10,000",
          credit: "12,000", 
          end: "2,000"
        },
        {
          key: "2",
          account: "2020153305612412",
          remainder: "3,814,622",
          debit: "10,000",
          credit: "12,000", 
          end: "2,000"
        },
        {
          key: "3",
          account: "1006833431150330",
          remainder: "0.00",
          debit: "10,000",
          credit: "12,000", 
          end: "2,000"
        },
        {
          key: "4",
          account: "2020158885612412",
          remainder: "0.00",
          debit: "10,000",
          credit: "12,000", 
          end: "2,000"
        },
      ];

  return (
    <div>

      <div className="main-table-1-account">
        <h1 style={{marginBottom: 30}}> Остатки и обороты счетов</h1>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          
          style={{ width: 800, marginBottom: 50 }}
        />
      </div>

      
    </div>
  );
}
