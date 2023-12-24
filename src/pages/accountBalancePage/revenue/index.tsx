import { useParams } from "react-router-dom";
import RevenueTable from "../../../components/revenueTable";

const Revenue = () => {
  const params = useParams();
  console.log('para: ', params);
  return (
    <div>
      <h1>{params.revenue === 'debet' ? 'Исходящий' : 'Поступление'} - {params.account}</h1>
      <RevenueTable />
    </div>
  );
};

export default Revenue;