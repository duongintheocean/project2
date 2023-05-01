import React, { useState } from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import BlogDetail from "./BlogDetail";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Divider, Radio, Space } from "antd";

const { Meta } = Card;
export default function Blog(props) {
  console.log(props, "<--- this is props in blog");
  const [statusDisplay, setStatusDisplay] = useState("none");
  const handleChangeStatusWhenEnter = () => {
    setStatusDisplay("flex");
  };
  const handleChangeStatusWhenLeave = () => {
    setStatusDisplay("none");
  };
  return (
    <>
      <Card
        hoverable
        style={{
          width: "240px",
          height: "250px",
          backgroundImage: `url(${props.atr.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          margin: "5px",
          justifyContent: "end",
        }}
        onMouseEnter={handleChangeStatusWhenEnter}
        onMouseLeave={handleChangeStatusWhenLeave}
      >
        <Button
          shape="round"
          style={{
            height: "40px",
            display: statusDisplay,
            alignItems: "center",
            backgroundColor: "red",
            fontWeight: "400",
            fontSize: "20px",
            color: "white",
            position: "absolute",
            right: "5px",
            top: "5px",
            opacity: "0.8",
            border: "1px solid red",
          }}
        >
          save
        </Button>
      </Card>
    </>
  );
}
