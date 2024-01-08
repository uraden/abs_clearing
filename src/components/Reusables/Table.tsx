import React, {useEffect, useState} from "react";
import { Table, Divider } from "antd";
import { useLocation } from "react-router-dom";
import { getOperdays } from "../../assets/reusable/requests";
import { IOperday } from "../../assets/interfaces";
import dayjs from "dayjs";
// import { useAccountList } from "../../pages/accountList/request";

const CustomTable: React.FC = ({
  isLoading,
  columns,
  dataSource,
  titleOfThePage,
  datePicked,
}: any) => {
  const location = useLocation();
  
  const [operday, setOperday] = useState<IOperday>();
  
  useEffect(() => {
    fetchOperdays();
  }, []);
  
  const fetchOperdays = async () => {
    const response = await getOperdays();
    setOperday(response.find((day: IOperday) => day.isActive));
  };

  return (
    <>
      <div className="title">
        {titleOfThePage}
      </div>

      <div className="todays_date">
        {" "}
        Операционный день
        <span style={{ fontWeight: 700 }}>
          {location.pathname === "/account-list" ||
          location.pathname === "/draft-form"
            ? ` - ${dayjs(operday?.date).format('DD.MM.YYYY')} `
            : ` - ${datePicked}`}
        </span>
      </div>
      <Divider />
      <Table
        loading={isLoading}
        dataSource={dataSource}
        columns={columns}
        bordered
        style={{ marginTop: 40 }}
      />
    </>
  );
};

export default CustomTable;
