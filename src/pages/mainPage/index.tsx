import { Layout, Table, Divider } from "antd";
import type { ColumnsType } from "antd/es/table";

const { Footer } = Layout;

const Main = () => {
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
      title: "Входящий остаток",
      dataIndex: "remainder",
    },
    {
      title: "Оборот",
      children: [
        {
          title: "Дебет",
          dataIndex: "debit",
        },
        {
          title: "Кредит",
          dataIndex: "credit",
        },
      ]
    },
    {
      title: "Исходящий остаток",
      dataIndex: "end",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      account: "1610451354008825",
      remainder: "0.00UZS",
      debit: "10,000",
      credit: "12,000", 
      end: "2,000"
    },
    {
      key: "2",
      account: "2020153305612412",
      remainder: "3,814,622UZS",
      debit: "10,000",
      credit: "12,000", 
      end: "2,000"
    },
    {
      key: "3",
      account: "1006833431150330",
      remainder: "0.00UZS",
      debit: "10,000",
      credit: "12,000", 
      end: "2,000"
    },
    {
      key: "4",
      account: "2020158885612412",
      remainder: "0UZS",
      debit: "10,000",
      credit: "12,000", 
      end: "2,000"
    },
  ];

  const columnPasswordExp = [
    {
      title: "Вид",
      dataIndex: "new_date",
    },
    {
      title: "Сумма",
      dataIndex: "left_date",
    },
  ];


  const dataPasswordExp = [
    {
      key: 1,
      new_date: '10.01.2024 13:57',
      left_date: 'Осталось 21 дней'
    },
    
  ]

  const columnPaymnetSchedule =[
    {
      dataIndex: "bank_type"
    },
    {
      dataIndex: "start_time"
    },
    {
      dataIndex: "end_time"
    }
  ]

  const dataPaymnetSchedule = [
    {
      key: 1,
      bank_type: "Межбанковские",
      start_time: "00:00",
      end_time: "23:55"
    },
    {
      key: 2,
      bank_type: "Внутребанковские",
      start_time: "00:00",
      end_time: "23:55"
    }
  ]
  
  const columnCurrencyExRate = [
    {
      title: 'Валюта',
      dataIndex: 'currency'
    },
    {
      title: 'ЦБ 20.12.23',
      dataIndex: 'cb_date'
    },
  ]
  
  const dataCurrencyExRate = [
    {
      key: 1,
      currency: 'USD',
      cb_date: '12,371.00',
      
    },
    {
      key: 2,
      currency: 'EUR',
      cb_date: '13,537.00',
     
    }
  ]

  return (
    <div>
      <div className="main-table-2">
        <Table
          size='small'
          columns={columnPasswordExp}
          dataSource={dataPasswordExp}
          pagination={false}
          bordered
          style={{ width: 280, marginRight: 20 }}
          title={() => (
            <tr style={{ textAlign: "center" }}>
              <h3> Срок пароля </h3>
            </tr>
          )}
          showHeader={false}
          
        />

        <Table
          size='small'
          columns={columnPaymnetSchedule}
          dataSource={dataPaymnetSchedule}
          pagination={false}
          bordered
          style={{ width: 280, marginRight: 20 }}
          title={() => (
            <tr style={{ textAlign: "center" }}>
              <h3> Расписание платижей </h3>
            </tr>
          )}
          showHeader={false}
        />

        <Table
          size='small'
          columns={columnCurrencyExRate}
          dataSource={dataCurrencyExRate}
          pagination={false}
          bordered
          style={{ width: 200 }}
          title={() => (
            <tr style={{ textAlign: "center" }}>
              <h3> Курсы валют </h3>
            </tr>
          )}
        />
      </div>

      <Divider />

      <div className="main-table-1">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          title={() => (
            <tr>
              <h3> Мои счета </h3>
            </tr>
          )}
          style={{width: 800}}
        />
      </div>

      <Footer
        className="home-footer"
        style={{
          textAlign: "left",
        }}
      >
        Телефон для справок +998 (78) 150-21-22
        <br />
        20.12.23 16:57 от Фоновый процесс Информация Межбанковские до 20.12.2023
        19:00
      </Footer>
    </div>
  );
};

export default Main;
