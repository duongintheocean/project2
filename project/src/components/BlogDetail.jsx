import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import axios from "axios";
export default function BlogDetail() {
  // localStorage
  const accountHasLogin = JSON.parse(localStorage.getItem("accountHasLogin"));
  //state
  const [listUser, setListUser] = useState([]);
  const [author, setAuthor] = useState({});
  const [valueComment, setValueComment] = useState("");
  const [listCommentInBlog, setListCommentInBlog] = useState("");
  const [checkComment, setCheckComment] = useState(false);
  const [listCommentNeedRender, setListCommentNeedRender] = useState([]);
  //location
  const location = useLocation();
  const blogData = location.state;
  //navigate
  const navigate = useNavigate();
  useEffect(() => {
    const handleTakeListUser = async () => {
      const data = await axios.get("http://localhost:8000/users");
      const newListUser = data.data;
      setListUser(newListUser);
    };
    handleTakeListUser();
  }, []);
  useEffect(() => {
    const handleFindAuthor = () => {
      for (let i = 0; i < listUser.length; i++) {
        if (blogData?.idAuthor == listUser[i]?.id) {
          return setAuthor(listUser[i]);
        }
      }
    };
    handleFindAuthor();
  });
  useEffect(() => {
    const handleTakeComment = async () => {
      const data = await axios.get("http://localhost:8000/comment");
      setListCommentInBlog(data.data);
    };
    handleTakeComment();
  }, [checkComment]);
  const handleRenderUserAccount = () => {
    if (author.name == undefined) {
      return;
    } else {
      return author.name[0];
    }
  };
  const handleTakeInput = (e) => {
    console.log(e.target.value);
    setValueComment(e.target.value);
  };
  const handleRenderComment = () => {
    const newlistCommentNeedRender = [];
    for (let i = 0; i < listCommentInBlog.length; i++) {
      if (listCommentInBlog[i]?.idBlogOfComment == blogData?.id) {
        for (let j = 0; j < listUser.length; j++) {
          if (listCommentInBlog[i].idCommenter == listUser[j].id) {
            let comment = {
              commenter: listUser[j].name,
              comment: listCommentInBlog[i].comment,
              profileCommenter: listUser[j],
            };
            newlistCommentNeedRender.push(comment);
          }
        }
      }
    }
    setListCommentNeedRender(newlistCommentNeedRender);
  };
  const handSubmitComment = async (e) => {
    console.log(e.key, "<--- this is value when i click enter");
    if (e.key == "Enter") {
      console.log(e.key);
      const newComment = {
        comment: valueComment,
        idBlogOfComment: blogData.id,
        idCommenter: accountHasLogin.id,
      };
      console.log(newComment, "<--- this is new comment");
      setCheckComment(!checkComment);
      await axios.post("http://localhost:8000/comment", newComment);
    }
  };
  const handleSavePost = async (event) => {
    event.stopPropagation();

    if (accountHasLogin.postSavedId.indexOf(blogData.id) == -1) {
      const newPostHasSaved = [...accountHasLogin.postSavedId];
      newPostHasSaved.push(blogData.id);
      accountHasLogin = {
        ...accountHasLogin,
        postSavedId: newPostHasSaved,
      };
      localStorage.setItem("accountHasLogin", JSON.stringify(accountHasLogin));
      await axios.put(
        `http://localhost:8000/users/${accountHasLogin.id}`,
        accountHasLogin
      );
    } else {
      alert("this post has been save");
    }
  };
  useEffect(() => {
    handleRenderComment();
  }, [listCommentInBlog]);
  return (
    <div
      style={{
        width: "100%",
        height: "1000px",
        backgroundColor: "rgb(233,233,233)  ",
        marginTop: "-50px",
        paddingTop: "70px",
      }}
    >
      <div
        style={{
          width: "70%",
          height: "600px",
          margin: "auto",
          borderRadius: "5%",
          backgroundColor: "white",
          display: "flex",
        }}
      >
        <div style={{ flex: 1 }}>
          <img
            src={blogData?.image}
            alt=""
            style={{
              borderTopLeftRadius: "6%",
              borderBottomLeftRadius: "6%",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              maxHeight: "100%",
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            paddingTop: "30px",
            paddingLeft: "20px",
            paddingRight: "40px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              shape="round"
              style={{
                height: "40px",
                alignItems: "center",
                backgroundColor: "red",
                fontWeight: "400",
                fontSize: "20px",
                color: "white",
                opacity: "0.8",
                border: "1px solid red",
              }}
              onClick={handleSavePost}
            >
              save
            </Button>
          </div>
          <div style={{ paddingBottom: "10px", marginTop: "30px" }}>
            <h3>{blogData?.title}</h3>
            <p>{blogData?.blogContent}</p>
            <div style={{ display: "flex" }}>
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
                  navigate("/another", { state: author });
                }}
              >
                {handleRenderUserAccount()}
              </Button>
              <h6>{author?.name}</h6>
            </div>
          </div>
          <div>
            <div>Comment :</div>
            <div
              style={{ width: "100%", height: "200px", overflowY: "scroll" }}
            >
              {listCommentNeedRender.length != 0 ? (
                listCommentNeedRender.map((element) => {
                  return (
                    <div style={{ display: "flex", marginTop: "10px" }}>
                      <div>
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
                            navigate("/another", {
                              state: element.profileCommenter,
                            });
                          }}
                        >
                          {element.commenter[0]}
                        </Button>
                      </div>
                      <div>
                        <h6>{element.commenter}</h6>
                        <div>{element.comment}</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <tr>
                  <td>this blog does'nt have any comment</td>
                </tr>
              )}
            </div>
          </div>
          <div style={{ marginTop: "100px" }}>
            <input
              type="text"
              placeholder="comment"
              style={{
                width: "100%",
                border: "none",
                borderBottom: "1px solid black",
                outline: "none",
              }}
              onChange={handleTakeInput}
              onKeyDown={handSubmitComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
