import React, {useState} from "react";
import { Button, DatePicker, Form, Input, Select, Divider } from "antd";

const { RangePicker } = DatePicker;
const AccountingEntryForm: React.FC = () => {
  
 const [role, setRole] = useState(1)

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{border: "1px solid #808080", padding:"10px", borderRadius:"10px"}}
      >
        <Form layout="inline">
        <Form.Item label="Дата док">
        <DatePicker />
          </Form.Item>
          <Form.Item label="№ Док">
            <Input  />
          </Form.Item>
        </Form>

        <Divider />

        <Form layout="inline">
          
          {role === 2 ? (
            <Form.Item label="Счет плательщика">
            <Select style={{ width: "100px" }}>
              <Select.Option 
              value="demo"
              rules={[{ required: true, message: 'Пожалуйста выберете счет плательшика' }]}
              >Demo</Select.Option>
            </Select>
          </Form.Item>
          ):(
            <Form.Item 
            label="Счет плательщика"
            rules={[{ required: true, message: 'Пожалуйста выберете счет плательшика' }]}
            >
            <Input />
          </Form.Item>
          )}
          

         

          <Form.Item 
            label="ИНН"
            rules={[{ required: true, message: 'Пожалуста выберете ИНН' }]}
          >
            <Input />
          </Form.Item>

         
        </Form>
        <br />
        <Form layout="inline">
          <Form.Item label="Банк">
            <Input />
          </Form.Item>

          <Form.Item 
            label="МФО Банка"
            rules={[{ required: true, message: 'Пожалуста выберете МФО Банка' }]}
            >
            <Input />
          </Form.Item>
        </Form>

        <Divider />

        <h3> Сумма не указана</h3>

        <Divider />

        <Form layout="inline">
          
          {role == 2 ? (
            <Form.Item 
            label="Счет получателя"
            rules={[{ required: true, message: 'Пожалуста выберете cчет получателя' }]}
            >
            <Select style={{ width: "100px" }}>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          ) : ( 
          <Form.Item 
          label="Счет получателя"
          rules={[{ required: true, message: 'Пожалуста выберете cчет получателя' }]}
          >
          <Input />
        </Form.Item>
        )}
          

         

          <Form.Item 
            label="ИНН"
            rules={[{ required: true, message: 'Пожалуста выберете ИНН' }]}
            >
            <Input />
          </Form.Item>

        
        </Form>
        <br />
        <Form layout="inline">
          <Form.Item label="Банк">
            <Input />
          </Form.Item>

          <Form.Item 
          label="МФО Банка"
          rules={[{ required: true, message: 'Пожалуста выберете МФО Банка' }]}
          >
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
