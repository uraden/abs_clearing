import React, {ReactNode, useState} from 'react';
import {
  TeamOutlined,
  UserOutlined,
  PieChartOutlined,
  DesktopOutlined,
  FileOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const Navbar: React.FC = ({ children }: { children: ReactNode }) => {

  const [collapsed, setCollapsed] = useState(false);
  const [men, setMen] = useState(false);
  const [marginLeft, setMarginLeft] = useState(false)
  const [withLayout, setWithLayout] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('Tom', '3'),
      getItem('Bill', '4'),
      getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
  ];


  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1
        }}
        collapsible collapsed={collapsed} onCollapse={(value) =>{
          setCollapsed(value)
          setMen(!men)
          console.log(`here ${!men}`)
          setMarginLeft(!marginLeft)
          setWithLayout(!withLayout)
          console.log('marginLeft', marginLeft)
        }}
      >
         <div className="demo-logo-vertical" />
         <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: marginLeft ? 88 : 200,  minHeight: '100vh', width: withLayout ? '94vw' : '88vw' }}>
        <Header style={{
          background: colorBgContainer,
          padding: 0,
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}/>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer, zIndex: "99" }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default Navbar;
