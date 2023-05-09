import React, { useEffect } from "react";

import { Button, Card } from "antd";
import { Layout, Space } from "antd";
import { useState } from "react";
import "../css/blogcretor.css";
import axios from "axios";

const { Header, Sider } = Layout;
const headerStyle = {
  textAlign: "center",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "white",
};

const siderStyle = {
  textAlign: "center",
  lineHeight: "100px",
  height: "500px",
  color: "#fff",
  backgroundColor: "white",
  display: "flex",
  alignContent: "center",
  marginTop: "10px",
  border: "1px dashed black",
  alignIteam: "center",
  padding: "10px",
  borderRadius: "5%",
};

export default function BlogCreate() {
  // handle localStorage
  let accountHasLogin = JSON.parse(localStorage.getItem("accountHasLogin"));
  //state
  const [valueImage, setValueImage] = useState();
  const [statusImg, setStatusImg] = useState("none");
  const [statusOfInput, setStatusInput] = useState("inline-block");
  //state take value user input
  const [valueInput, setValueInput] = useState({
    title: "",
    blogContent: "",
  });
  const [blog, setBlog] = useState();
  //function
  const handleDelete = () => {
    setValueImage("");
    setStatusImg("none");
    setStatusInput("block");
  };
  useEffect(() => {
    if (!valueInput.title && !valueInput.blogContent) {
      return;
    } else {
      const handlePostToApi = async () => {
        await axios.post("http://localhost:8000/post", blog);
      };
      handlePostToApi();
      const handlePatchToApi = async () => {
        const newCreatedList = [...accountHasLogin.postCreatedId];
        newCreatedList.push(blog.id);
        const updateCreated = { postCreatedId: newCreatedList };
        // updateCreated.push(blog.id);
        await axios.patch(
          `http://localhost:8000/users/${accountHasLogin.id}`,
          updateCreated
        );
      };
      handlePatchToApi();
      handleDelete();
      setValueInput({
        title: "",
        blogContent: "",
      });
    }
  }, [blog]);

  const handleTakeTextValue = (e) => {
    let newValueInput = { ...valueInput, [e.target.name]: e.target.value };
    setValueInput(newValueInput);
  };
  const handleTakeImgValue = (value) => {
    const file = value.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target.result;
      setValueImage(base64String);
      console.log(base64String, "my base64");
    };
    reader.readAsDataURL(file);
    if (!value.target.value) {
      setStatusImg("none");
      setStatusInput("inline-block");
    } else {
      setStatusImg("block");
      setStatusInput("none");
    }
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (accountHasLogin == null) {
      return alert("you need login for upload your post");
    }
    if (accountHasLogin == "") {
      return alert("you need login for upload your post");
    } else {
      // console.log(accountHasLogin, "<--- this is account has login");
      const newBlog = {
        ...valueInput,
        idAuthor: accountHasLogin.id,
        image: valueImage,
      };
      setBlog(newBlog);
      alert("post successfull");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "rgb(233,233,233)",
        display: "flex",
        justifyContent: "center",
        marginTop: "-46px",
        height: "800px",
        border: "none",
        objectFit: "fill",
      }}
    >
      <Space style={{ backgroundColor: "rgb(233,233,233)" }}>
        <Card
          style={{
            width: "60rem",
            height: "700px",
            borderRadius: "3%",
            paddingTop: "10px",
            paddingLeft: "30px",
            paddingRight: "30px",
          }}
        >
          <Space
            direction="vertical"
            style={{ width: "100%", backgroundColor: "white" }}
            size={[0, 48]}
          >
            <Layout
              style={{
                width: "100%",
                height: "80vh",
                backgroundColor: "white",
              }}
            >
              <div style={{ backgroundColor: "white" }}>
                <Sider style={siderStyle}>
                  <input
                    type="file"
                    name=""
                    id=""
                    style={{
                      display: statusOfInput,
                      background: "linear-gradient(top, #f9f9f9, #e3e3e3)",
                      border: "1px solid #999",
                      borderRadius: "3px",
                      outline: "none",
                      whiteSpace: "nowrap",
                      WebkitUserSelect: "none",
                      cursor: "pointer",
                      textShadow: "1px 1px #fff",
                      fontWeight: 700,
                      fontSize: "10pt",
                      width: "100%",
                      height: "66vh",
                      border: "none",
                    }}
                    onChange={handleTakeImgValue}
                  />
                  <img
                    src={valueImage}
                    style={{
                      display: statusImg,
                      width: "100%",
                      borderRadius: "5%",
                    }}
                    alt=""
                  />
                  <Button
                    style={{
                      width: "100%",
                      display: statusImg,
                      marginTop: "10px",
                    }}
                    onClick={handleDelete}
                  >
                    delete
                  </Button>
                </Sider>
                <Button
                  type="primary"
                  style={{
                    width: "100%",
                    borderRadius: "50px",
                    backgroundColor: "white",
                    color: "black",
                    fontSize: "18px",
                    height: "50px",
                    marginTop: "20px",
                  }}
                  onClick={handlePost}
                >
                  Post
                </Button>
              </div>
              <Layout
                style={{
                  padding: "10px",
                  width: "65%",
                  backgroundColor: "white",
                }}
              >
                <Header style={headerStyle}>
                  <textarea
                    name="title"
                    type="text"
                    style={{
                      width: "100%",
                      border: "none",
                      height: "75px",
                      outline: "none",
                      borderBottom: "3px solid black",
                      fontSize: "35px",
                      resize: "none",
                    }}
                    value={valueInput.title}
                    className="titleInput"
                    placeholder="FILL TITLE"
                    onChange={handleTakeTextValue}
                  />
                  <p style={{ marginBottom: "50px", textAlign: "end" }}></p>
                  <textarea
                    name="blogContent"
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="fill your blog"
                    style={{
                      width: "100%",
                      border: "none",
                      height: "auto",
                      maxHeight: "300px",
                      fontSize: "20px",
                      outline: "none",
                      borderBottom: "1px solid black",
                      resize: "none",
                      overflow: " hidden",
                    }}
                    onChange={handleTakeTextValue}
                    value={valueInput.blogContent}
                  ></textarea>
                </Header>
              </Layout>
            </Layout>
          </Space>
        </Card>
      </Space>
    </div>
  );
}
