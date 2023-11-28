import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import UserBlogs from "./components/UserBlogs";
import UserList from "./components/UserList";

function App() {
  return (
    <BrowserRouter>
      <div className="mainWrapper">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Feed />
              </>
            }
          />
          <Route
            path="/following"
            element={
              <>
                <Navbar />
                <Feed />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Navbar />
                <Profile />
                <UserBlogs />
              </>
            }
          />
          <Route
            path="/allUsers"
            element={
              <>
                <Navbar />
                <UserList />
              </>
            }
          />
          <Route
            path="/viewprofile/:id"
            element={
              <>
                <Navbar />
                <Profile />
                <UserBlogs />
              </>
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/login"
            element={
              <div className="authPages">
                <Login />
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              <div className="authPages">
                <Signup />
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
