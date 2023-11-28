import { useEffect, useState } from "react";
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";
import Blog from "./Blog";

const Feed = () => {
  const [blogList, setBlogList] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(null);
  const [disableFlag, setDisableFlag] = useState(false);
  const [page, setPage] = useState(0);

  const useUserHook = useUserLoggedIn();

  useEffect(() => {
    setLoading("Loading...");
    let reqRoute = "";
    let token;
    // setBlogList(null);

    if (window.location.pathname === "/following") {
      reqRoute = "/followedblogs";
      if (page === 0) {
        setBlogList(null);
      }
      token = useUserHook.token;
      setPage(0);
    }

    fetch(process.env.REACT_APP_BASE_URL + "/blog" + reqRoute + "?p=" + page, {
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
            setDisableFlag(true);
            setTimeout(() => {
              setDisableFlag(false);
              setLoading(null);
            }, 5000);
          } else {
            if (blogList) {
              setBlogList((pre) => [...pre, ...data.Blogs]);
            } else {
              setBlogList(data.Blogs);
            }
            setLoading(null);
            setErrorMsg(null);
          }
        }
      })
      .catch((err) => {
        setErrorMsg("Error Fetching data");
        setLoading(null);
      });
  }, [page, window.location.pathname]);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;

      if (currentHeight + 1 >= scrollHeight && !loading) {
        setPage((page) => page + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  return (
    <div className="feedWrapper">
      {errorMsg && <p className="error">{errorMsg}</p>}
      {blogList &&
        blogList.map((b, i) => {
          return <Blog key={i} blog={b} />;
        })}
      {loading && <p className="loading">{loading}</p>}
    </div>
  );
};

export default Feed;
