import { useParams } from "react-router-dom";
import RevenueTable from "../../../components/revenueTable";

const Revenue = () => {
  const params = useParams();
  console.log("para: ", params);
  return (
    <div>
      <span style={{ marginBottom: 30, fontSize: 36, fontWeight: "bold" }}>
        Мониторинг платежных документов
        <br />
        {params.revenue === "debet" ? "Исходящий" : "Поступление"} -{" "}
        {params.account}
      </span>
      <RevenueTable />
    </div>
  );
};

export default Revenue;
