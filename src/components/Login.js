import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";
import { useLoggedIn } from "../hooks/useLoggedIn";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const useUserHook = useUserLoggedIn();
  const btnToggle = useLoggedIn();
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_URL + "/User/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: email,
            Password: password,
          }),
        }
      );

      const data = await response.json();

      if (data.Success === true) {
        if (data.Message !== "Account blocked. Cannot login right now") {
          useUserHook.setUser({ user: data.User, token: data.token });
          localStorage.setItem("lightToken", data.token);
          setErrorMsg(null);

          btnToggle.toggleLoggedIn();
          navigate("/profile");
        } else {
          setErrorMsg(data.Message);
        }
      } else {
        setErrorMsg(data.Message);
      }
    } catch (error) {
      setErrorMsg("Something went wrong!");
    }
  };

  return (
    <div className="loginWrapper">
      <div className="login">
        {errorMsg && <p className="error">{errorMsg}</p>}
        <h3>Login</h3>
        <div className="loginInputWrap">
          <div className="inputWrap">
            <div className="inputCol">
              <label htmlFor="">Email</label>
              <label htmlFor="">Password</label>
            </div>
            <div className="inputCol">
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
            Login
          </button>
          <div className="changeAuthwrap">
            <label htmlFor="">Don't have an account</label>
            <Link to="/signup">Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
