import React, { useContext, useEffect, useState } from "react";
import Reddle from "../apis/Reddle";
import { LoginContext } from "../context/LoginContext";

const Login = (props) => {

    // const {users, setUsers} = useContext(LoginContext);

    // useEffect(() => {
        
    //     const fetchData = async () => {
    //         try {
    //             const response = await Reddle.get("/");
    //             setUsers(response.data.data.users);
    //             console.log(response);
    //         }
    //         catch (err) {
    //             console.log(err);
    //         }
    //     }

    //     fetchData();
    // }, [])

    const [name, setName] = useState("");
    const [passWord, setPassword] = useState("");

    return (
        <div>
            <div>
                <div className='display-1 text-center'>Reddle</div>
            </div>

            <form className="shadow w-25 m-auto mt-5 p-3 border">
                <div className="form-group mb-3">
                    <label htmlFor="inputUsername">Username</label>
                    <input value={name} onChange={(e) => setName(e.target.value)}type="username" className="form-control" id="inputEmail" placeholder="Enter Username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
                </div>

                <button type="register" className="btn btn-link mb-3">No Account? Register Here</button>

                <div className="text-center">
                    
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
                

            </form>
        </div>

    )
}

export default Login;