import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { fetchGlobalDate } from "../../reduxStore/features/globalDateSlice";
import { DatePicker, Table, Space, Button  } from "antd";
import { getAccountArchiveList, } from "./request";
import type { DatePickerProps } from "antd";
import moment from "moment";
// import { status } from "../../assets/defaultData";
import _ from "lodash";
import dayjs from "dayjs";
import { fetchOperDay } from "../../assets/reusable/functions";
import { Link } from "react-router-dom";

const AccountListArchive = () => {
  const [isLoading, setLoading] = useState(false);
  // @ts-expect-error try
  const { globalDate } = useSelector((state: unknown) => state.globalDate);
  const [dataSource, setDataSource] = useState([]);
  const [chosenDate, setChosenDate] = useState(
    globalDate?.date ? dayjs(globalDate?.date, "DD.MM.YYYY") : null
  );
  // const [datePickedM, setDatePckedM] = useState(dayjs().format("DD.MM.YYYY"));
  // const [operday, setOperday] = useState<IOperday>();

  // redux is below
  // const dispatch = useDispatch();

  // @ts-expect-error try
  const  formatNumberWithCommas = (amount, minimumFractionDigits = 2) => {
    const parts = Number(amount).toFixed(minimumFractionDigits).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

  const columns = [
    {
      title: "Дата Док.",
      dataIndex: "operDay",
      key: "operDay",
      align: "center",
      // fixed: "left",
      render: (operDay: string) =>
        operDay ? moment(operDay).format("DD.MM.YYYY") : null,
    },
    {
      title: "№ Док.",
      dataIndex: "documentNumber",
      key: "documentNumber",
      align: "center",
      // fixed: "left"
    },
    
    // {
    //   title: "Опер. день",
    //   dataIndex: "forderDay",
    //   key: "forderDay",
    //   render: (forderDay: string) =>
    //     forderDay ? moment(forderDay).format("DD.MM.YYYY") : null,
    // },
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
          width: '12%',
          render: (amount: string) => ({
            children: (
              <div style={{whiteSpace: 'nowrap'}}>
               {amount}
              </div>
            ),
          }),
        },
        // { title: "ИНН", dataIndex: "debitINN", key: "debitINN", align: "center" },
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
          width: '12%',
          render: (amount: string) => ({
            children: (
              <div style={{whiteSpace: 'nowrap'}}>
               {amount}
              </div>
            ),
          }),
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
      // fixed: "right",
      render: (amount: string) => ({
        children: (
          <div style={{ textAlign: 'right' }}>
           {formatNumberWithCommas(amount)}
          </div>
        ),
      }),
    },
    {
      title: "Статус",
      dataIndex: "statusName",
      key: "statusName",
      align: 'center',
      // fixed: "right"
      // render: (statusText: string) => {
      //   if (statusText) {
      //     let tempStatus = _.find(status, { statusTitle: statusText });
      //     console.log("temppp: ", tempStatus);
      //     return (
      //       <Tag color={tempStatus?.statusColor}>{tempStatus?.statusTitle}</Tag>
      //     );
      //   }
      // },
    },
    {
      title: "Действие",
      key: "action",
      align: 'center',
      //@ts-expect-error try
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/archive/${record.key}/doc`}>
            <Button>Посмотреть</Button>
          </Link>
        </Space>
      ),
    },
  ];

  const fetchOperdays = async () => {
    const response = await fetchOperDay();
    // setOperday(response);
    await getList(response.date);
    setChosenDate(response.date);
  };

  useEffect(() => {
    fetchOperdays();
    // dispatch(fetchGlobalDate());
  }, []);

  const getList = async (date: unknown) => {
    setLoading(true);
    // @ts-expect-error try
    const response = await getAccountArchiveList({
      // @ts-expect-error try
      operday: dayjs(date).format("YYYY-MM-DD"),
    });
    // console.log("response: ", response);
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
        })
      )
    );
    setLoading(false);
  };

  // useEffect(() => {
  // getList(moment().format("YYYY-MM-DD"));
  // }, []);

  const onChange: DatePickerProps["onChange"] = (dateString) => {
    console.log("dateString: ", dateString);
    if (dateString) {
      const tempDate = dayjs(dateString);
      // setDatePckedM(tempDate.format("DD.MM.YYYY"));
      getList(tempDate);
      setChosenDate(tempDate);
    }
  };

  return (
    <>
      <div className="title">Архив документов</div>
      <div className="todays_date">
        Дата:{" "}
        <DatePicker
          onChange={onChange}
          format="DD.MM.YYYY"
          value={dayjs(chosenDate)}
        />
      </div>
      <Table
        loading={isLoading}
        dataSource={dataSource}
        // @ts-expect-error try
        columns={columns}
        bordered
        style={{ marginTop: 40 }}
        scroll={{ x: 1500 }}
      />
    </>
  );
};

export default AccountListArchive;
