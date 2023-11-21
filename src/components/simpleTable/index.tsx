import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import { Button, Input, Popconfirm, Space, Table, message, Modal } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { getAccountList } from "../../pages/accountList/request";

interface DataType {
  key: string;
  name: string;
  currency: string;
  address: string;
  remainder: string;
  action: Array<string>;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    currency: '32',
    address: "New York No. 1 Lake Park",
    remainder: '',
    action: ["Изменить", "Утвердить", "Удалить"],
  },
  {
    key: "2",
    name: "Joe Black",
    currency: '42',
    address: "London No. 1 Lake Park",
    remainder: '',
    action: ["Изменить", "Утвердить", "Удалить"],
  },
  {
    key: "3",
    name: "Jim Green",
    currency: '32',
    address: "Sydney No. 1 Lake Park",
    remainder: '',
    action: ["Изменить", "Утвердить", "Удалить"],
  },
  {
    key: "4",
    name: "Jim Red",
    currency: '33',
    remainder: '',
    address: "London No. 2 Lake Park",
    action: ["Изменить", "Утвердить", "Удалить"],
  },
  {
    key: "5",
    name: "Jim Red",
    currency: '45',
    address: "London No. 2 Lake Park",
    remainder: '',
    action: ["Изменить", "Утвердить", "Удалить"],
  },
  {
    key: "6",
    name: "New can",
    currency: '33',
    address: "London No. 2 Lake Park",
    remainder: '',
    action: ["Изменить", "Утвердить", "Удалить"],
  },
  {
    key: "7",
    name: "All In",
    currency: '26',
    address: "London No. 2 Lake Park",
    remainder: '',
    action: ["Изменить", "Утвердить", "Удалить"],
  },
  {
    key: "8",
    name: "Alex Ferguson",
    currency: '32',
    address: "London No. 2 Lake Park",
    remainder: '',
    action: ["Изменить", "Утвердить", "Удалить"],
  },
  {
    key: "9",
    name: "Old School",
    currency: '50',
    address: "London No. 2 Lake Park",
    remainder: '',
    action: ["Изменить", "Утвердить", "Удалить"],
  },
  {
    key: "10",
    name: "My Man",
    currency: '1',
    address: "London No. 2 Lake Park",
    remainder: '',
    action: ["Изменить", "Утвердить", "Удалить"],
  },
  {
    key: "11",
    name: "Nigger Bigger",
    currency: '31',
    address: "London No. 2 Lake Park",
    remainder: '',
    action: ["Изменить", "Утвердить", "Удалить"],
  },
  {
    key: "12",
    name: "John Smilga",
    currency: '32',
    address: "London No. 2 Lake Park",
    remainder: '',
    action: ["Изменить", "Утвердить", "Удалить"],
  },
];

const AccountList: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const getList = async () => {
    const response = getAccountList();
    console.log("res: ", response);
  };

  useEffect(() => {
    getList();
  }, []);

  const showModal = () => {
    setOpen(true);
  };

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

  const confirm = (e: React.MouseEvent<HTMLElement>, name: string) => {
    console.log(e);
    message.success(`Deleted successfully ${name}`);
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error("Cancelled deletion");
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
      width: 300,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Валюта",
      dataIndex: "currency",
      key: "currency",
      width: 300,
      ...getColumnSearchProps("currency"),
    },
    {
      title: "Банк",
      dataIndex: "address",
      key: "address",
      width: 300,
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Остаток",
      dataIndex: "remainder",
      key: "remainder",
      width: 300,
      ...getColumnSearchProps("remainder"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Статус",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setModalText(`${record.name}, ${record.age}, ${record.address}`);
              return showModal();
            }}
            style={{
              borderColor: "#fa8c16",
              color: "#fa8c16",
              outline: "none",
            }}
          >
            {record.action[0]}
          </Button>
          <Button
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
            // @ts-ignore
            onConfirm={(e) => confirm(e, record.name)}
            // @ts-ignore
            onCancel={cancel}
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
          </Popconfirm>
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
      <h3 style={{ textAlign: "center", marginBottom: 16 }}>Таблица</h3>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default AccountList;
