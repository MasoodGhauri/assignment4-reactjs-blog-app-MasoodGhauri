import { useEffect, useState } from "react";
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";
import EditBlog from "./EditBlog";

const UserBlogs = () => {
  const [blogList, setBlogList] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(null);
  const useUserHook = useUserLoggedIn();

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
        setLoading(null);
        setBlogList(data.Blogs);
        setErrorMsg(null);
      })
      .catch((err) => setErrorMsg("Error Fetching data"));
    // }, [blogList]);
  }, []);

  return (
    <div className="feedWrapper">
      {loading && <p className="loading">{loading}</p>}
      {errorMsg && <p className="error">{errorMsg}</p>}
      {blogList &&
        blogList.map((b, i) => {
          return <EditBlog key={i} blog={b} />;
        })}
    </div>
  );
};

export default UserBlogs;
