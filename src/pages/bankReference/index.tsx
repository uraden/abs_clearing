import { Select } from "antd";
import { useEffect, useState } from "react";
import { getBankDirectory } from "./request";

const BankReference = () => {
  const [bankDirectory, setBankDirectory] = useState([]);
  const [selectedBank, setSelectedBank] = useState()
  const fetchOperdays = async () => {
    const response = await getBankDirectory();
    setBankDirectory(response);
  };

  useEffect(() => {
    fetchOperdays();
    // dispatch(fetchGlobalDate());
  }, []);

  console.log('res', bankDirectory)

  // const uzbekBanks = [
  //   {
  //     name: "TBC Bank",
  //     logo: "https://bank.uz/upload/iblock/cd2/jiu1lgfj0gw2zg1039uf777hn84w8vyh.png",
  //     link: "https://tbcbank.uz/ru", // Replace with actual logo URL
  //   },
  //   {
  //     name: "Tenge Bank",
  //     logo: "https://bank.uz/upload/iblock/fd4/fd4bbdb0520d964cf262b7b05afde963.png",
  //     link: "https://tengebank.uz/ru", // Replace with actual logo URL// Replace with actual logo URL
  //   },
  //   {
  //     name: "Узпромстройбанк",
  //     logo: "https://bank.uz/upload/iblock/77c/77c45647ef172e1d350fa351030e56a9.png",
  //     link: "https://sqb.uz/uz/individuals/", // Replace with actual logo URL// Replace with actual logo URL
  //   },
  //   {
  //     name: "Асакабанк",
  //     link: "https://www.asakabank.uz/", // Replace with actual logo URL
  //     logo: "https://bank.uz/upload/iblock/6a8/6a86cc944a81c1ecfce6e153bc548980.PNG", // Replace with actual logo URL
  //   },
  //   {
  //     name: "Asia Alliance Bank",
  //     link: "https://aab.uz/uz/", // Replace with actual logo URL
  //     logo: "https://bank.uz/upload/iblock/b0f/onbsgs8k5pr9e1kl9woo7wl35sqbucrw.png", // Replace with actual logo URL
  //   },
  //   {
  //     name: "Garant bank",
  //     link: "https://garantbank.uz/ru", // Replace with actual logo URL
  //     logo: "https://bank.uz/upload/iblock/571/13iv5iy7p5h9xcwucdxp1xefzalk8l73.jpg", // Replace with actual logo URL
  //   },
  //   {
  //     name: "Турон банк",
  //     link: "https://turonbank.uz/ru/", // Replace with actual logo URL
  //     logo: "https://bank.uz/upload/iblock/3fe/3fe21780f63f50e780106ccc10c7a9f1.PNG", // Replace with actual logo URL
  //   },
  //   {
  //     name: "Xalq Banki",
  //     link: "https://xb.uz/", // Replace with actual logo URL
  //     logo: "https://nbu.uz/local/templates/nbu/img/logonewyear.png", // Replace with actual logo URL
  //   },
  //   {
  //     name: "Капиталбанк",
  //     link: "https://www.kapitalbank.uz/uz/welcome.php", // Replace with actual logo URL
  //     logo: "https://pultop.uz/wp-content/uploads/2019/01/kapitalbank-uzbekistan-1.png", // Replace with actual logo URL
  //   },
  //   {
  //     name: "Uzum Bank",
  //     link: "https://uzumbank.uz/ru", // Replace with actual logo URL
  //     logo: "https://uzumbank.uz/_nuxt/img/uzumbank-logo-light.f4c13a0.svg", // Replace with actual logo URL
  //   },
  //   // Add more banks as needed
  // ];

  // const itemsPerColumn = Math.ceil(uzbekBanks.length / 3);

  console.log("fdsafdsaf", bankDirectory);

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  
  return (
    <div>
      <div className="title">Справочник банков</div>
      <div>
        <div  style={{display: 'flex', justifyContent: 'center', marginBottom: '50px', paddingBottom: '64px'}}>
        <Select
            allowClear
            showSearch
            placeholder="Выберите код назначения"
            optionFilterProp="children"
            onChange={(value) => setSelectedBank(value)}
            onSearch={onSearch}
            filterOption={filterOption}
            value={selectedBank}
            // @ts-expect-error try
            options={bankDirectory.map((purpose: IPurpose) => ({
              label: `${purpose.mfo} - ${purpose.name}`,
              value: purpose.mfo,
            }))}
            style={{ width: "80%", display: "flex" }}
          />
        </div>
        {/* <div style={{display: 'flex', justifyContent: 'center'}}>
        <Row gutter={16} style={{width: '80%'}}>
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
                        <a href={item.link} target="_blank">
                          {item.name}
                        </a>
                        <div>55555</div>
                      </div>
                    </List.Item>
                  );
                }}
              />
            </Col>
          ))}
        </Row>
        </div> */}
      </div>
    </div>
  );
};

export default BankReference;
