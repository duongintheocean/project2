import { Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AnotherSaved() {
  // state
  const [listBlog, setListBlog] = useState();
  const [listSaved, setListSaved] = useState();
  // sessionStorage
  const saved = sessionStorage.getItem("anotherSaved");
  // navigate
  const navigate = useNavigate();
  useEffect(() => {
    const handleTakeListBlog = async () => {
      const newListBlog = await axios.get("http://localhost:8000/post");
      setListBlog(newListBlog.data);
    };
    handleTakeListBlog();
  }, [saved]);
  useEffect(() => {
    const handleTakeListSaved = () => {
      const newListSaved = [];
      console.log(listBlog, "<--- this is listblog");
      console.log(saved, "<--- this is saved");
      if (saved != undefined && listBlog != undefined) {
        for (let i = 0; i < saved.length; i++) {
          for (let j = 0; j < listBlog.length; j++) {
            if (saved[i] == listBlog[j].id) {
              newListSaved.push(listBlog[j]);
              break;
            }
          }
        }
      }

      setListSaved(newListSaved);
    };
    handleTakeListSaved();
  }, [listBlog]);

  return (
    <div>
      <div
        style={{
          margin: "20px",
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
        }}
      >
        {console.log(listSaved, "this is listSaved")}
        {listSaved?.map((element) => (
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
            onClick={() => {
              navigate("/blogDetail", { state: element });
              return;
            }}
          ></Card>
        ))}
      </div>
    </div>
  );
}
