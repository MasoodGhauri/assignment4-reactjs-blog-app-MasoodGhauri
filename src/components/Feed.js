import { useEffect, useState } from "react";
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";
import Blog from "./Blog";

const Feed = () => {
  const [blogList, setBlogList] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(null);

  const useUserHook = useUserLoggedIn();

  useEffect(() => {
    setLoading("Loading...");
    let reqRoute = "/getAllBlogDemo";
    let token;

    if (window.location.pathname === "/following") {
      reqRoute = "/followedblogs";
      token = useUserHook.token;
    }

    fetch(process.env.REACT_APP_BASE_URL + "/blog" + reqRoute, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Success === false) {
          setErrorMsg(data.Message);
          setLoading(null);
        } else {
          if (data.Blogs.length === 0) {
            setLoading("Looks like that it");
            setBlogList(null);
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
    // }, [blogList]);
  }, [window.location.pathname]);

  return (
    <div className="feedWrapper">
      {loading && <p className="loading">{loading}</p>}
      {errorMsg && <p className="error">{errorMsg}</p>}
      {blogList &&
        blogList.map((b, i) => {
          return <Blog key={i} blog={b} />;
        })}
    </div>
  );
};

export default Feed;
