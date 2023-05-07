import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Layout, Menu, theme, Input } from "antd";
import logo from "../img/logo.png";
import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
const { Header } = Layout;
let accountHasLogin = JSON.parse(localStorage.getItem("accountHasLogin"));
const NavBar = () => {
  //navigate
  const navigate = useNavigate();
  //state

  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    refillPassword: "",
  });
  const [hasLogin, setHasLogin] = useState(false);
  const [userInputAtLogin, setUserInputAtLogin] = useState({
    email: "",
    password: "",
  });
  const [listUserData, setListUserData] = useState([]);
  const [check, setCheck] = useState(false);
  const [displayLogin, setDisplayLogin] = useState("inline-block");
  const [displayUserAccount, setDisplayUserAccount] = useState("none");
  const [show, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // function
  useEffect(() => {
    const takeDataListUser = async () => {
      const dataTaken = await axios.get("http://localhost:8000/users");
      setListUserData(dataTaken.data);
    };
    takeDataListUser();
  }, [check]);
  const renderAccount = () => {
    if (accountHasLogin == null) {
      return;
    }
    if (accountHasLogin.length != 0) {
      return accountHasLogin.name[0];
    }
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleOpenRegister = () => {
    setShowRegister(true);
    setShow(false);
  };
  const userInputLogin = (e) => {
    const newUserInputAtLogin = {
      ...userInputAtLogin,
      [e.target.name]: e.target.value,
    };
    setUserInputAtLogin(newUserInputAtLogin);
  };
  const handleCloseRegister = () => {
    setShowRegister(false);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setShowRegister(false);
  };
  const handleChangeInput = (event) => {
    const newValueInput = {
      ...userInput,
      [event.target.name]: event.target.value,
    };
    setUserInput(newValueInput);
  };
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const isEmailHasntUse = () => {
    if (
      listUserData.length == 0 ||
      listUserData == null ||
      listUserData == undefined
    ) {
      if (listUserData == undefined) {
        setListUserData([]);
      }
      return true;
    } else {
      for (let i = 0; i < listUserData.length; i++) {
        if (listUserData[i].email == userInput.email) {
          return false;
        }
      }
      return true;
    }
  };
  const isPasswordRefillTrue = (password) => {
    if (password == userInput.refillPassword) {
      return true;
    } else {
      return false;
    }
  };

  const postValueToDb = async (user) => {
    await axios.post("http://localhost:8000/users", user);
  };
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    const checkValidEmail = isValidEmail(userInput.email);
    const checkIsValueHasntUse = isEmailHasntUse(userInput.email);
    const checkIsPasswordTrue = isPasswordRefillTrue(userInput.password);
    if (checkValidEmail && checkIsValueHasntUse && checkIsPasswordTrue) {
      let userHasRegisted = {
        name: userInput.name,
        email: userInput.email,
        password: userInput.password,
        id: listUserData.length + 1,
        postSavedId: [],
      };
      alert("registed successful");
      postValueToDb(userHasRegisted);
      setCheck(!check);
    } else {
      alert("something wrong registed failed");
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    handleClose();
    for (let i = 0; i < listUserData.length; i++) {
      if (
        userInputAtLogin.email == listUserData[i].email &&
        userInputAtLogin.password == listUserData[i].password
      ) {
        accountHasLogin = listUserData[i];
        localStorage.setItem(
          "accountHasLogin",
          JSON.stringify(accountHasLogin)
        );
        setDisplayLogin("none");
        setDisplayUserAccount("flex");
        return;
      }
    }

    alert("something wrong your account has'nt registed");
    return;
  };

  useEffect(() => {
    const handleCheckLogin = () => {
      if (!accountHasLogin) {
        accountHasLogin = "";
        localStorage.setItem(
          "accountHasLogin",
          JSON.stringify(accountHasLogin)
        );
        return;
      } else {
        setDisplayLogin("none");
        setDisplayUserAccount("flex");
      }
    };
    handleCheckLogin();
  }, [hasLogin]);
  const handleLogOut = () => {
    accountHasLogin = "";
    localStorage.setItem("accountHasLogin", JSON.stringify(accountHasLogin));
    setHasLogin(!hasLogin);
    setDisplayLogin("block");
    setDisplayUserAccount("none");
    return;
  };

  const handleTakeInputSearch = (e) => {
    console.log("this is input of search -->", e.target.value);
    setSearchValue(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      navigate(`/search`, { state: searchValue });
    }
  };

  return (
    <div style={{ paddingBottom: "20px" }}>
      {!hasLogin && setHasLogin(!hasLogin)}
      <Layout
        style={{
          display: "flex",
          alignContent: "space-between",
          width: "100%",
          height: "20vh",
          backgroundColor: colorBgContainer,
        }}
        theme="light"
      >
        <Header
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "end",
            width: "100%",
            backgroundColor: "white",
            marginBottom: "20px",
            position: "fixed",
            zIndex: 1000,
          }}
          theme="light"
        >
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100%",
              margin: "auto 0px",
            }}
          >
            <Link to="/">
              <img
                src={logo}
                alt=""
                style={{ width: "133px", height: "50px", objectFit: "cover" }}
              />
            </Link>
            <Link
              to="/"
              style={{
                color: "black",
                height: "100%",
                display: "flex",
              }}
            >
              <h6>Home</h6>
            </Link>
            <Link
              style={{
                color: "black",
                height: "100%",
              }}
              to="blogcreator"
            >
              <h6>Create Your Blog</h6>
            </Link>
            <Input
              placeholder="search"
              style={{
                width: "60%",
                height: "100%",
                padding: "2vh",
                borderRadius: "10px",
              }}
              onChange={handleTakeInputSearch}
              onKeyDown={handleEnter}
            />
            <Button
              style={{
                border: "none",
                backgroundColor: "white",
                color: "black",
                display: displayLogin,
              }}
              onClick={handleShow}
            >
              <span class="material-symbols-outlined">login</span>
            </Button>
            <div style={{ display: displayUserAccount }}>
              <Button
                type="primary"
                style={{
                  border: "1px solid black ",
                  width: "30px",
                  height: "30px",
                  borderRadius: "100%",
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  lineHeight: "15px",
                  fontWeight: "bold",
                  marginRight: "1rem",
                  backgroundColor: "white",
                  color: "black",
                }}
                onClick={() => {
                  navigate("yourAccount");
                }}
              >
                {renderAccount()}
              </Button>
              <Button
                type="primary"
                style={{
                  border: "1px solid black ",
                  width: "30px",
                  height: "30px",
                  borderRadius: "100%",
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  marginRight: "1rem",
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                <span
                  class="material-symbols-outlined"
                  style={{ lineHeight: "20px" }}
                  onClick={handleLogOut}
                >
                  logout
                </span>
              </Button>
            </div>
          </Menu>
        </Header>
      </Layout>
      <Outlet />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={userInputLogin}
                type="email"
                placeholder="Enter email"
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={userInputLogin}
                type="password"
                placeholder="Password"
                name="password"
              />
            </Form.Group>
            <Form.Text className="text-muted">
              you have'nt had an account
              <Button
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                }}
                variant="secondary"
                onClick={handleOpenRegister}
              >
                Register
              </Button>
            </Form.Text>
            <Button variant="primary" type="submit" onClick={handleLogin}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showRegister} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                onChange={handleChangeInput}
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Your name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter your name"
                onChange={handleChangeInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label name="password">Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChangeInput}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Refill password</Form.Label>
              <Form.Control
                name="refillPassword"
                type="password"
                placeholder="refill password"
                onChange={handleChangeInput}
              />
            </Form.Group>
            <Form.Text className="text-muted">
              you have an account
              <Button
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "none",
                }}
                variant="secondary"
                onClick={handleShow}
              >
                Login
              </Button>
            </Form.Text>
            <Button
              onClick={handleSubmitRegister}
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRegister}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default NavBar;
