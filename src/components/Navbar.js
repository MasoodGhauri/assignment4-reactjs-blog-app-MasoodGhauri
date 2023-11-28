import { useState } from "react";
import { GoBellFill } from "react-icons/go";
import { FaCircleUser } from "react-icons/fa6";
import { RiMenu3Fill } from "react-icons/ri";
import { useLoggedIn } from "../hooks/useLoggedIn";
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownFlag, setDropdownFlag] = useState(true);
  const [msgDropdownFlag, setMsgDropdownFlag] = useState(true);
  const [mobileMenuFlag, setMobileMenuFlag] = useState(true);

  const useLoggedInHook = useLoggedIn();
  const useUserHook = useUserLoggedIn();
  const loggedInFlag = useLoggedInHook.loggedIn;
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("lightToken");
    useUserHook.setUser({ user: {}, token: "" });
    useLoggedInHook.toggleLoggedIn();
    navigate("/");
  };

  return (
    <div className="navabr">
      <div className="logo">
        <img src="light.png" alt="logo" />
      </div>
      <div className="tabs">
        {loggedInFlag && (
          <Link to="/following">
            <h2 className="tab">Following</h2>
          </Link>
        )}
        <Link to="/">
          <h2 className="tab">For You</h2>
        </Link>
        {loggedInFlag && useUserHook.user.UserRole === "admin" && (
          <Link to="/allUsers">
            <h2 className="tab">Users</h2>
          </Link>
        )}
      </div>

      {/* for bigger screen */}
      <div
        className="profileWrapper"
        style={{ display: !loggedInFlag ? "none" : "flex" }}
      >
        <GoBellFill
          className="bell"
          onClick={() => {
            setMsgDropdownFlag(!msgDropdownFlag);
            setDropdownFlag(true);
          }}
        />
        <ul className="msg-dropdown" hidden={msgDropdownFlag}>
          <p>No Messages yet</p>
        </ul>
        <FaCircleUser
          className="profile"
          onClick={() => {
            setDropdownFlag(!dropdownFlag);
            setMsgDropdownFlag(true);
          }}
        />
        <ul className="dropdown" hidden={dropdownFlag}>
          <li className="userName" onClick={() => navigate("/profile")}>
            {useUserHook.user.Username}
          </li>
          <hr />
          <li className="logout" onClick={logoutUser}>
            Logout
          </li>
        </ul>
      </div>
      {/* for smaller screens */}
      <div
        className="hamburger"
        style={{
          display: loggedInFlag && window.innerWidth < 450 ? "block" : "none",
        }}
      >
        <RiMenu3Fill
          className="ham"
          onClick={() => {
            setMobileMenuFlag(!mobileMenuFlag);
            setMsgDropdownFlag(true);
          }}
        />
        <ul className="menu" hidden={mobileMenuFlag}>
          <li className="userName" onClick={() => navigate("/profile")}>
            Masood
          </li>
          <hr />
          <li
            className="notifications"
            onClick={() => {
              setMsgDropdownFlag(!msgDropdownFlag);
              setMobileMenuFlag(true);
            }}
          >
            Notifications
          </li>
          <li className="logout" onClick={logoutUser}>
            Logout
          </li>
        </ul>
      </div>
      <Link to="/login" hidden={loggedInFlag}>
        <button className="navLoginBtn">Login</button>
      </Link>
    </div>
  );
};

export default Navbar;
