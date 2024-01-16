import {
  Col,
  Descriptions,
  List,
  Row,
  Table,
} from "antd";
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

  const uzbekBanks = [
    {
      name: "TBC Bank",
      logo: "https://bank.uz/upload/iblock/cd2/jiu1lgfj0gw2zg1039uf777hn84w8vyh.png",
      link: 'https://tbcbank.uz/ru', // Replace with actual logo URL
    },
    {
      name: "Tenge Bank",
      logo: "https://bank.uz/upload/iblock/fd4/fd4bbdb0520d964cf262b7b05afde963.png", 
      link: 'https://tengebank.uz/ru', // Replace with actual logo URL// Replace with actual logo URL
    },
    {
      name: "Узпромстройбанк",
      logo: "https://bank.uz/upload/iblock/77c/77c45647ef172e1d350fa351030e56a9.png", 
      link: 'https://sqb.uz/uz/individuals/', // Replace with actual logo URL// Replace with actual logo URL
    },
    {
      name: "Асакабанк",
      link: 'https://www.asakabank.uz/', // Replace with actual logo URL
      logo: "https://bank.uz/upload/iblock/6a8/6a86cc944a81c1ecfce6e153bc548980.PNG", // Replace with actual logo URL
    },
    {
      name: "Asia Alliance Bank",
      link: 'https://aab.uz/uz/', // Replace with actual logo URL
      logo: "https://bank.uz/upload/iblock/b0f/onbsgs8k5pr9e1kl9woo7wl35sqbucrw.png", // Replace with actual logo URL
    },
    {
      name: "Garant bank",
      link: 'https://garantbank.uz/ru', // Replace with actual logo URL
      logo: "https://bank.uz/upload/iblock/571/13iv5iy7p5h9xcwucdxp1xefzalk8l73.jpg", // Replace with actual logo URL
    },
    {
      name: "Турон банк",
      link: 'https://turonbank.uz/ru/', // Replace with actual logo URL
      logo: "https://bank.uz/upload/iblock/3fe/3fe21780f63f50e780106ccc10c7a9f1.PNG", // Replace with actual logo URL
    },
    {
      name: "Xalq Banki",
      link: 'https://xb.uz/', // Replace with actual logo URL
      logo: "https://nbu.uz/local/templates/nbu/img/logonewyear.png", // Replace with actual logo URL
    },
    {
      name: "Капиталбанк",
      link: 'https://www.kapitalbank.uz/uz/welcome.php', // Replace with actual logo URL
      logo: "https://pultop.uz/wp-content/uploads/2019/01/kapitalbank-uzbekistan-1.png", // Replace with actual logo URL
    },
    {
      name: "Uzum Bank",
      link: 'https://uzumbank.uz/ru', // Replace with actual logo URL
      logo: "https://uzumbank.uz/_nuxt/img/uzumbank-logo-light.f4c13a0.svg", // Replace with actual logo URL
    },
    // Add more banks as needed
  ];
  const itemsPerColumn = Math.ceil(uzbekBanks.length / 3);
  return (
    <div style={{ padding: 16 }}>
      <div className="title">Справочник</div>
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
      <div>
        <span style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>
          Банки
        </span>
        {/* <List
          style={{ border: "1px solid red" }}
          grid={{ gutter: 16, column: 6 }}
          dataSource={uzbekBanks}
          itemLayout="horizontal"
          renderItem={(item) => (
            <List.Item>
              <List.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 12,
                  }}
                >
                  <img width="64" src={item.logo} alt={item.logo} />
                  {item.name}
                </div>
              </List.Item>
            </List.Item>
          )}
        /> */}
        <Row gutter={16}>
          {[0, 1, 2].map((colIndex) => (
            <Col key={colIndex} span={8}>
              <List
                dataSource={uzbekBanks.slice(
                  colIndex * itemsPerColumn,
                  (colIndex + 1) * itemsPerColumn
                )}
                renderItem={(item) => {
                  return (
                    <List.Item>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "center",
                          gap: 8,
                          marginTop: 12,
                        }}
                      >
                        <img
                          width="96"
                          height="72"
                          src={item.logo}
                          alt={item.logo}
                        />
                        <a href={item.link} target="_blank">{item.name}</a>
                        <div>55555</div>
                      </div>
                    </List.Item>
                  );
                }}
              />
            </Col>
          ))}
        </Row>
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
