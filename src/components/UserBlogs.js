import { useEffect, useState } from "react";
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";
import EditBlog from "./EditBlog";

const UserBlogs = () => {
  const [blogList, setBlogList] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(null);
  const useUserHook = useUserLoggedIn();

  const removeBlog = (id) => {
    setBlogList(blogList.filter((b) => b._id !== id));
  };

  useEffect(() => {
    setLoading("Loading...");

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
    // }, [blogList]);
  }, []);

  return (
    <div className="feedWrapper">
      {loading && <p className="loading">{loading}</p>}
      {errorMsg && <p className="error">{errorMsg}</p>}
      {blogList &&
        blogList.map((b, i) => {
          return <EditBlog key={i} blog={b} removeBlog={removeBlog} />;
        })}
    </div>
  );
};

export default UserBlogs;
