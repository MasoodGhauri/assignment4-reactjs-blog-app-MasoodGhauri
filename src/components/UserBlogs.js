import { useEffect, useState } from "react";
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";
import { useParams } from "react-router-dom";
import EditBlog from "./EditBlog";
import CreateNew from "./CreateNew";

const UserBlogs = () => {
  const [blogList, setBlogList] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(null);
  const [flag, setFlag] = useState(false);
  const useUserHook = useUserLoggedIn();
  const { id } = useParams();

  const removeBlog = (id) => {
    let newList = blogList.filter((b) => b._id !== id);
    setBlogList(newList);
  };

  const addBlog = (blog) => {
    if (blogList) {
      setBlogList((prevBlogList) => [...prevBlogList, blog]);
    } else {
      setBlogList([blog]);
    }
  };

  const getViewBlogs = () => {
    fetch(process.env.REACT_APP_BASE_URL + "/blog/viewBlogs/" + id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Success === false) {
          setErrorMsg(data.Message);
          setLoading(null);
        } else {
          if (data.Blogs.length === 0) {
            setLoading("No blogs posted by this user");
          } else {
            setBlogList(data.Blogs);
            setLoading(null);
            setErrorMsg(null);
          }
        }
      })
      .catch((err) => {
        setErrorMsg("Error Fetching data");
        setLoading(null);
      });
  };

  useEffect(() => {
    setLoading("Loading...");

    if (window.location.pathname.startsWith("/viewprofile/")) {
      setFlag(true);
      getViewBlogs();
    } else {
      setFlag(false);
      fetch(process.env.REACT_APP_BASE_URL + "/blog/myblogs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: useUserHook.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.Success === false) {
            setErrorMsg(data.Message);
            setLoading(null);
          } else {
            if (data.Blogs.length === 0) {
              setLoading("Post your first blog");
            } else {
              setBlogList(data.Blogs);
              setLoading(null);
              setErrorMsg(null);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorMsg("Error Fetching data");
          setLoading(null);
        });
    }
    // }, [blogList]);
  }, []);

  return (
    <div className="feedWrapper">
      {window.location.pathname.startsWith("/viewprofile/") ? (
        <></>
      ) : (
        <CreateNew addBlog={addBlog} />
      )}
      {blogList &&
        blogList.map((b, i) => {
          return (
            <EditBlog
              key={i}
              blog={b}
              removeBlog={removeBlog}
              viewFlag={flag}
            />
          );
        })}
      {loading && <p className="loading">{loading}</p>}
      {errorMsg && <p className="error">{errorMsg}</p>}
    </div>
  );
};

export default UserBlogs;
