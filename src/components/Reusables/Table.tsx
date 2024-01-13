import React, {useEffect} from "react";
import { useSelector } from 'react-redux';
// import { fetchGlobalDate } from "../../reduxStore/features/globalDateSlice";
import { Table, Divider } from "antd";
import { useLocation } from "react-router-dom";
// import { IOperday } from "../../assets/interfaces";
import dayjs from "dayjs";
// import { fetchOperDay } from "../../assets/reusable/functions";
// import { useAccountList } from "../../pages/accountList/request";

const CustomTable: React.FC = ({
  isLoading,
  columns,
  dataSource,
  titleOfThePage,
  datePicked,
}: any) => {
  const location = useLocation();
  
  const { globalDate } = useSelector((state: unknown) => state.globalDate);
  
  useEffect(() => {
    // fetchOperdays();
    // dispatch(fetchGlobalDate());
  }, []);
  

  return (
    <>
      <div className="title">
        {titleOfThePage}
      </div>

      <div className="todays_date">
        Операционный день
        <span style={{ fontWeight: 700 }}>
          {location.pathname === "/account-list" ||
          location.pathname === "/draft-form"
            ? ` - ${dayjs(globalDate?.date).format('DD.MM.YYYY')}`
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
