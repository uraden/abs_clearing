import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Select,
  DatePicker,
  Input,
  Flex,
  Checkbox
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { getAllAccounts } from './request'

import { status } from "../../assets/defaultData";
import _ from "lodash";

interface DataType {
  key: React.Key;
  account: string;
  name: string;
  currency: string;
  bank: string;
  remainder: string;
  status: string;
  report: unknown;
  client: string;
  currencyType: string;
  mfo: string;
  amount: string;
  length: number
}

const AccountPage = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [responseData, setResponseData] = useState<DataType[]>()

  const onChangeCheckBox = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllAccounts();
        setResponseData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);



  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);

  };

  //@ts-expect-error try
  const mappedData: DataType[] | undefined = responseData
  ? responseData.map((item) => ({
      key: item.key,
      account: item.account,
      name: item.client,
      currency: item.currencyType,
      bank: item.mfo.toString(),
      remainder: Number(item.amount).toLocaleString('en-US'),
      status: item.status,
      report: (
        <Button size="small" onClick={showModal}>
          Отчет
        </Button>
      ),
    }))
  : undefined;



  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const statusFilterData = status.map((statusItem) => ({
    text: statusItem.statusTitle,
    value: statusItem.statusTitle,
  }));

  const columns: ColumnsType<DataType> = [
    {
      title: "Счет",
      dataIndex: "account",
      width: "20%",
    },
    {
      title: "Наименование",
      dataIndex: "name",
      width: "25%",
    },
    {
      title: "Валюта",
      dataIndex: "currency",
      width: "10%",
    },
    {
      title: "Банк",
      dataIndex: "bank",
      width: "10%",
    },
    {
      title: "Остаток ",
      dataIndex: "remainder",
      width: "15%",
      align: 'right'
    },
    {
      title: "Статус",
      dataIndex: "status",
      filters: statusFilterData,
      // @ts-ignore
      onFilter: (value: string, record) => record.status.startsWith(value),
      filterSearch: true,
      width: "10%",
      // render: (statusText: string) => {
      //   if (statusText) {
      //     let tempStatus = _.find(status, { statusTitle: statusText });
      //     return (
      //       <Tag color={tempStatus?.statusColor}>{tempStatus?.statusTitle}</Tag>
      //     );
      //   }
      // },
    },
    // {
    //   title: "Отчет",
    //   dataIndex: "report",
    //   width: "10%",
    // },
  ];

 

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <div className="title">Мои счета</div>
      <Table 
        columns={columns} 
        dataSource={mappedData || []} 
        onChange={onChange} 
        pagination={mappedData && mappedData.length > 5 ? {} : false}
      />

      <Modal
        title="Выписка лицевых"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Выполнить"
        cancelText="Сброс"
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          size="small"
          style={{ maxWidth: 600 }}
          labelAlign="left"
        >
          <Form.Item label="Банк">
            <Select>
              <Select.Option value="demo">
                00837 - Юнусобод филиали
              </Select.Option>
              <Select.Option value="demo">
                00711 - Чилонзор филиали
              </Select.Option>
              <Select.Option value="demo">
                00121 - Янги йол филиали
              </Select.Option>
              <Select.Option value="demo">
                00211 - Ок тепа филиали
              </Select.Option>
              <Select.Option value="demo">00641 - Ц1 филиали</Select.Option>
            </Select>
          </Form.Item>
          <Flex>
            <Form.Item
              label="Период с"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ marginRight: 30 }}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="по"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
            >
              <DatePicker />
            </Form.Item>
          </Flex>
          <Form.Item label="">
            <p>Для счета</p>
            <Input style={{ width: 435 }} />
          </Form.Item>

          <Form.Item
            label="Сортировка по:"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
          >
            <Select>
              <Select.Option value="date">Дате</Select.Option>
              <Select.Option value="companyName">Компании</Select.Option>
              <Select.Option value="user">Пользователю</Select.Option>
            </Select>
          </Form.Item>

          


          <Form.Item
            label="Включать наименование корреспондента"
            labelCol={{ span: 15 }}
            wrapperCol={{ span: 7 }}
          >
            <Select>
              <Select.Option value="yes">Да</Select.Option>
              <Select.Option value="no">Нет</Select.Option>
            </Select>
          </Form.Item>


          <Form.Item
            label="Включать назначение платежа"
            labelCol={{ span: 11 }}
            wrapperCol={{ span: 10 }}
          >
            <Select>
              <Select.Option value="yes">Да</Select.Option>
              <Select.Option value="no">Нет</Select.Option>
            </Select>
          </Form.Item>

          
          <Form.Item
            wrapperCol={{ span: 4 }}
          >
           <Checkbox onChange={onChangeCheckBox}>Excel</Checkbox>
          </Form.Item>

        </Form>
      </Modal>
    </div>
  );
};

export default AccountPage;
