import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Edit() {
  const [valueImage, setValueImage] = useState();
  const [statusImg, setStatusImg] = useState("inline-block");
  const [statusOfInput, setStatusInput] = useState("none");
  const [valueTitle, setValueTitle] = useState();
  const [valueBlogContent, setValueBlogContent] = useState();
  // location
  const location = useLocation();
  //function
  useEffect(() => {
    console.log(location.state, "<-- this is location.state");
    setValueImage(location.state.image);
    setValueTitle(location.state.title);
    setValueBlogContent(location.state.blogContent);
    setStatusImg("inline-block");
    setStatusInput("none");
  }, []);
  const handleDelete = () => {
    setValueImage("");
    setStatusImg("none");
    setStatusInput("block");
  };
  const handleTakeImgValue = (value) => {
    const file = value.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target.result;
      setValueImage(base64String);
    };
    reader.readAsDataURL(file);
    if (!value.target.value) {
      setStatusImg("none");
      setStatusInput("inline-block");
    } else {
      setStatusImg("inline-block");
      setStatusInput("none");
    }
  };
  const handleEditContent = (value) => {
    setValueBlogContent(value.target.value);
  };
  const handleEditTiltle = (value) => {
    setValueTitle(value.target.value);
  };
  const handleSave = async () => {
    console.log("does it run into save");
    console.log(location.state.id);
    const newBlog = {
      blogContent: valueBlogContent,
      title: valueTitle,
      image: valueImage,
    };
    await axios.patch(
      `http://localhost:8000/post/${location.state.id}`,
      newBlog
    );
  };
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "rgb(233,233,233)",
        height: "800px",
        paddingTop: "100px",
        marginTop: "-40px",
      }}
    >
      <div
        style={{
          width: "60%",
          boxSizing: "border-box",
          backgroundColor: " rgb(233,233,233)",
          height: "600px",
          margin: "0 auto",
          textAlign: "center",
          backgroundColor: "white",
          borderRadius: "5%",
          display: "flex",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              textAlign: "center",
              lineHeight: "100px",
              width: "100%",
              height: "500px",
              color: "#fff",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              marginTop: "10px",
              border: "1px dashed black",
              alignIteam: "center",
              padding: "10px",
              borderRadius: "5%",
              margin: "25px",
            }}
          >
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
                width: "100%",
                height: "500px",
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
                objectFit: "contain",
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
          </div>
          <Button
            type="primary"
            style={{
              width: "100%",
              borderRadius: "50px",
              backgroundColor: "white",
              color: "black",
              fontSize: "18px",
              height: "50px",
              marginTop: "-15px",
              marginLeft: "28px",
            }}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
        <div
          style={{
            flex: 3,
            margin: "25px",
            paddingLeft: "15px",
          }}
        >
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
            value={valueTitle}
            className="titleInput"
            placeholder="FIX TITLE"
            onChange={handleEditTiltle}
          />
          <p style={{ marginBottom: "50px", textAlign: "end" }}></p>
          <textarea
            name="blogContent"
            id=""
            cols="30"
            rows="10"
            placeholder="fix your content"
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
            value={valueBlogContent}
            onChange={handleEditContent}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
