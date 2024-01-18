import { Descriptions, Table } from "antd";
import type { DescriptionsProps } from "antd/lib";

const Reference = () => {
  const columnPaymnetSchedule = [
    {
      dataIndex: "bank_type",
    },
    {
      dataIndex: "start_time",
    },
    {
      dataIndex: "end_time",
    },
  ];
  const dataPaymnetSchedule = [
    {
      key: 1,
      bank_type: "Межбанковские",
      start_time: "00:00",
      end_time: "23:55",
    },
    {
      key: 2,
      bank_type: "Внутрибанковские",
      start_time: "00:00",
      end_time: "23:55",
    },
  ];

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Название",
      children: "АО «Национальный клиринговый центр» (НКЦ)",
    },
    {
      key: "2",
      label: "Телефон",
      children: <a href="tel:99855501-33-02">+998 (55) 501-33-02</a>,
    },
    {
      key: "3",
      label: "Факс",
      children: "+998 (55) 501-34-01",
    },
    {
      key: "4",
      label: "Наш эл. адрес",
      children: <a href="mailto:info@uzrvb.uz">info@uzrvb.uz</a>,
    },
    {
      key: "5",
      label: "Адрес",
      children:
        "100084, г.Ташкент, проспект Ш.Рашидова, 4. Ориентир: Ташкентский архитектурно-строительный институт. Остановка автобусов №88, 85.",
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      <div className="title">Техническая поддержка</div>
      <div>
        <Table
          size="small"
          columns={columnPaymnetSchedule}
          dataSource={dataPaymnetSchedule}
          pagination={false}
          bordered
          style={{ width: 280, marginRight: 20 }}
          title={() => (
            <tr style={{ textAlign: "center" }}>
              <h4>Расписание платежей</h4>
            </tr>
          )}
          showHeader={false}
        />
      </div>

      <div style={{ marginTop: 16 }}>
        <Descriptions
          bordered
          title="Общая контактная информация"
          items={items}
        />
      </div>
    </div>
  );
};

export default Reference;
