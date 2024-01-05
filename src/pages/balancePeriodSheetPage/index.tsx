import { useState, useEffect } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import {  } from "react-router-dom";
// import dayjs from "dayjs";
import { DatePicker } from "antd";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";

export default function BalancePeriodSheetPage() {
  const [setResponseData] = useState<DataType[]>();

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
      dataIndex: "branchMFO",
      align: "center",
    },
    {
      title: "Лицевой счет",
      dataIndex: "account",
      align: "center",
    },
    {
      title: "Входящий остаток",
      dataIndex: "beginAmount",
      align: "right",
    },
    {
      title: "Оборот",
      children: [
        {
          title: "Дебет",
          dataIndex: "debit",
          align: "right",
        //   render: (debet: string, { account }: DataType) => {
        //     return <Link to={`${account}/debet`}>{debet}</Link>;
        //   },
        },
        {
          title: "Кредит",
          dataIndex: "credit",
          align: "right",
        //   render: (credit: string, { account }: DataType) => {
        //     return <Link to={`${account}/credit`}>{credit}</Link>;
        //   },
        },
      ],
    },
    {
      title: "Исходящий остаток",
      dataIndex: "endAmount",
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

    //@ts-expect-errortry
    const response = await getAccountReport();

    //@ts-expect-errortry try
    setResponseData(response);
    console.log("ress: ", response);
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const { RangePicker } = DatePicker;

  const onChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: new date ", dateString);
  };

  const onOk = (
    value: DatePickerProps["value"] | RangePickerProps["value"]
  ) => {
    console.log("onOk: ", value);
  };

  return (
    <div>
      <div className="main-table-1-account">
        <div className="title">Сальдо-оборотная ведомость за период</div>
        <div
          className="date-blance-sheet"
          style={{
            textAlign: "left",
            width: "100%",
            marginLeft: 40,
            marginBottom: 10,
            fontSize: 15,
          }}
        >
            Выберите период:{" "}
          <RangePicker
            format="YYYY-MM-DD"
            onChange={onChange}
            onOk={onOk}
          />
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
