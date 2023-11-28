import { MdBlock } from "react-icons/md";
import { FaGlobe } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";
import { useState } from "react";

const User = ({user}) => {
    const useUserHook = useUserLoggedIn();
    const [errorMsg, setErrorMsg] = useState(null);
    const [userName, setUserame] = useState(user.Username)
    const [userEmail, setUserEmail] = useState(user.Email);
    const [hidden, setHidden] = useState(false);

    let reqUrl;
    const blockUser=()=>{
        reqUrl='block';
        sendReq();
    }
    const unblockUser=()=>{
        reqUrl='unblock';
        sendReq();
    }

    const sendReq=async()=>{
        await fetch(process.env.REACT_APP_BASE_URL + "/User/"+ reqUrl, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              token: useUserHook.token,
            },
            body:JSON.stringify({
                id:user._id
            })
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.Success === false) {
                setErrorMsg(data.Message);
                setTimeout(() => {
                    setErrorMsg(null);
                }, 3000);
              } else {
                setTimeout(() => {
                    setErrorMsg(null);
                }, 3000);
                setErrorMsg(data.Message);
                }
            })
            .catch((err) => {
              setErrorMsg("Something went wrong");
            });
    }

    const editUser=async()=>{
        await fetch(process.env.REACT_APP_BASE_URL + "/User/", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              token: useUserHook.token,
            },
            body:JSON.stringify({
                id:user._id,
                Username: userName,
                Email: userEmail
            })
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.Success === false) {
                setErrorMsg(data.Message);
                setTimeout(() => {
                    setErrorMsg(null);
                }, 3000);
              } else {
                setHidden(!hidden)
                setTimeout(() => {
                    setErrorMsg(null);
                }, 3000);
                setErrorMsg(data.Message);
                }
            })
            .catch((err) => {
              setErrorMsg("Something went wrong");
            });
        
    }

    return ( 
        <div className="userWrap">
            {errorMsg && <p className="error">{errorMsg}</p>}
            <div className="userCard">
                <div className="detail" hidden={hidden}>
                    <h5>
                        {userName}
                    </h5>
                    <h5>
                        {userEmail}
                    </h5>
                </div>
                <div className="edit" hidden={!hidden}>
                    <input type="text" value={userName} onChange={(e)=>setUserame(e.target.value)}/>
                    <input type="text" value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}/>
                </div>
                <div className="controlsWrap">
                    <FaPencilAlt style={{display: !hidden?"block":"none"}} onClick={()=>setHidden(!hidden)}/>
                    <FaSave style={{display: hidden?"block":"none"}} onClick={editUser}/>
                    {user.Status==="active"?<MdBlock onClick={blockUser}/>:<FaGlobe onClick={unblockUser}/>}
                </div>
            </div>
            
        </div>
     );
}
 
export default User;