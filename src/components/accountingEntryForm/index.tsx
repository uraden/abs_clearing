import React from "react";
import { Button, DatePicker, Form, Input, Select, Divider } from "antd";

const { RangePicker } = DatePicker;
const AccountingEntryForm: React.FC = () => {
  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{border: "1px solid #808080", padding:"10px", borderRadius:"10px"}}
      >
        <Form layout="inline">
          <Form.Item label="№ Док">
            <Input  />
          </Form.Item>
          <Form.Item label="дата док / дата потверждение">
            <RangePicker />
          </Form.Item>
        </Form>

        <Divider />

        <Form layout="inline">
          <Form.Item label="Счет плательщика">
            <Select style={{ width: "100px" }}>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Input />
          </Form.Item>

          <Form.Item label="ИНН/ПИНФЛ">
            <Input />
          </Form.Item>

          <Form.Item>
            <Input />
          </Form.Item>
        </Form>
        <br />
        <Form layout="inline">
          <Form.Item label="Банк">
            <Input />
          </Form.Item>

          <Form.Item label="Код Банка">
            <Input />
          </Form.Item>
        </Form>

        <Divider />

        <h3> Сумма не указана</h3>

        <Divider />

        <Form layout="inline">
          <Form.Item label="Счет получателя">
            <Select style={{ width: "100px" }}>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Input />
          </Form.Item>

          <Form.Item label="ИНН/ПИНФЛ">
            <Input />
          </Form.Item>

          <Form.Item>
            <Input />
          </Form.Item>
        </Form>
        <br />
        <Form layout="inline">
          <Form.Item label="Банк">
            <Input />
          </Form.Item>

          <Form.Item label="Код Банка">
            <Input />
          </Form.Item>
        </Form>

        <Divider />

        <Form layout="inline">
          

          <Form.Item label="платеж">
            <Select style={{ width: "100px" }}>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>


          <Form.Item label="Детали платежа">
          <Input />
          </Form.Item>
        </Form>

        <Divider />

        <Form layout="inline">
          <Form.Item>
            <Button>Сократить</Button>
          </Form.Item>

          <Form.Item>
            <Button>Загрузить</Button>
          </Form.Item>
        </Form>
      </Form>
    </>
  );
};

export default () => <AccountingEntryForm />;
