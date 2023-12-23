import { useEffect, useState } from "react";
import { Button, Space, DatePicker, Tag, Card } from "antd";
import { getDraftDetails, getDraftList } from "./request";
import CustomTable from "../../components/Reusables/Table";
import { Link } from "react-router-dom";
import type { DatePickerProps } from "antd";
import moment, { MomentInput } from "moment";
import { status } from "../../assets/defaultData";

import _ from "lodash";
import { PlusSquareOutlined, PlusSquareTwoTone } from "@ant-design/icons";
import UploadModal from "../../components/draftFileUpload";

// interface YourRecordType {
//   key: string;
// }

const DraftForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [draftList, setDraftList] = useState();
  const [visible, setVisible] = useState(false);
  const columns = [
    { title: "№ Док.", dataIndex: "nDoc", key: "nDoc" },
    {
      title: "Дата Док.",
      dataIndex: "dtd",
      key: "dtd",
      render: (dtd: string) => (dtd ? moment(dtd).format("DD.MM.YYYY") : null),
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
        { title: "МФО", dataIndex: "mfo_2", key: "mfo_2" },
        { title: "Счет", dataIndex: "account_2", key: "account_2" },
        { title: "ИНН", dataIndex: "inn_2", key: "inn_2" },
        { title: "Наименование", dataIndex: "name_2", key: "name_2" },
        // { title: "ИНН", dataIndex: "inn_1", key: "inn_1" },
      ],
    },
    {
      title: "Получатель",
      children: [
        { title: "МФО", dataIndex: "mfo_1", key: "mfo_1" },
        { title: "Счет", dataIndex: "account_1", key: "account_1" },
        { title: "ИНН", dataIndex: "inn_1", key: "inn_1" },
        { title: "Наименование", dataIndex: "name_1", key: "name_1" },
      ],
    },
    {
      title: "Сумма",
      dataIndex: "total_amount",
      key: "total_amount",
      render: (amount: string) =>
        Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 }),
      align: 'right'  
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (statusText: string) => {
        if (statusText) {
          let tempStatus = _.find(status, { statusTitle: statusText });
          console.log("temppp: ", tempStatus);
          return (
            <Tag color={tempStatus?.statusColor}>{tempStatus?.statusTitle}</Tag>
          );
        }
      },
    },
    {
      title: "Действие",
      key: "action",
      //@ts-ignore
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/edit/${record.key}/doc`}>
            <Button>Изменить</Button>
          </Link>
        </Space>
      ),
    },
  ];
  const getList = async () => {
    const response = await getDraftList();
    console.log("response: ", response);
    setDraftList(response.data);
  };
  const getData = async () => {
    setLoading(true);
    // const response = await getAccountArchiveList();
    // console.log("response: ", response);
    // setDataSource(
    //   response.map(
    //     (item: {
    //       id: string;
    //       ndoc: string;
    //       crMfo: string;
    //       crPnfl: string;
    //       crName: string;
    //       crInn: string;
    //       debMfo: string;
    //       debPnfl: string;
    //       debInn: string;
    //       sum: string;
    //       dtd: string;
    //       debName: string;
    //       forderDay: string;
    //       status: string;
    //     }) => ({
    //       key: item.id,
    //       nDoc: item.ndoc,
    //       mfo_1: item.crMfo,
    //       account_1: item.crPnfl,
    //       name_1: item.crName,
    //       name_2: item.debName,
    //       inn_1: item.crInn,
    //       mfo_2: item.debMfo,
    //       account_2: item.debPnfl,
    //       inn_2: item.debInn,
    //       total_amount: item.sum,
    //       dtd: item.dtd,
    //       forderDay: item.forderDay,
    //       status: item.status,
    //     })
    //   )
    // );
    setLoading(false);
  };

  useEffect(() => {
    getList();
  }, []);

  const onChange: DatePickerProps["onChange"] = (dateString) => {
    console.log(moment(dateString as MomentInput).format("DD.MM.YYYY"));
  };

  return (
    <div style={{ display: "flex" }}>

      {/* !!!!Removed Card ask Farrukh Aka!!! */}


      {/* <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Card
          title="History of Drafts"
          style={{ width: 250, textAlign: "left" }}
        >
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <p onClick={() => console.log("Click 1")}>Draft list 1</p>
            <p>Draft list 2</p>
            <p>Draft list 3</p>
          </Space>
        </Card>
        <Card title="Shablons" style={{ width: 250, textAlign: "left" }}>
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <p onClick={() => console.log("Click 1")}>Shablon 1</p>
            <p>Shablon 2</p>
            <p>Shablon 3</p>
          </Space>
        </Card>
      </Space> */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "95%",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={() => setVisible(true)}
            type="primary"
            icon={<PlusSquareTwoTone />}
          >
            Загрузить файл
          </Button>
          <UploadModal visible={visible} onClose={() => setVisible(false)} />
        </div>
        <CustomTable
          //@ts-ignore
          isLoading={isLoading}
          columns={columns}
          dataSource={dataSource}
        />
      </div>
    </div>
  );
};

export default DraftForm;
