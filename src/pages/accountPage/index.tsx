import { Table, Button, Tag } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import {status} from '../../assets/defaultData'

interface DataType {
    key: React.Key;
    account: string,
    name: string,
    currency: string, 
    bank: string, 
    remainder: string, 
    status: unknown,
    report: unknown
  }

const AccountPage = () => {

    console.log(status)

    const statusFilterData = status.map((statusItem) => ({
        text: statusItem.statusTitle,
        value: statusItem.statusTitle,
      }));

    const columns: ColumnsType<DataType> = [
        {
          title: 'Счет',
          dataIndex: 'account',
          width: '20%',
        },
        {
          title: 'Наименование',
          dataIndex: 'name',
          width: '25%',
        },
        {
            title: 'Валюта',
            dataIndex: 'currency',
            width: '10%'
        },
        {
            title: 'Банк',
            dataIndex: 'bank',
            width: '10%'
        },
        {
            title: 'Остаток ',
            dataIndex: 'remainder',
            width: '15%'
        },
        {
          title: 'Статус',
          dataIndex: 'status',
          filters: statusFilterData,
          onFilter: (value: string, record) => record.status.startsWith(value),
          filterSearch: true,
          width: '10%',
        },
        {
            title: 'Отчет',
            dataIndex: 'report',
            width: '10%',
          },
      ];
      

      const data: DataType[] = [
        {
          key: '1',
          account: '16401000705474605001',
          name: 'DASTURCHILAR LABOROTORIYASI MCHJ',
          currency: 'UZS',
          bank: '837', 
          remainder: '0.00', 
          status: 'Утвержден',
          report: <Button size="small">Отчет</Button>
        },
        {
            key: '2',
            account: '17771000705474112007',
            name: 'DASTURCHILAR LABOROTORIYASI MCHJ',
            currency: 'UZS',
            bank: '837', 
            remainder: '0.00', 
            status: 'Введен',
            report: <Button size="small">Отчет</Button>
        },
        {
            key: '3',
            account: '30001000705474112007',
            name: 'DASTURCHILAR LABOROTORIYASI MCHJ',
            currency: 'UZS',
            bank: '227', 
            remainder: '100,000.00', 
            status: 'На одобрение',
            report: <Button size="small">Отчет</Button>
        },
        {
            key: '4',
            account: '30001000705474112007',
            name: 'NEW TECHNOLOGY MCHJ',
            currency: 'UZS',
            bank: '227', 
            remainder: '2,01200,000.00', 
            status: <Tag color="magenta">Отправлен</Tag>,
            report: <Button size="small">Отчет</Button>
        },
        {
            key: '5',
            account: '10001044405474112007',
            name: 'YANGI UZBEKISTON MCHJ',
            currency: 'UZS',
            bank: '227', 
            remainder: '1,71200,000.00', 
            status: 'Отбракован',
            report: <Button size="small">Отчет</Button>
        },
      ];
      
      const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };

  return (
    <div>
        <h2 style={{marginBottom: 20}}>Счета</h2>
        <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  )
}

export default AccountPage