import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Account() {
  //localStorage
  let accountHasLogin = JSON.parse(localStorage.getItem("accountHasLogin"));
  // state
  const [saveStatus, setSaveStatus] = useState("none");
  const [createStatus, setCreateStatus] = useState("none");
  //function
  const handleShowSaved = () => {
    setSaveStatus("3px solid black ");
    setCreateStatus("none");
  };
  const handleShowCreate = () => {
    setCreateStatus("3px solid black");
    setSaveStatus("none");
  };
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          width: "40%",
          margin: "0 auto",
          height: "220px",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              fontWeight: "600",
              fontSize: "40px",
            }}
          >
            {accountHasLogin != undefined && accountHasLogin.name[0]}
          </button>
        </div>
        <div>
          <h1 style={{ textAlign: "center" }}>{accountHasLogin.name}</h1>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          flexWrap: "wrap",
        }}
      >
        <p style={{ textAlign: "center" }}>your blog</p>
        <div>
          <Link
            style={{
              backgroundColor: "white",
              border: "none",
              borderBottom: saveStatus,
              outline: "none",
              fontWeight: "500",
              padding: "10px",
              color: "black",
              textDecoration: "none",
            }}
            to="saved"
            onClick={handleShowSaved}
          >
            saved
          </Link>
          <Link
            style={{
              backgroundColor: "white",
              border: "none",
              borderBottom: createStatus,
              outline: "none",
              fontWeight: "500",
              padding: "10px",
              color: "black",
              textDecoration: "none",
            }}
            to="created"
            onClick={handleShowCreate}
          >
            created
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
