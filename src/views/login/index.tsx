import "../../styles/login/index.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import { Row, Col, Card, Form, Input, Button, Space,message } from "antd";
import * as Api from '../../api/index'
interface isState {
  title: String;
  phone: String;
  userName: String;
  passWord: String;
  emailCode: String;
}
interface loginForm {
  username: String;
  password: String;
  smsCode: String;
}
// Component<P,S,SS> 泛型P:参数props，泛型S:状态state，泛型SS:updater和虚拟dom更新相关
const Login = (props: any) => {
  let navigate = useNavigate();
  const [smsCode, setSmsCode] = useState("");

  useEffect(() => {    
    getCode();
  },[]);

  const topage = () => {
    navigate("/home");
  };
  // 提交表单
  const onFinish = (values: loginForm) => {
    if(values.smsCode !== smsCode){
      message.warning("smsCode error!")
      return getCode()
    }
    Api.login({phone:'17623010185',password:'123123'}).then(res=>{
      if(res.data.length){
        message.success('Login success!');
        topage()
      }else{
        message.error('Login fail!');
      }
    }) 
    
  };
  // 提交表单且数据验证失败后回调事件
  const onFinishFailed = (values:any) => {
    console.log(values,'valuse');
  };
  const getCode = () => {
    setSmsCode(parseInt(Math.random() * 100000 + "") + "");
  };

  return (
    <div className="login-warp">
      <Row align="middle">
        <Col span={14}>
          <h1>Task</h1>
          <h3>Complete the task -- 基于 React + Ts平台开发的管理系统</h3>
        </Col>
        <Col span={10}>
          <Card title="登入Complete The Task后台" className="login-card">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                labelAlign="left"
                labelCol={{
                  span: 6,
                }}
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                labelAlign="left"
                labelCol={{
                  span: 6,
                }}
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="SmsCode"
                name="smsCode"
                labelAlign="left"
                labelCol={{
                  span: 6,
                }}
                rules={[
                  { required: true, message: "Please input your smsCode!" },
                ]}
              >
                <Space>
                  <Input />
                  <div onClick={() => getCode()} className="sms-code">{smsCode}</div>
                </Space>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Button type="primary" htmlType="submit" className="submit-btn">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
