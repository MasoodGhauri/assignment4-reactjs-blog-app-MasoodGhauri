import Rating from "./Rating";
import { BsSendFill } from "react-icons/bs";
import { ImEyeBlocked } from "react-icons/im";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";
import { useNavigate } from "react-router-dom";

const Blog = ({ blog }) => {
  // console.log(blog);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(blog.Comments);
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showFlag, setShowFlag] = useState(false);
  const useUserHook = useUserLoggedIn();
  const navigate = useNavigate();

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

  let avr = calculateAverageStars(blog.RatingStars);
  let time = formatDateTime(blog.createdAt);

  return (
    <div className="blogWrapper">
      {successMsg && <p className="success">{successMsg}</p>}
      {errorMsg && <p className="error">{errorMsg}</p>}
      <div className="timeWrapper">
        <p className="time">{time}</p>
        {blog.Status === "active" ? <FaGlobeAmericas /> : <ImEyeBlocked />}
      </div>
      <div className="top">
        <h2 className="title">{blog.Title}</h2>
        <h4
          className="author"
          onClick={() => {
            navigate("/viewprofile/" + blog.Author.id);
          }}
        >
          {window.innerWidth < 786
            ? blog.Author.name.split(" ")[0]
            : blog.Author.name}
        </h4>
      </div>
      <div className="catagories">
        {blog.Catagories.map((c, i) => {
          return (
            <span key={i} className="catagory">
              {c}
            </span>
          );
        })}
      </div>
      <div className="body">
        <p>{blog.Body}</p>
        <div className="keyWords">
          {blog.Keywords.map((b, i) => {
            return (
              <span key={i} className="keyword">
                {b}
              </span>
            );
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
        {useUserHook.token !== "" && (
          <div className="addComment">
            <input
              type="text"
              className="comInput"
              placeholder="add comment"
              onChange={(e) => setComment(e.target.value)}
            />
            <BsSendFill className="comBtn" onClick={addComent} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
