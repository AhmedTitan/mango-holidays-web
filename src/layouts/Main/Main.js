import React, { useState } from "react";

import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const Main = (props) => {
  const { children } = props;

  return (
      <Layout style={{height:'100%'}}>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0, backgroundColor: '#630059' }}
        />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
  );
};

export default Main;
