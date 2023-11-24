import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import { Button, Input, Space, Table, Modal, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { getAccountList } from "../../pages/accountList/request";
import _ from 'lodash';
import { Status } from "../../assets/defaultData";

interface DataType {
  id: string;
  crBankName: string;
  crInn: string;
  debBankName: string;
  naznCode: string;
  status: string
}

type DataIndex = keyof DataType;

const AccountList: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [isLoading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);

  const navigate = useNavigate();

  const getList = async () => {
    setLoading(true);
    const response = await getAccountList();
    try {
      // Assuming the data is an array inside response.data, map it with an incremental id
      // const mappedData = response?.data.map(
      //   (item: {
      //     id: string;
      //     crBankName: string;
      //     crInn: string;
      //     debBankName: string;
      //     naznCode: string;
      //   }) => ({
      //     key: item.id,
      //     name: item.crBankName,
      //     currency: item.crInn,
      //     bankName: item.debBankName,
      //     remainder: item.naznCode,
      //     action: ["Изменить", "Утвердить", "Удалить"],
      //   })
      // );
      // @ts-ignore
      setTableData(response.data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  // const showModal = () => {
  //   setOpen(true);
  // };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    console.log();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
  

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Наименование",
      dataIndex: "crBankName",
      key: "crBankName",
      width: 300,
      ...getColumnSearchProps("crBankName"),
    },
    {
      title: "Валюта",
      dataIndex: "crInn",
      key: "crInn",
      width: 300,
      ...getColumnSearchProps("crInn"),
    },
    {
      title: "Банк",
      dataIndex: "debBankName",
      key: "debBankName",
      width: 300,
      ...getColumnSearchProps("debBankName"),
      sorter: (a, b) => a.debBankName.length - b.debBankName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Остаток",
      dataIndex: "naznCode",
      key: "naznCode",
      width: 300,
      ...getColumnSearchProps("naznCode"),
      sorter: (a, b) => a.naznCode.length - b.naznCode.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const tempStatus = _.find(Status, (o) => o.statusTitle === status);
        if (tempStatus) {
          return <Tag color={tempStatus.statusColor}>{status}</Tag>
        }
        return status;
      },
    },
    {
      title: "Действие",
      // key: "action",
      render: (_) => (
        <Space size="middle">
          <Button
            onClick={() => navigate('/account-form')}
            style={{
              borderColor: "#fa8c16",
              color: "#fa8c16",
              outline: "none",
            }}
          >
            Изменить
          </Button>
          {/* <Button
            onClick={() => {
              alert(record.name + " " + record.action[1]);
            }}
            style={{
              borderColor: "#52c41a",
              color: "#52c41a",
              outline: "none",
            }}
          >
            {record.action[1]}
          </Button>
          <Popconfirm
            title={`Delete the task`}
            description={`Are you sure to delete ${record.name}?`}
            onConfirm={(e) => e && confirm(e, record.name)}
            onCancel={(e) =>e && cancel(e)}
            okText="Yes"
            cancelText="No"
            style={{ outline: "none" }}
            okButtonProps={{ style: { outline: "none" } }}
            cancelButtonProps={{ style: { outline: "none" } }}
          >
            <Button
              // onClick={() => {
              //   alert(record.name + " " + record.action[2]);
              // }}
              style={{
                borderColor: "#f5222d",
                color: "#f5222d",
                outline: "none",
              }}
            >
              {record.action[2]}
            </Button>
          </Popconfirm> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{ style: { outline: "none" } }}
        cancelButtonProps={{ style: { outline: "none" } }}
      >
        <p>{modalText}</p>
      </Modal>
      <h3 style={{ textAlign: "center", marginBottom: 16 }}>Список Документов</h3>
      <Table loading={isLoading} columns={columns} dataSource={tableData} />
    </>
  );
};

export default AccountList;
