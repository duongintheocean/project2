import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
export default function Saved() {
  // navigate
  const navigate = useNavigate();
  // localStorage
  let accountHasLogin = JSON.parse(localStorage.getItem("accountHasLogin"));
  // state
  const [listBlogNeedRender, setListBlogNeedRender] = useState([]);
  const [listPost, setListPost] = useState([]);
  const [statusDisplay, setStatusDisplay] = useState("");

  //function

  useEffect(() => {
    const handleTakeListPost = async () => {
      const data = await axios.get("http://localhost:8000/post");
      const newListPost = data.data;
      setListPost(newListPost);
    };
    handleTakeListPost();
  }, []);
  const handleSetListBlogNeedRender = () => {
    const newListBlogNeedRender = [];
    for (let i = 0; i < accountHasLogin.postSavedId.length; i++) {
      for (let j = 0; j < listPost.length; j++) {
        if (accountHasLogin.postSavedId[i] == listPost[j].id) {
          newListBlogNeedRender.push(listPost[j]);
        }
      }
    }
    setListBlogNeedRender(newListBlogNeedRender);
  };
  useEffect(() => {
    handleSetListBlogNeedRender();
  }, [listPost]);
  const handleChangeStatusWhenEnter = (e) => {
    setStatusDisplay(e);
  };
  const handleChangeStatusWhenLeave = () => {
    setStatusDisplay("");
  };
  const handleRemove = async (e) => {
    console.log(e, "<--- this is e");
    for (let i = 0; i < accountHasLogin.postSavedId.length; i++) {
      if (e.id == accountHasLogin.postSavedId[i]) {
        accountHasLogin.postSavedId.splice(i, 1);
        localStorage.setItem(
          "accountHasLogin",
          JSON.stringify(accountHasLogin)
        );
        await axios.put(
          `http://localhost:8000/users/${accountHasLogin.id}`,
          accountHasLogin
        );
      }
    }
    handleSetListBlogNeedRender();
    // console.log(e, "<-- this is e");
  };
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto ",
          marginTop: "20px",
          marginLeft: "80px",
        }}
      >
        {listBlogNeedRender.length != 0 &&
          listBlogNeedRender.map((element) => {
            return (
              <Card
                hoverable
                style={{
                  width: "240px",
                  backgroundImage: `url(${element.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                  backgroundRepeat: "no-repeat",
                  height: "auto",
                  minHeight: "300px",
                  maxHeight: "400px",
                  display: "flex",
                  margin: "5px",
                  justifyContent: "end",
                  outline: "none",
                }}
                onMouseOver={() => handleChangeStatusWhenEnter(element.id)}
                onMouseLeave={handleChangeStatusWhenLeave}
                onClick={() => {
                  navigate("/blogDetail", { state: element });
                  return;
                }}
              >
                <Button
                  shape="round"
                  style={{
                    display: statusDisplay == element.id ? "block" : "none",
                    height: "40px",
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
                    outline: "none",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(element);
                  }}
                >
                  remove
                </Button>
              </Card>
            );
          })}
      </div>
    </>
  );
}
