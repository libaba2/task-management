import React from "react";
import { useEffect, useState } from "react";
import { Button, Carousel, Col, Card, Row, Modal, Form, Input } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import "../../styles/home/index.scss";
import { Link } from "react-router-dom";

interface card {
  id: Number;
  title: String;
  desc: String;
  status?: any;
  createtime?: String;
}
interface status {
  code: Number;
  title?: String;
}
const lists = [
  {
    id: 1,
    title: "标题1",
    desc: "这是描述这是描述这是描述这是描述这是描述这是描述",
    status: 1,
    createtime: "2022-11-02 12:22:10",
  },
  {
    id: 2,
    title: "标题2",
    desc: "这是描述这是描述这是描述这是描述这是描述这是描述",
    status: 2,
    createtime: "2022-11-02 12:22:10",
  },
  {
    id: 3,
    title: "标题3",
    desc: "这是描述这是描述这是描述这是描述这是描述这是描述",
    status: 3,
    createtime: "2022-11-02 12:22:10",
  },
  {
    id: 4,
    title: "标题4",
    desc: "这是描述这是描述这是描述这是描述这是描述这是描述",
    status: 2,
    createtime: "2022-11-02 12:22:10",
  },
];

const Homeplace = (props: any) => {
  const [listData, setListData] = useState<Array<card>>([]);
  const [tasksData, setTasksData] = useState<Array<Array<card>>>([]);
  const [outTaskStatus, setOutTaskStatus] = useState<Array<status>>([]);
  const [isShowModal, setShowModal] = useState(false);
  useEffect(() => {
    setListData(lists);
    setTasksData([
      [...listData.filter((item) => item.status === 1)],
      [...listData.filter((item) => item.status === 2)],
      [...listData.filter((item) => item.status === 3)],
    ]);
    setOutTaskStatus([
      {
        code: 1,
        title: "TODO",
      },
      {
        code: 2,
        title: "DOING",
      },
      {
        code: 3,
        title: "DONE",
      },
    ]);
    setTimeout(() => {
      console.log(tasksData, "tasksData");
    }, 2000);
  }, [listData]);
  const getTaskByStatus = (status: Number) => {
    let resultDom = null;
    switch (status) {
      case 1:
        resultDom = <Button style={{ color: "red" }}>点击开始</Button>;
        break;
      case 2:
        resultDom = <Button style={{ color: "green" }}>点击完成</Button>;
        break;
      default:
        resultDom = <Button style={{ color: "blue" }}>查看详情</Button>;
        break;
    }
    return resultDom;
  };
  const getTaskCard = (data: card) => {
    return (
      <Card
        className="card-item"
        type="inner"
        title={data.title}
        extra={getTaskByStatus(data.status)}
      >
        <div>{data.desc}</div>
        <div className="card-item-time">{data?.createtime}</div>
      </Card>
    );
  };
  const openCloseFormModal = () => {
    setShowModal(!isShowModal);
  };
  return (
    <div className="home-warp">
      <Carousel className="carousel-warp" autoplay={true} dotPosition="right">
        {listData.map((item: any, index: any) => {
          return (
            <div className="list-item" key={index}>
              <div className="list-left">
                <div className="title">
                  <InfoCircleFilled className="title-icon" />
                  {item.title}
                </div>
                <div className="desc">{item.desc}</div>
              </div>
              <div className="list-right">
                <Button type="primary">查看详情</Button>
              </div>
            </div>
          );
        })}
      </Carousel>
      <Row className="task-card-list" justify="space-between">
        <Col span={6}>
          <Card
            title="ALL TASKS"
            extra={
              <Button type="primary" onClick={() => openCloseFormModal()}>
                新建任务
              </Button>
            }
          >
            {listData.map((item: any, index: any) => {
              return getTaskCard(item);
            })}
          </Card>
        </Col>
        {outTaskStatus.map((item, index) => {
          return (
            <Col span={5} key={index}>
              <Card title={item.title}>
                {tasksData[index].map((ite: any, idx: any) => {
                  return getTaskCard(ite);
                })}
              </Card>
            </Col>
          );
        })}
      </Row>
      <Modal
        visible={isShowModal}
        closable={false}
        onOk={() => openCloseFormModal()}
        onCancel={() => openCloseFormModal()}
      >
        <Form>
          <Form.Item>
            <Input></Input>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Homeplace;
