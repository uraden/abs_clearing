import { SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words'
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  action: Array<string>;
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    action: ["Изменить", "Утвердить", "Удалить"]
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
    action: ["Изменить", "Утвердить", "Удалить"]
  },
  {
    key: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    action: ["Изменить", "Утвердить", "Удалить"]
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
    action: ["Изменить", "Утвердить", "Удалить"]
  },
  {
    key: '5',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
    action: ["Изменить", "Утвердить", "Удалить"]
  },
  {
    key: '6',
    name: 'New can',
    age: 32,
    address: 'London No. 2 Lake Park',
    action: ["Изменить", "Утвердить", "Удалить"]
  },
  {
    key: '7',
    name: 'All In',
    age: 26,
    address: 'London No. 2 Lake Park',
    action: ["Изменить", "Утвердить", "Удалить"]
  },
  {
    key: '8',
    name: 'Alex Ferguson',
    age: 32,
    address: 'London No. 2 Lake Park',
    action: ["Изменить", "Утвердить", "Удалить"]
  },
  {
    key: '9',
    name: 'Old School',
    age: 50,
    address: 'London No. 2 Lake Park',
    action: ["Изменить", "Утвердить", "Удалить"]
  },
  {
    key: '10',
    name: 'My Man',
    age: 1,
    address: 'London No. 2 Lake Park',
    action: ["Изменить", "Утвердить", "Удалить"]
  },
  {
    key: '11',
    name: 'Nigger Bigger',
    age: 31,
    address: 'London No. 2 Lake Park',
    action: ["Изменить", "Утвердить", "Удалить"]
  },
  {
    key: '12',
    name: 'John Smilga',
    age: 32,
    address: 'London No. 2 Lake Park',
    action: ["Изменить", "Утвердить", "Удалить"]
  },
];

const SimpleTable: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
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
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
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
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 300,
      ...getColumnSearchProps('age'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 300,
      ...getColumnSearchProps('address'),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={()=> {alert(record.name + " " + record.action[0])}} style={{ borderColor: "#fa8c16", color: "#fa8c16", outline: 'none' }}>{record.action[0]}</Button>
          <Button onClick={()=> {alert(record.name + " " + record.action[1])}} style={{ borderColor: "#52c41a", color: "#52c41a", outline: 'none' }}>{record.action[1]}</Button>
          <Button onClick={()=> {alert(record.name + " " + record.action[2])}} style={{ borderColor: "#f5222d", color: "#f5222d", outline: 'none' }}>{record.action[2]}</Button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default SimpleTable;