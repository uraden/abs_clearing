import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import { Button, Input, Space, Table, Modal } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { getAccountList } from "../../pages/accountList/request";

interface DataType {
  key: string;
  name: string;
  currency: string;
  bankName: string;
  remainder: string;
  action: Array<string>;
}

type DataIndex = keyof DataType;


const AccountList: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const [tableData, setTableData] =useState([])

  const getList = async () => {
    const response = await getAccountList();
    try {
      
      // Assuming the data is an array inside response.data, map it with an incremental id
      const mappedData = response?.data.map((item: { id: string; crBankName: string; crInn: string; debBankName: string; naznCode: string }) => ({
        key: item.id, 
        name: item.crBankName,
        currency: item.crInn,
        bankName: item.debBankName,
        remainder: item.naznCode,
        action: ["Изменить"],
      }));
      setTableData(mappedData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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

  // const confirm = (e: React.MouseEvent<HTMLElement>, name: string) => {
  //   console.log(e);
  //   message.success(`Deleted successfully ${name}`);
  // };

  // const cancel = (e: React.MouseEvent<HTMLElement>) => {
  //   console.log(e);
  //   message.error("Cancelled deletion");
  // };

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
      dataIndex: "bankName",
      key: "bankName",
      width: 300,
      ...getColumnSearchProps("bankName"),
      sorter: (a, b) => a.bankName.length - b.bankName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Остаток",
      dataIndex: "remainder",
      key: "remainder",
      width: 300,
      ...getColumnSearchProps("remainder"),
      sorter: (a, b) => a.remainder.length - b.remainder.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Действие",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setModalText(`${record.name}, ${record.currency}, ${record.bankName}`);
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
      <Table columns={columns} dataSource={tableData} />
    </>
  );
};

export default AccountList;
