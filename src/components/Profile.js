import { useNavigate } from "react-router-dom";
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";

const Profile = () => {

    const userLoggedInHook=useUserLoggedIn();
    const user = userLoggedInHook.user;
    const navigate=useNavigate();

    if(!user || Object.keys(user).length === 0){
        return navigate('/login');
    }

  return (
    <div className="profileWrapper">
      <div className="details">
        <div className="top">
            <h4 className="userName">
                {user.Username}
                <span>{user._id}</span>
            </h4>
            <button>Follow</button>
        </div>
        <div className="middle">
            <p>@<span>{user.Email}</span></p>
            <p>member since<span>{user.createdAt.substring(0, 10)}</span></p>
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


      </div>
    </div>
  );
};

export default Profile;
