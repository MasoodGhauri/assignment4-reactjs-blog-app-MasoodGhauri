import Rating from "./Rating";
import { BsSendFill } from "react-icons/bs";
import { ImEyeBlocked } from "react-icons/im";
import { FaGlobeAmericas, FaSave, FaStar } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useState } from "react";
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";

const EditBlog = ({ blog, removeBlog, viewFlag }) => {
  let flag = false;
  if (blog.Status === "active") {
    flag = false;
  } else {
    flag = true;
  }

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(blog.Comments);
  const [showFlag, setShowFlag] = useState(false);

  const calculateAverageStars = (ratingStars) => {
    if (!ratingStars || ratingStars.length === 0) {
      return 0;
    }

    const sumStars = ratingStars.reduce((sum, rating) => sum + rating.stars, 0);
    const averageStars = sumStars / ratingStars.length;

    return averageStars;
  };

  const formatDateTime = (inputDateTime) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDateTime = new Date(inputDateTime).toLocaleString(
      "en-US",
      options
    );
    return formattedDateTime;
  };

  const saveEditedBlog = () => {
    fetch(process.env.REACT_APP_BASE_URL + "/blog/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token: useUserHook.token,
      },
      body: JSON.stringify({
        id: blog._id,
        Title: titleEdt,
        Body: bodyEdt,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Success === true) {
          setSuccessMsg(data.Message);
          setEditFlag(!editFlag);
          setErrorMsg(null);
        } else {
          setErrorMsg("Session expired! Login Again");
        }
      })
      .catch((err) => setErrorMsg("Something went wrong! try again"));
  };

  const setActivate = () => {
    let path;
    if (!hiddenBlogFlag) {
      path = "/hide";
    } else {
      path = "/activate";
    }

    fetch(process.env.REACT_APP_BASE_URL + "/blog/" + path, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token: useUserHook.token,
      },
      body: JSON.stringify({
        id: blog._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.Success === true) {
          setSuccessMsg(data.Message);
          setHiddenBlogFlag(!hiddenBlogFlag);
          setErrorMsg(null);
          setTimeout(() => setSuccessMsg(null), 5000);
        } else {
          setErrorMsg("Session expired! Login Again");
        }
      })
      .catch((err) => setErrorMsg("Something went wrong! try again"));
  };

  const deleteBlog = () => {
    fetch(process.env.REACT_APP_BASE_URL + "/blog/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: useUserHook.token,
      },
      body: JSON.stringify({
        id: blog._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Success === true) {
          setErrorMsg(null);
          removeBlog(blog._id);
        } else {
          setErrorMsg("Session expired! Login Again");
        }
      })
      .catch((err) => setErrorMsg("Something went wrong! try again"));
  };

  const addComent = () => {
    if (comment !== "") {
      fetch(process.env.REACT_APP_BASE_URL + "/blog/comment", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: useUserHook.token,
        },
        body: JSON.stringify({
          comment: comment,
          blogId: blog._id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.Success === true) {
            setSuccessMsg(data.Message);
            setComments([data.Comment, ...comments]);
            setTimeout(() => {
              setSuccessMsg(null);
            }, 4000);
            setComment("");
            setErrorMsg(null);
          } else {
            setErrorMsg("Session expired! Login Again");
          }
        })
        .catch((err) => setErrorMsg("Something went wrong! try again"));
    }
  };

  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [hiddenBlogFlag, setHiddenBlogFlag] = useState(flag);
  const [editFlag, setEditFlag] = useState(false);
  const [titleEdt, setTitleEdt] = useState(blog.Title);
  const [bodyEdt, setBodyEdt] = useState(blog.Body);

  const useUserHook = useUserLoggedIn();
  let avr = calculateAverageStars(blog.RatingStars);
  let time = formatDateTime(blog.createdAt);

  return (
    <div className="blogWrapper">
      {successMsg && <p className="success">{successMsg}</p>}
      {errorMsg && <p className="error">{errorMsg}</p>}
      <div className="timeWrapper">
        <p className="time">{time}</p>
        {viewFlag === false && (
          <FaGlobeAmericas
            onClick={setActivate}
            style={{
              display: hiddenBlogFlag ? "block" : "none",
              cursor: "pointer",
            }}
          />
        )}
        {viewFlag === false && (
          <ImEyeBlocked
            onClick={setActivate}
            style={{
              display: hiddenBlogFlag ? "none" : "block",
              cursor: "pointer",
            }}
          />
        )}
        {viewFlag === false && (
          <RiDeleteBin6Fill
            style={{ cursor: "pointer" }}
            onClick={deleteBlog}
          />
        )}
      </div>
      <div className="top">
        <h2 className="title" hidden={editFlag}>
          {titleEdt}
        </h2>
        <input
          type="text"
          value={titleEdt}
          hidden={!editFlag}
          className="titleEdit"
          onChange={(e) => setTitleEdt(e.target.value)}
        />
        {viewFlag === false && (
          <FaPencil
            onClick={() => setEditFlag(!editFlag)}
            style={{ display: editFlag ? "none" : "block", cursor: "pointer" }}
          />
        )}
        {viewFlag === false && (
          <FaSave
            onClick={saveEditedBlog}
            style={{ display: !editFlag ? "none" : "block", cursor: "pointer" }}
          />
        )}
      </div>
      <div className="catagories">
        {blog.Catagories.map((c, i) => {
          return <span className="catagory">{c}</span>;
        })}
      </div>
      <div className="body">
        <p hidden={editFlag}>{bodyEdt}</p>
        <textarea
          value={bodyEdt}
          hidden={!editFlag}
          className="bodyEdit"
          onChange={(e) => setBodyEdt(e.target.value)}
        />
        <div className="keyWords">
          {blog.Keywords.map((b, i) => {
            return <span className="keyword">{b}</span>;
          })}
        </div>
      </div>
      <hr />
      <div className="ratingSection">
        Rate it:
        <Rating ratingList={blog.RatingStars} id={blog._id} />
        <h3 className="avergeStars">
          <span>Average {avr}</span>
          <FaStar />
        </h3>
      </div>
      <hr />
      <div className="comWrapper">
        <div className="commentControls">
          <h3>Comments</h3>
          <h3
            className="showCom"
            hidden={showFlag}
            onClick={() => setShowFlag(!showFlag)}
          >
            Show All
          </h3>
          <h3
            className="hideCom"
            hidden={!showFlag}
            onClick={() => setShowFlag(!showFlag)}
          >
            Show less
          </h3>
        </div>
        <div className="comments">
          {comments.length > 0 ? (
            !showFlag ? (
              <div className="com">
                <h4>{comments[0].userName}</h4>
                <h6>{comments[0].body}</h6>
              </div>
            ) : (
              comments.map((c, i) => {
                return (
                  <div key={i} className="com">
                    <h4>{c.userName}</h4>
                    <h6>{c.body}</h6>
                  </div>
                );
              })
            )
          ) : (
            <div className="com">
              <h6>No comments on this blog yet</h6>
            </div>
          )}
        </div>
        <div className="addComment">
          <input
            type="text"
            className="comInput"
            placeholder="add comment"
            onChange={(e) => setComment(e.target.value)}
          />
          <BsSendFill className="comBtn" onClick={addComent} />
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
