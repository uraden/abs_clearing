import { useState, useEffect } from "react";
// import AccountList from "../../components/simpleTable";
import { Button, Form, Select, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { getAccountTodayList } from "../accountListArchive/request";
import moment from "moment";
// import { status } from "../../assets/defaultData";
import _ from "lodash";
import { editFormStatus, getOrderStatuses } from "../editDoc/request";
import { useSelector } from "react-redux";
import { IFilterTable } from "../../assets/interfaces";

const AccoutDocs = () => {
  const [isLoading, setLoading] = useState(false);
  const [allStatus, setAllStatus] = useState([]);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  // @ts-expect-error try
  const formatNumberWithCommas = (amount, minimumFractionDigits = 2) => {
    const parts = Number(amount)
      .toFixed(minimumFractionDigits)
      .toString()
      .split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };
  const columns = [
    {
      title: "Дата Док.",
      dataIndex: "operDay",
      key: "operDay",
      align: "center",
      fixed: "left",
      render: (operDay: string) =>
        operDay ? moment(operDay).format("DD.MM.YYYY") : null,
    },
    {
      title: "№ Док.",
      dataIndex: "documentNumber",
      key: "documentNumber",
      align: "center",
      fixed: "left",
    },
    
    {
      title: "Плательщик",
      children: [
        {
          title: "МФО банка",
          dataIndex: "debitMFO",
          key: "debitMFO",
          align: "center",
        },
        {
          title: "Лицевой счет",
          dataIndex: "debitAccount",
          key: "debitAccount",
          align: "center",
          width: "12%",
          render: (account: string) => (
            <span style={{ whiteSpace: "nowrap" }}>{account}</span>
          ),
        },
        // {
        //   title: "ИНН",
        //   dataIndex: "debitINN",
        //   key: "debitINN",
        //   align: "center",
        // },
        // {
        //   title: "Наименование",
        //   dataIndex: "debitName",
        //   key: "debitName",
        //   align: "center",
        // },
        // { title: "ИНН", dataIndex: "creditINN", key: "creditINN" },
      ],
    },
    {
      title: "Получатель",
      children: [
        {
          title: "МФО банка",
          dataIndex: "creditMFO",
          key: "creditMFO",
          align: "center",
        },
        {
          title: "Лицевой счет",
          dataIndex: "creditAccount",
          key: "creditAccount",
          align: "center",
          width: "12%",
          render: (account: string) => (
            <span style={{ whiteSpace: "nowrap" }}>{account}</span>
          ),
        },
        // {
        //   title: "ИНН",
        //   dataIndex: "creditINN",
        //   key: "creditINN",
        //   align: "center",
        // },
        // {
        //   title: "Наименование",
        //   dataIndex: "creditName",
        //   key: "creditName",
        //   align: "center",
        // },
      ],
    },
    {
      title: "Сумма",
      dataIndex: "total_amount",
      key: "total_amount",
      align: "center",
      render: (amount: string) => ({
        children: (
          <div style={{ textAlign: "right" }}>
            {formatNumberWithCommas(amount)}
          </div>
        ),
      }),
    },
    {
      title: "Статус",
      dataIndex: "statusName",
      key: "statusName",
      align: "center",
      filters: allStatus.map((status: IFilterTable) => ({
        
        text: status?.name,
        
        value: status?.name,
      })),
      // @ts-expect-error try
      onFilter: (value: unknown, record: unknown) => record?.statusName.includes(value),
    },
    {
      title: "Действие",
      key: "action",
      fixed: "right",
      // @ts-expect-error try
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/edit/${record.key}/doc`}>
            {/* <Link
            to={`/edit/${encodeURIComponent(
              record.key + localStorage.getItem("accessToken")
            )}/doc`}
          > */}
            <Button>Изменить</Button>
          </Link>
        </Space>
      ),
    },
  ];

  // @ts-ignore
  const { globalDate } = useSelector((state: unknown) => state.globalDate);

  console.log("globalDateeeeeeee: ", globalDate.date);

  const getAllOrderStatuses = async () => {
    const response = await getOrderStatuses();
    setAllStatus(response);
  };

  // const fetchOperdays = async () => {
  //   // const response = await fetchOperDay();
  //   // setOperday(response);
  //   await getList(globalDate.date);
  // };

  const getList = async () => {
    setLoading(true);
    // @ts-ignore
    const response = await getAccountTodayList();

    setDataSource(
      response.map(
        (item: {
          id: string;
          documentNumber: string;
          creditMFO: string;
          // crPnfl: string;
          creditAccount: string;
          creditName: string;
          creditINN: string;
          debitMFO: string;
          // debPnfl: string;
          debitName: string;
          debitAccount: string;
          debitINN: string;
          sum: string;
          operDay: string;
          debName: string;
          forderDay: string;
          statusName: string;
        }) => ({
          key: item.id,
          documentNumber: item.documentNumber,
          creditMFO: item.creditMFO,
          creditAccount: item.creditAccount,
          creditName: item.creditName,
          creditINN: item.creditINN,
          debitMFO: item.debitMFO,
          debitAccount: item.debitAccount,
          debitName: item.debitName,
          // debitAccount: item.debPnfl,
          debitINN: item.debitINN,
          total_amount: item.sum,
          operDay: item.operDay,
          forderDay: item.forderDay,
          statusName: item.statusName,
          documentId: item.id,
        })
      )
    );
    setLoading(false);
  };

  useEffect(() => {
    getAllOrderStatuses();
    // fetchOperdays();
  }, []);

  useEffect(() => {
    if (globalDate?.date) {
      getList();
    }
  }, [globalDate?.date]);

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    // @ts-ignore
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      setSelectedDocs(selectedRows);
    },
  };

  const onFinish = async ({ statusId }: any) => {
    if (selectedDocs.length) {
      setLoading(true);
      const modififedData = selectedDocs.map((doc: any) => ({
        documentId: doc.documentId,
        statusId: statusId,
      }));
      setLoading(false);
      await editFormStatus(modififedData);
      setSelectedDocs([]);
      await getList();
    }
  };

  const onFinishFailed = async (values: any) => {
    console.log("values: ", values);
  };

  console.log("seeL: ", selectedDocs);

  return (
    <>
      <div className="title">Мои документы</div>
      <Table
        loading={isLoading}
        dataSource={dataSource}
        //@ts-expect-error try
        columns={columns}
        bordered
        style={{ marginTop: 40 }}
        scroll={{ x: 1500 }}
        rowSelection={{
          selectedRowKeys: selectedDocs.length
            ? selectedDocs.map((doc: any) => doc.key)
            : [],
          ...rowSelection,
        }}
        // @ts-expect-error try
        pagination={dataSource.length < 20 ? false : true}
      />
      <div style={{ marginTop: 8, marginLeft: 8 }}>
        <Form
          layout="inline"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="statusId"
            label="Статусы"
            rules={[{ required: true, message: "" }]}
          >
            <Select style={{ width: 140 }}>
              {allStatus.map((status: any) => (
                <Select.Option key={status.id} value={status.id}>
                  {status.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              loading={isLoading}
              htmlType="submit"
              style={{ outline: "none" }}
            >
              Изменить
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AccoutDocs;
