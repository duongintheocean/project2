import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import axios from "axios";
export default function Home() {
  const [listProduct, setListProduct] = useState([]);
  useEffect(() => {
    const handleTakeProductData = async () => {
      const newListProduct = await axios.get("http://localhost:8000/post");
      console.log(newListProduct, "<--- this is list product");
      setListProduct(newListProduct.data);
    };
    handleTakeProductData();
  }, []);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto auto",
        color: "black",
        marginLeft: "80px",
        rowGap: "10px",
        columnGap: "10px",
        marginTop: "15px",
      }}
    >
      {listProduct.map((blog) => {
        return <Blog atr={blog} />;
      })}
    </div>
  );
}
