import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Select,
  DatePicker,
  Input,
  Switch,
  Flex,
  Checkbox
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import { status } from "../../assets/defaultData";

interface DataType {
  key: React.Key;
  account: string;
  name: string;
  currency: string;
  bank: string;
  remainder: string;
  status: string;
  report: unknown;
}

const AccountPage = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onChangeCheckBox = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);

    // try {
    //     // Your API endpoint for the POST request
    //     const apiUrl = 'https://your-api-endpoint.com';
        
    //     // Your form data
    //     const formData = {
    //       // Add your form field values here
    //       // For example:
    //       bank: 'selectedBankValue',
    //       startDate: 'selectedStartDate',
    //       endDate: 'selectedEndDate',
    //       // ... add other form field values
    //     };
  
    //     const response = await fetch(apiUrl, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         // Add any other headers as needed
    //       },
    //       body: JSON.stringify(formData),
    //     });
  
    //     // Handle the response, e.g., check if it was successful
    //     if (response.ok) {
    //       setOpen(false);
    //       setConfirmLoading(false);
    //       // Additional logic if needed
    //     } else {
    //       // Handle the error
    //       console.error('Failed to make the POST request');
    //     }
    //   } catch (error) {
    //     console.error('Error in handleOk:', error);
    //   }



  };

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
    },
    // {
    //   title: "Отчет",
    //   dataIndex: "report",
    //   width: "10%",
    // },
  ];

  const data: DataType[] = [
    {
      key: "1",
      account: "16401000705474605001",
      name: "DASTURCHILAR LABOROTORIYASI MCHJ",
      currency: "UZS",
      bank: "837",
      remainder: "0.00",
      status: "Утвержден",
      report: (
        <Button size="small" onClick={showModal}>
          Отчет
        </Button>
      ),
    },
    {
      key: "2",
      account: "17771000705474112007",
      name: "DASTURCHILAR LABOROTORIYASI MCHJ",
      currency: "UZS",
      bank: "837",
      remainder: "0.00",
      status: "Введен",
      report: (
        <Button size="small" onClick={showModal}>
          Отчет
        </Button>
      ),
    },
    {
      key: "3",
      account: "30001000705474112007",
      name: "DASTURCHILAR LABOROTORIYASI MCHJ",
      currency: "UZS",
      bank: "227",
      remainder: "100,000.00",
      status: "На одобрение",
      report: (
        <Button size="small" onClick={showModal}>
          Отчет
        </Button>
      ),
    },
    {
      key: "4",
      account: "30001000705474112007",
      name: "NEW TECHNOLOGY MCHJ",
      currency: "UZS",
      bank: "227",
      remainder: "2,01200,000.00",
      status: "Отправлен",
      report: (
        <Button size="small" onClick={showModal}>
          Отчет
        </Button>
      ),
    },
    {
      key: "5",
      account: "10001044405474112007",
      name: "YANGI UZBEKISTON MCHJ",
      currency: "UZS",
      bank: "227",
      remainder: "1,71200,000.00",
      status: "Отбракован",
      report: (
        <Button size="small" onClick={showModal}>
          Отчет
        </Button>
      ),
    },
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
      <Table columns={columns} dataSource={data} onChange={onChange} />

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
