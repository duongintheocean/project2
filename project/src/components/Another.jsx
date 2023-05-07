import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Another() {
  //location
  const location = useLocation();
  //state
  const [saveStatus, setSaveStatus] = useState("none");
  const [createStatus, setCreateStatus] = useState("none");
  const [accountSee, setAccountSee] = useState();
  //function
  const handleShowSaved = () => {
    // navigate("saved");
    sessionStorage.setItem(
      "anotherSaved",
      JSON.stringify(accountSee.postSavedId)
    );
    setSaveStatus("3px solid black ");
    setCreateStatus("none");
  };
  const handleShowCreate = () => {
    sessionStorage.setItem("anotherCreated", JSON.stringify(accountSee.id));
    setCreateStatus("3px solid black");
    setSaveStatus("none");
  };
  useEffect(() => {
    setAccountSee(location.state);
  }, []);
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
            {accountSee != undefined && accountSee?.name[0]}
          </button>
        </div>
        <div>
          <h1 style={{ textAlign: "center" }}>{accountSee?.name}</h1>
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
        <p style={{ textAlign: "center" }}>blog</p>
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
            to={"saved"}
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
            to={"created"}
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
