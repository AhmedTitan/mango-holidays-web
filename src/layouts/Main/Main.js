import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Radio } from "antd";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const Main = (props) => {
  const [toekn, setToekn] = useState();
  useEffect(() => {
    setToekn(localStorage.getItem("JWT"));
  });
  const { children } = props;

  const handleLogOut = () => {
    localStorage.removeItem("JWT");
    setToekn(null);
  };

  const history = useHistory();
  const redirectPage = (path) => {
    history.push(path);
  };

  return (
    <Layout style={{ height: "120%" }}>
      <Header
        className="site-layout-sub-header-background"
        style={{ padding: 0, backgroundColor: "#630059" }}
      >
        <Button
            onClick={() => redirectPage(`/home`)}
            type="primary"
            shape="round"
            icon={<HomeOutlined />}
            size="medium"
            danger
          >
            Home
          </Button>
        {!toekn ? (
          <>
            <Button
              onClick={() => redirectPage(`/signin`)}
              type="primary"
              shape="round"
              icon={<UserOutlined />}
              size="medium"
            >
              Sign In
            </Button>
            <Button
              onClick={() => redirectPage(`/signup`)}
              type="primary"
              shape="round"
              icon={<UserOutlined />}
              size="medium"
            >
              Sign up
            </Button>
          </>
        ) : (
          <Button
            onClick={handleLogOut}
            type="primary"
            shape="round"
            icon={<UserOutlined />}
            size="medium"
          >
            Log Out
          </Button>
        )}
      </Header>
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
