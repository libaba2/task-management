import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "../../styles/menu/index.scss";

const { Header, Sider, Content } = Layout;
type propType = {
  menu?: any;
  children?: any;
  history?: any;
};

interface SiderModule {
  props: propType;
}

const SiderModule = (props: any) => {
  let navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    console.log(props, "props");
  }, []);
  const menuChange = (key: String) => {
    switch (key) {
      case "404":
        navigate("/404");
        break;
      case "home":
        navigate("/home");
        break;
      default:
        break;
    }
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout className="menu-warp">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["home"]}
          items={props.menu}
          onClick={({ key }) => menuChange(key)}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <div className="user-info-block">
            你好，蓝爸爸
            <span>退出</span>
          </div>
        </Header>
        <Content className="site-layout-content">
          {/* <Outlet /> */}
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SiderModule;
