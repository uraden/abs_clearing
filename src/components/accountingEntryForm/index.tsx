import React, {useState} from "react";
import { Button, DatePicker, Form, Input, Select, Divider } from "antd";

const AccountingEntryForm: React.FC = () => {
  
 const [role, setRole] = useState(1)


 const onFinish = (values: unknown) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: unknown) => {
  console.log('Failed:', errorInfo);
};

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{border: "1px solid #808080", padding:"10px", borderRadius:"10px"}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="inline">
          <Form.Item label="Дата документа">
          <DatePicker/>
            </Form.Item>
            <Form.Item label="№ документа">
              <Input  />
            </Form.Item>
        </div>

        <Divider />

        <div className="inline" style={{display: "inline" }}>
          
          {role === 2 ? (
            <Form.Item 
            label="Счет плательщика"
            rules={[{ required: true, message: 'Пожалуйста выберете счет плательшика' }]}
            name="accountInvoice"
            >
            <Select style={{ width: "100px" }}>
              <Select.Option 
              value="demo"
              
              >Demo</Select.Option>
            </Select>
          </Form.Item>
          ):(
            <Form.Item 
            label="Счет плательщика"
            rules={[{ required: true, message: 'Пожалуйста выберете счет плательшика' }]}
            name="accountInvoice"
            >
            <Input />
          </Form.Item>
          )}
          

         

          <Form.Item 
            label="ИНН"
            rules={[{ required: true, message: 'Пожалуста выберете ИНН' }]}
            name="inn"
          >
            <Input />
          </Form.Item>

         
        </div>
        <br />
        <div className="inline">
          <Form.Item label="Банк">
            <Input />
          </Form.Item>

          <Form.Item 
            label="МФО Банка"
            rules={[{ required: true, message: 'Пожалуста выберете МФО Банка' }]}
            name="bankCode"
            >
            <Input />
          </Form.Item>
        </div>

        <Divider />

        <h3> Сумма не указана</h3>

        <Divider />

        <div className="inline">
          
          {role == 2 ? (
            <Form.Item 
            label="Счет получателя"
            rules={[{ required: true, message: 'Пожалуста выберете cчет получателя' }]}
            name="accountInvoiceReceiver"
            >
            <Select style={{ width: "100px" }}>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          ) : ( 
          <Form.Item 
          label="Счет получателя"
          rules={[{ required: true, message: 'Пожалуста выберете cчет получателя' }]}
          name="accountInvoiceReceiver"
          >
          <Input />
          </Form.Item>
          )}
          

         

          <Form.Item 
            label="ИНН"
            rules={[{ required: true, message: 'Пожалуста выберете ИНН' }]}
            name="inn"
            >
            <Input />
          </Form.Item>

        
        </div>
        <br />
        <div className="inline">
          <Form.Item label="Банк">
            <Input />
          </Form.Item>

          <Form.Item 
          label="МФО Банка"
          rules={[{ required: true, message: 'Пожалуста выберете МФО Банка' }]}
          name="bankCode"
          >
            <Input />
          </Form.Item>
        </div>

        <Divider />

        <div className="inline">
          

          <Form.Item label="платеж">
            <Select style={{ width: "100px" }}>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>


          <Form.Item label="Детали платежа">
          <Input />
          </Form.Item>
        </div>

        <Divider />

        <div className="inline">
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{outline: 'none'  }}>Сократить</Button>
          </Form.Item>

          <Form.Item>
            <Button style={{outline: 'none'}}>Загрузить</Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default () => <AccountingEntryForm />;
