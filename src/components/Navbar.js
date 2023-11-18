import { useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { RiMenu3Fill } from "react-icons/ri";

const Navbar = () => {
  const [dropdownFlag, setDropdownFlag] = useState(true);
  const [msgDropdownFlag, setMsgDropdownFlag] = useState(true);
  const [mobileMenuFlag, setMobileMenuFlag] = useState(true);

  return (
    <div className="navabr">
      <div className="logo">
        <img src="light.png" alt="logo" />
      </div>
      <div className="tabs">
        <h2 className="tab">For You</h2>
        <h2 className="tab">Following</h2>
      </div>
      <div className="profileWrapper">
        <IoMdNotifications
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
          <li className="userName">Masood</li>
          <hr />
          <li className="logout">Logout</li>
        </ul>
      </div>
      <div className="hamburger">
        <RiMenu3Fill
          className="ham"
          onClick={() => {
            setMobileMenuFlag(!mobileMenuFlag);
            setMsgDropdownFlag(true);
          }}
        />
        <ul className="menu" hidden={mobileMenuFlag}>
          <li className="userName">Masood</li>
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
          <li className="logout">Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
