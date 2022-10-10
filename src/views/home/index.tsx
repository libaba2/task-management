import React from "react";
import { useEffect, useState } from "react";
import { Button, Carousel, Col, Card, Row, Modal, Form, Input } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import "../../styles/home/index.scss";
import * as Api from "../../api/index";
import store from '../../store';
interface card {
  id: Number;
  title: String;
  content: String;
  status?: any;
  createtime?: String;
  finished_time?: String;
  updated_time?: String;
}
interface status {
  code: Number;
  title?: String;
}

const Homeplace = (props: any) => {
  const [listData, setListData] = useState<Array<card>>([]);
  const [tasksData, setTasksData] = useState<Array<Array<card>>>([]);
  const [outTaskStatus, setOutTaskStatus] = useState<Array<status>>([]);
  const [isShowModal, setShowModal] = useState(false);
  const [taskForm] = Form.useForm();

  useEffect(() => {
    queryTaskInfos()
    setTasksData([
      [...listData.filter((item) => item.status === 0)],
      [...listData.filter((item) => item.status === 1)],
      [...listData.filter((item) => item.status === 2)],
    ]);
    setOutTaskStatus([
      {
        code: 0,
        title: "TODO",
      },
      {
        code: 1,
        title: "DOING",
      },
      {
        code: 2,
        title: "DONE",
      },
    ]);
    return ()=>{
      console.log('组件销毁！')
    }
  }, []);

  // 查询任务
  const queryTaskInfos = async () => {
    const response = await Api.queryTaskInfos();
    setListData(response.data)    
  };

  const onFinish = async () => {
    taskForm.validateFields().then( async values=>{
      const params = {
        ...values,
        'create_time': new Date().getFullYear()+'/'+new Date().getMonth()+'/'+new Date().getDate()+' '+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()
      }
      const response: any = await Api.addTaskInfo(params)
      if(response.success){
        openCloseFormModal()
        await queryTaskInfos()
      }
    }).catch(err => {
      console.error(err);
    })
    
    
  }

  // 根据任务状态获取操作按钮
  const getTaskByStatus = (status: Number) => {
    let resultDom = null;
    switch (status) {
      case 0:
        resultDom = (
          <Button style={{ color: "red" }} size="small">
            点击开始
          </Button>
        );
        break;
      case 1:
        resultDom = (
          <Button style={{ color: "green" }} size="small">
            点击完成
          </Button>
        );
        break;
      default:
        resultDom = (
          <Button style={{ color: "blue" }} size="small">
            查看详情
          </Button>
        );
        break;
    }
    return resultDom;
  };

  // 任务卡片
  const getTaskCard = (data: card) => {
    return (
      <Card
        className="card-item"
        type="inner"
        title={data.title}
        extra={getTaskByStatus(data.status)}
        key={data.id.toString()}
      >
        <div>{data.content}</div>
        <div className="card-item-time">{data?.createtime}</div>
      </Card>
    );
  };

  const openCloseFormModal = () => {
    store.dispatch({type: 'SET_REQLOADING', value: true})
    console.log(store.getState().loading,' store.getState().loading'); // true
    
    // setShowModal(!isShowModal);
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
                <div className="desc">{item.content}</div>
              </div>
              <div className="list-right">
                <Button type="primary" size="small">
                  查看详情
                </Button>
              </div>
            </div>
          );
        })}
      </Carousel>
      <Row className="task-card-list" justify="space-between">
        <Col span={6}>
          <Card
            title="ALL TASKS"
            bodyStyle={{
              height: "600px",
              "overflowY": "scroll",
            }}
            extra={
              <Button
                type="primary"
                onClick={() => openCloseFormModal()}
                size="small"
              >
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
        onOk={() => onFinish()}
        onCancel={() => openCloseFormModal()}
      >
        <Form size="small" name="taskForm" form={taskForm}>
          <Form.Item label="标题" name="title" rules={[
                  { required: true, message: "Please input your password!" },
                ]}>
            <Input/>
          </Form.Item>
          <Form.Item label="内容" name="content" rules={[
                  { required: true, message: "Please input your password!" },
                ]}>
            <Input/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Homeplace;
