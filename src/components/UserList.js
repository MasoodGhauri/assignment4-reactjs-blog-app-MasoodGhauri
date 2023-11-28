import { useEffect, useState } from "react";
import User from "./User";

const UserList = () => {

    const [users,setUsers]=useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(()=>{
        console.log(process.env.REACT_APP_BASE_URL+"/User/allusers")
        fetch(process.env.REACT_APP_BASE_URL+"/User/allusers", {
            method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.Success === true) {
                console.log(data.Users)
              setUsers(data.Users);
            } else {
              setTimeout(() => {
                setErrorMsg(null);
              }, 4000);
              setErrorMsg("Enable to get User data!");
            }
          })
          .catch((err) => {
            setErrorMsg("Something went wrong! try again");
          });
    },[])

    

    return ( 
        <div className="userList">
            {errorMsg && <p className="error">{errorMsg}</p>}
            {users && 
                users.map((U,i)=>{
                    return<User user={U} key={i}/>
                })
            }
        </div>
     );
}
 
export default UserList;