import { useParams } from "react-router-dom";
import RevenueTable from "../../../components/revenueTable";

const Revenue = () => {
  const params = useParams();
  return (
    <div>
      <div className="title">
        Мониторинг платежных документов
        <br />
        {params.revenue === "debet" ? "Исходящий" : "Поступление"} -{" "}
        {params.account}
      </div>
      <RevenueTable />
    </div>
  );
};

export default Revenue;
