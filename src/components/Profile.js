import { useNavigate } from "react-router-dom";
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [follow, setFollow] = useState("Follow");
  const userLoggedInHook = useUserLoggedIn();
  const loggedInUser = userLoggedInHook.user;
  const token = userLoggedInHook.token;
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();
  const { id } = useParams();

  const followUser = async () => {
    let reqUrl;
    if (follow === "Follow") {
      reqUrl = "follow";
    } else {
      reqUrl = "unfollow";
    }
    await fetch(process.env.REACT_APP_BASE_URL + "/User/" + reqUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        toFollowId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Success === true) {
          if (reqUrl === "follow") {
            setFollow("Unfollow");
          } else {
            setFollow("follow");
          }

          setSuccessMsg(data.Message);
          setErrorMsg(null);
          setTimeout(() => {
            setSuccessMsg(null);
          }, 4000);
        } else {
          setTimeout(() => {
            setErrorMsg(null);
          }, 4000);
          setErrorMsg("Enable to get User!");
        }
      })
      .catch((err) => {
        setErrorMsg("Something went wrong! try again");
      });
  };

  useEffect(() => {
    const getUser = async () => {
      if (window.location.pathname.startsWith("/viewprofile/")) {
        await fetch(process.env.REACT_APP_BASE_URL + "/User/" + id, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.Success === true) {
              setUser(data.User);
              setErrorMsg(null);
              if (data.User.FollowedBy.includes(id)) setFollow("Unfollow");
            } else {
              setTimeout(() => {
                setErrorMsg(null);
              }, 4000);
              setErrorMsg("Enable to get User!");
            }
          })
          .catch((err) => {
            setErrorMsg("Something went wrong! try again");
          });
      }
      if (window.location.pathname === "/profile") {
        setUser(loggedInUser);
      }
    };
    getUser();
  }, [window.location.pathname]);

  // if (userLoggedInHook.token === "" && !viewFlag) {
  //   return navigate("/login");
  // } else {
  return (
    <div className="profileWrapper">
      <div className="details">
        {successMsg && <p className="success">{successMsg}</p>}
        {errorMsg && <p className="error">{errorMsg}</p>}
        {!errorMsg && user && (
          <>
            <div className="top">
              <h4 className="userName">
                {user.Username}
                <span>{user._id}</span>
              </h4>
              {token !== "" && user._id !== loggedInUser._id && (
                <button className="followBtn" onClick={followUser}>
                  {follow}
                </button>
              )}
            </div>
            <div className="middle">
              <p>
                @<span>{user.Email}</span>
              </p>
              <p>
                member since
                <span>{user.createdAt.substring(0, 10)}</span>
              </p>
            </div>

            <div className="followWrap">
              <div className="followCol">
                <h4 className="followNumber">{user.FollowedBy.length}</h4>
                <p className="followTag">Followers</p>
              </div>
              <hr />
              <div className="followCol">
                <h4 className="followNumber">{user.Following.length}</h4>
                <p className="followTag">Following</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
  // }
};

export default Profile;
