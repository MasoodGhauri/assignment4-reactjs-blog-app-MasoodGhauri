import { useEffect, useState } from "react";
import Blog from "./Blog";

const Feed = () => {
  const [blogList, setBlogList] = useState(null);

  useEffect(() => {
    fetch("http://192.168.10.18:3001/Blog/getAllBlogDemo")
      .then((res) => res.json())
      .then((data) => {
        setBlogList(data.Blogs);
      })
      .catch((err) => console.log(err));
  }, [blogList]);

  return (
    <div className="feedWrapper">
      {blogList &&
        blogList.map((b, i) => {
          return <Blog key={i} blog={b} />;
        })}
    </div>
  );
};

export default Feed;
