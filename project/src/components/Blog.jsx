import React, { useState } from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import axios from "axios";
export default function Blog(props) {
  let accountHasLogin = JSON.parse(localStorage.getItem("accountHasLogin"));
  // state
  const [statusDisplay, setStatusDisplay] = useState("none");

  //function
  const handleChangeStatusWhenEnter = () => {
    setStatusDisplay("flex");
  };
  const handleChangeStatusWhenLeave = () => {
    setStatusDisplay("none");
  };
  const navigate = useNavigate();
  const handleSavePost = async (event) => {
    event.stopPropagation();
    console.log(accountHasLogin, "this is account has login");
    console.log(props, "this í blog ??");
    if (accountHasLogin.postSavedId.indexOf(props.atr.id) == -1) {
      const newPostHasSaved = [...accountHasLogin.postSavedId];
      newPostHasSaved.push(props.atr.id);
      accountHasLogin = {
        ...accountHasLogin,
        postSavedId: newPostHasSaved,
      };
      localStorage.setItem("accountHasLogin", JSON.stringify(accountHasLogin));
      await axios.put(
        `http://localhost:8000/users/${accountHasLogin.id}`,
        accountHasLogin
      );
    } else {
      alert("this post has been save");
    }
  };
  return (
    <>
      <Card
        hoverable
        style={{
          width: "240px",

          backgroundImage: `url(${props.atr.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          height: "auto",
          minHeight: "300px",
          maxHeight: "400px",
          display: "flex",
          margin: "5px",
          justifyContent: "end",
        }}
        onMouseEnter={handleChangeStatusWhenEnter}
        onMouseLeave={handleChangeStatusWhenLeave}
        onClick={() => {
          navigate("/blogDetail", { state: props.atr });
          return;
        }}
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
          onClick={handleSavePost}
        >
          save
        </Button>
      </Card>
    </>
  );
}
