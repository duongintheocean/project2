import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Blog from "./Blog";
export default function Search() {
  // location
  const location = useLocation();
  console.log(location.state, "<-- this is location.state");

  // const history = useHistory();
  // state
  const [resultOfSearch, setResultOfSearch] = useState();
  const [listPost, setListPost] = useState([]);
  // const [firstComponentState, setFirstComponentState] = useState;

  // function

  useEffect(() => {
    const handleGetApi = async () => {
      const newListPost = await axios.get("http://localhost:8000/post");

      setListPost(newListPost.data);
    };
    handleGetApi();
  }, [location.state]);
  useEffect(() => {
    console.log(listPost, "<--this is listpost");
    const newResultOfSearch = listPost?.filter((post) =>
      post.title?.toLowerCase().includes(location.state?.toLowerCase())
    );
    console.log(newResultOfSearch, "this is new result of search");
    setResultOfSearch(newResultOfSearch);
  }, [listPost]);
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          width: "80%",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
        }}
      >
        {resultOfSearch?.map((blog) => {
          return <Blog atr={blog} />;
        })}
      </div>
    </div>
  );
}
