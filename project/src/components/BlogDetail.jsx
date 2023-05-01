import React from "react";
import { useParams } from "react-router-dom";
export default function BlogDetail() {
  const myParams = useParams();
  console.log(myParams);
  return <div>BlogDetail</div>;
}
