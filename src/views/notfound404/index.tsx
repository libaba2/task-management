import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";

const NotFound = (props: any) => {
  let navigate = useNavigate();
  const topageHome = () => {
    navigate("/");
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => topageHome()}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
