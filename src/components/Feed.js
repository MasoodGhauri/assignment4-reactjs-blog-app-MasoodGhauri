import { useEffect, useState } from "react";
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";
import Blog from "./Blog";

const Feed = () => {
  const [blogList, setBlogList] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const useUserHook = useUserLoggedIn();

  useEffect(() => {
    let reqRoute = "/getAllBlogDemo";
    let token;

    if (window.location.pathname === "/following") {
      console.log("followers");
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
        setBlogList(data.Blogs);
        setErrorMsg(null);
      })
      .catch((err) => setErrorMsg("Error Fetching data"));
    // }, [blogList]);
  }, [window.location.pathname]);

  return (
    <div className="feedWrapper">
      {errorMsg && <p className="error">{errorMsg}</p>}
      {blogList &&
        blogList.map((b, i) => {
          return <Blog key={i} blog={b} />;
        })}
    </div>
  );
};

export default Feed;
