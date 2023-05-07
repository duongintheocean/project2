import { Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AnotherCreated() {
  //state
  const [listPost, setListPost] = useState();
  const [listCreated, setListCreated] = useState();
  // navigate
  const navigate = useNavigate();
  const anotherCreated = sessionStorage.getItem("anotherCreated");
  useEffect(() => {
    const handleTakePost = async () => {
      const newListPost = await axios.get("http://localhost:8000/post");
      setListPost(newListPost.data);
    };
    handleTakePost();
  }, [anotherCreated]);
  useEffect(() => {
    console.log(listPost, "<-- this is list post");
    const newListCreated = listPost?.filter(
      (e) => e.idAuthor == anotherCreated
    );
    setListCreated(newListCreated);
  }, [listPost]);
  return (
    <div>
      <div
        style={{
          margin: "20px",
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
        }}
      >
        {console.log(listCreated, "<-- this is list created")}
        {listCreated?.map((element) => (
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
