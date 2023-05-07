import { Button, Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Created() {
  // navigate
  const navigate = useNavigate();
  // local Storage
  let accountHasLogin = JSON.parse(localStorage.getItem("accountHasLogin"));
  // state
  const [listPost, setListPost] = useState([]);
  const [listCreatedPostRender, setListCreatedPostRender] = useState([]);
  const [statusDisplay, setStatusDisplay] = useState("none");
  const [checkChangeOfPost, setCheckChangeOfPost] = useState(false);
  useEffect(() => {
    const handleGetPost = async () => {
      const data = await axios.get("http://localhost:8000/post");
      setListPost(data.data);
    };
    handleGetPost();
  }, [checkChangeOfPost]);
  useEffect(() => {
    const newListCreatedPostRender = [];
    for (let i = 0; i < listPost.length; i++) {
      if (accountHasLogin.id == listPost[i].idAuthor) {
        newListCreatedPostRender.push(listPost[i]);
      }
    }
    setListCreatedPostRender(newListCreatedPostRender);
  }, [listPost]);
  const handleChangeStatusWhenEnter = (e) => {
    setStatusDisplay(e);
  };
  const handleChangeStatusWhenLeave = () => {
    setStatusDisplay();
  };
  const handleDelete = async (e) => {
    console.log(e, "this is blog need to delete ?");
    await axios.delete(`http://localhost:8000/post/${e.id}`);
    setCheckChangeOfPost(!checkChangeOfPost);
  };
  const handleEdit = (e) => {
    console.log(e);
    navigate("/edit", { state: e });
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
        {/* {console.log(listCreatedPostRender, "<--- this is created post")} */}
        {listCreatedPostRender.map((element) => {
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
                justifyContent: "end",
                flexWrap: "wrap",
                alignContent: "end",
                padding: "0px",
              }}
              onMouseOver={() => handleChangeStatusWhenEnter(element.id)}
              onMouseLeave={handleChangeStatusWhenLeave}
              onClick={() => {
                navigate("/blogDetail", { state: element });
                return;
              }}
            >
              <div
                style={{
                  display: statusDisplay == element.id ? "flex" : "none",
                }}
              >
                <Button
                  shape="round"
                  style={{
                    height: "40px",

                    alignItems: "center",
                    backgroundColor: "red",
                    fontWeight: "400",
                    fontSize: "20px",
                    color: "white",
                    border: "1px solid red",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(element);
                  }}
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                </Button>
                <Button
                  shape="round"
                  style={{
                    height: "40px",
                    alignItems: "center",
                    backgroundColor: "red",
                    fontWeight: "400",
                    fontSize: "20px",
                    color: "white",
                    border: "1px solid red",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(element);
                  }}
                >
                  <span class="material-symbols-outlined">delete</span>
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
