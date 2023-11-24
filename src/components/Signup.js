import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_URL + "/User/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: email,
            Password: password,
            Username: userName,
          }),
        }
      );

      const data = await response.json();

      if (data.Success === true) {
        setTimer();
        setSuccessMsg(data.Message + "  redirecting you to login page...");
        setErrorMsg(null);
      } else {
        setErrorMsg(data.Message);
      }
    } catch (error) {
      setErrorMsg("Something went wrong!");
    }
  };

  const setTimer = () => {
    setTimeout(() => navigate("/login"), 3000);
  };

  return (
    <div className="loginWrapper">
      <div className="login">
        {errorMsg && <p className="error">{errorMsg}</p>}
        {successMsg && <p className="success">{successMsg}</p>}
        <h3>Signup</h3>
        <div className="loginInputWrap">
          <div className="inputWrap">
            <div className="inputCol">
              <label htmlFor="">Username</label>
              <label htmlFor="">Email</label>
              <label htmlFor="">Password</label>
            </div>
            <div className="inputCol">
              <input
                type="text"
                placeholder="alpha"
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="text"
                placeholder="w@xyz"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button className="authBtn" onClick={loginUser}>
            Signup
          </button>
          <div className="changeAuthwrap">
            <label htmlFor="">Already have an account</label>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
